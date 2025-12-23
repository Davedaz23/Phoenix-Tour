// src/lib/models/BlogPost.ts - Simplified Version (No Middleware)
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  coverImage?: string;
  images?: string[];
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  published: boolean;
  publishedAt: Date;
  updatedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string[];
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true // Added index like in Application model
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, required: true },
    bio: { type: String }
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Cultural Insights',
      'Mountain Trekking',
      'Coffee Culture',
      'Historical Sites',
      'Travel Photography',
      'Adventure Travel',
      'Hidden Gems',
      'Travel Tips',
      'Food & Dining',
      'Festivals & Events'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  coverImage: {
    type: String
  },
  images: [{
    type: String
  }],
  readTime: {
    type: Number,
    required: true,
    min: 1
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  seoTitle: {
    type: String
  },
  seoDescription: {
    type: String,
    maxlength: 160
  },
  metaKeywords: [{
    type: String
  }]
}, {
  timestamps: true // This automatically handles createdAt and updatedAt
});

// Create text indexes for search
BlogPostSchema.index({ 
  title: 'text', 
  excerpt: 'text', 
  content: 'text',
  'author.name': 'text' 
});

// Create compound indexes for common queries
BlogPostSchema.index({ category: 1, publishedAt: -1 });
BlogPostSchema.index({ featured: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1, publishedAt: -1 });

// REMOVED: The problematic middleware
// The timestamps: true option automatically handles updatedAt
// You should handle slug generation in your API/service layer instead

// Use the same pattern as the Application model
export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);