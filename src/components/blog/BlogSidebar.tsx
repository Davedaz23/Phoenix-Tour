// src/components/blog/BlogSidebar.tsx - Updated for single post page
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail,
  Bookmark,
  Printer,
  Coffee,
  MapPin
} from 'lucide-react';

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

interface BlogSidebarProps {
  post: any;
  relatedPosts: RelatedPost[];
}

export default function BlogSidebar({ post, relatedPosts }: BlogSidebarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`;
        break;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Share Widget */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Share This Story</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-sm font-medium">Facebook</span>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span className="text-sm font-medium">Twitter</span>
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-800/10 text-blue-800 hover:bg-blue-800/20 rounded-lg transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm font-medium">LinkedIn</span>
          </button>
          <button
            onClick={() => handleShare('email')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Email</span>
          </button>
        </div>
        
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isBookmarked 
                ? 'bg-primary-50 text-primary-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-primary-600' : ''}`} />
            <span className="text-sm">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="text-sm">Print</span>
          </button>
        </div>
      </div>

      {/* Author Info */}
      <div className="bg-gradient-to-br from-primary-50 to-yellow-50 rounded-2xl p-6 border border-primary-100">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">About the Author</h3>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-yellow-500 p-0.5">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">
{post.author.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{post.author.name}</div>
            <div className="text-gray-600 text-sm mb-2">{post.author.role}</div>
            {post.author.bio && (
              <p className="text-gray-600 text-sm">{post.author.bio}</p>
            )}
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
              <Coffee className="w-3 h-3" />
              <span>Specializes in Ethiopian Culture & Travel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" />
            Related Stories
          </h3>
          <div className="space-y-4">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost._id}
                href={`/blog/${relatedPost.slug}`}
                className="block group"
              >
                <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-xs font-medium text-primary-600 mb-1">
                    {relatedPost.category}
                  </div>
                  <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(relatedPost.publishedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary-500" />
          Article Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-700 rounded-full text-sm transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Ethiopian Calendar Widget */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
        <h3 className="font-semibold text-gray-900 text-lg mb-3">Ethiopian Calendar</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Today's Date:</span>
            <span className="font-semibold text-gray-900">የካቲት 15, 2017</span>
          </div>
          <div className="text-sm text-gray-500">
            Ethiopia follows its own calendar with 13 months. Plan your trip according to local festivals and seasons.
          </div>
          <Link
            href="/blog/ethiopian-calendar-guide"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Learn about Ethiopian dates →
          </Link>
        </div>
      </div>
    </div>
  );
}