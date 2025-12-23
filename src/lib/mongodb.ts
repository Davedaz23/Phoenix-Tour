import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend global type
declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('✅ Using existing MongoDB connection');
    return cached.conn; // This is now safe because TypeScript knows it's not null here
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    console.log('🔄 Creating new MongoDB connection...');
    
    // Add retry logic
    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
          console.log('✅ MongoDB connected successfully');
          console.log(`📊 Database: ${mongooseInstance.connection.db?.databaseName || 'unknown'}`);
          return mongooseInstance;
        });
        
        break; // Success, exit retry loop
      } catch (error: any) {
        lastError = error;
        console.error(`❌ Connection attempt ${attempt} failed:`, error.message);
        
        if (attempt < maxRetries) {
          const delay = attempt * 2000; // Exponential backoff
          console.log(`⏳ Retrying in ${delay/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    if (!cached.promise && lastError) {
      throw lastError;
    }
  }

  try {
    // The promise should exist at this point
    if (!cached.promise) {
      throw new Error('Failed to create connection promise');
    }
    
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error('❌ Failed to establish MongoDB connection:', error);
    throw error;
  }

  // At this point, cached.conn should not be null
  if (!cached.conn) {
    throw new Error('Failed to establish MongoDB connection');
  }
  
  return cached.conn;
}

// Connection event handlers
if (process.env.NODE_ENV === 'development') {
  mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to DB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected');
    cached.conn = null;
  });
}

// Graceful shutdown for serverless environments
if (typeof window === 'undefined') {
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });
}

export default connectDB;