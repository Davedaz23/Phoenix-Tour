// src/app/api/blog/posts/route.ts - API Route
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

import BlogPost from '@/lib/models/BlogPost';
import { getServerSession } from 'next-auth';

// GET /api/blog/posts?page=1&limit=6&category=...
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    
    const skip = (page - 1) * limit;
    
    // Build query
    const query: any = { published: true };
    
    if (category && category !== 'All Categories') {
      query.category = category;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { 'author.name': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Fetch posts with pagination
    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query)
    ]);
    
    // Calculate pagination info
    const hasMore = skip + posts.length < total;
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore
      }
    });
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog/posts - Create new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    // Add authentication check here
    const session = await getServerSession();
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    await connectDB();
    
    const post = new BlogPost({
      ...body,
      publishedAt: new Date(),
      updatedAt: new Date()
    });
    
    await post.save();
    
    return NextResponse.json({
      success: true,
      post
    });
    
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}