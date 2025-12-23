// src/components/blog/BlogCard.tsx - Individual Blog Card (Updated)
'use client';

import { Calendar, Clock, Eye, Heart, MessageCircle, User, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
}

interface BlogCardProps {
  post: BlogPost;
  disableMaps?: boolean; // Add prop to explicitly disable maps
}

export default function BlogCard({ post, disableMaps = true }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  // Prevent Google Maps from loading in blog cards
  useEffect(() => {
    if (disableMaps) {
      // Clean up any Google Maps related scripts and elements
      const cleanupMaps = () => {
        // Remove Google Maps scripts
        const mapsScripts = document.querySelectorAll('script[src*="maps.googleapis.com"], script[src*="maps.google.com"]');
        mapsScripts.forEach(script => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });

        // Remove any iframes that might contain maps
        const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"], iframe[src*="maps.google.com"]');
        mapIframes.forEach(iframe => {
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        });

        // Clean up any Google Maps global objects
        if (typeof window !== 'undefined') {
          // @ts-ignore
          delete window.google;
          // @ts-ignore
          delete window.googleMapsLoaded;
        }
      };

      cleanupMaps();

      // Run cleanup when component unmounts
      return () => {
        cleanupMaps();
      };
    }
  }, [disableMaps]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if triggered from card click
    e.stopPropagation();
    
    if (isLiked) return;
    
    try {
      const response = await fetch(`/api/blog/${post._id}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-500 transition-all duration-300 hover:shadow-xl">
      {/* Image Container - Using placeholder instead of MapPin to avoid any map associations */}
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary-500/10 to-yellow-500/10">
          {/* Use a simple placeholder image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/20 to-orange-500/20 flex items-center justify-center mb-3">
                <div className="w-8 h-8 text-primary-400 opacity-70">
                  📚
                </div>
              </div>
              <div className="text-primary-700 font-medium">Blog Post</div>
            </div>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-medium rounded-full border border-primary-200">
              {post.category}
            </span>
          </div>
          
          {/* View Stats */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
            <Eye className="w-3 h-3" />
            {post.views.toLocaleString()}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime} min read
          </div>
        </div>

        {/* Title & Excerpt */}
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-6 line-clamp-3">
            {post.excerpt}
          </p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer - Author & Stats */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-yellow-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                  {post.author.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{post.author.name}</div>
              <div className="text-gray-500 text-sm">{post.author.role}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              disabled={isLiked}
              className={`flex items-center gap-1 ${isLiked ? 'text-primary-500' : 'text-gray-400 hover:text-primary-500'} transition-colors`}
              aria-label={`Like this post, currently has ${likeCount} likes`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary-500' : ''}`} />
              <span className="text-sm font-medium">{likeCount.toLocaleString()}</span>
            </button>
            
            <Link 
              href={`/blog/${post.slug}#comments`}
              className="flex items-center gap-1 text-gray-400 hover:text-primary-500 transition-colors"
              aria-label={`View ${post.comments} comments`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments.toLocaleString()}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}