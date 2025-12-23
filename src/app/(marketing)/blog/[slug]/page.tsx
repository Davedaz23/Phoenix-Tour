// src/app/blog/[slug]/page.tsx - Blog Post Detail Page
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogSidebar from '@/components/blog/BlogSidebar';
// import BlogComments from '@/components/blog/BlogComments';
// import BlogPostContent from '@/components/blog/BlogPostContent';
import  connectDB  from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { Eye, Heart, Share2, Bookmark } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  await connectDB();
  const post = await BlogPost.findOne({ slug: params.slug, published: true }).lean();
  
  if (!post) {
    return {
      title: 'Post Not Found | Phoenix Ethiopia Tour Blog',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.metaKeywords || post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  await connectDB();
  
  // Fetch the blog post
  const post = await BlogPost.findOne({ slug: params.slug, published: true }).lean();
  
  if (!post) {
    notFound();
  }
  
  // Increment view count
  await BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } });
  
  // Fetch related posts
  const relatedPosts = await BlogPost.find({
    _id: { $ne: post._id },
    published: true,
    $or: [
      { category: post.category },
      { tags: { $in: post.tags } }
    ]
  })
  .sort({ views: -1, publishedAt: -1 })
  .limit(3)
  .lean();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-500/10 via-white to-yellow-500/5">
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <a href="/" className="hover:text-primary-500">Home</a>
              <span>›</span>
              <a href="/blog" className="hover:text-primary-500">Blog</a>
              <span>›</span>
              <a href={`/blog?category=${post.category}`} className="hover:text-primary-500">{post.category}</a>
              <span>›</span>
              <span className="text-gray-700">{post.title}</span>
            </nav>
            
            {/* Category Badge */}
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-full">
                {post.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8">
              {post.excerpt}
            </p>
            
            {/* Author & Meta Info */}
            {/* Author & Meta Info */}
<div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-200">
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-yellow-500 p-0.5">
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
      <div className="text-gray-600">{post.author.role}</div>
      <div className="text-gray-500 text-sm mt-1">
        Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
        <span className="mx-2">•</span>
        {post.readTime} min read
      </div>
    </div>
  </div>
  
  {/* Stats & Actions */}
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2 text-gray-500">
      <Eye className="w-5 h-5" />
      <span>{post.views.toLocaleString()} views</span>
    </div>
    <div className="flex items-center gap-2 text-gray-500">
      <Heart className="w-5 h-5" />
      <span>{post.likes.toLocaleString()} likes</span>
    </div>
    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Share2 className="w-5 h-5 text-gray-500" />
    </button>
    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Bookmark className="w-5 h-5 text-gray-500" />
    </button>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content */}
            {/* <div className="lg:col-span-2">
              <BlogPostContent post={post} />
              <BlogComments postId={post._id.toString()} />
            </div> */}
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar post={post} relatedPosts={relatedPosts} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}