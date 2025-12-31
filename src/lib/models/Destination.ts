// models/Destination.js
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  region: {
    type: String,
    required: true,
    enum: ['Addis Ababa', 'Northern Circuit', 'Southern Circuit', 'Eastern (Harar)', 'Western (Gambella)']
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: String,
  mainImage: String,
  images: [String],
  iconName: {
    type: String,
    enum: ['Building', 'Mountain', 'Compass', 'Sun', 'Trees']
  },
  features: [String],
  bestFor: [String],
  tourCount: {
    type: Number,
    default: 0
  },
  highlights: [String],
  quickFacts: [{
    label: String,
    value: String,
    icon: String
  }],
  attractions: [{
    title: String,
    description: String,
    image: String,
    duration: String,
    type: String
  }],
  metaTitle: String,
  metaDescription: String,
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;