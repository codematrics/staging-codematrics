'use client';

import BlogForm from '@/components/BlogForm';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogData {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.id}`);

        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }

        const blog = await response.json();
        setBlogData(blog);
      } catch {
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4'></div>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-destructive mb-4'>{error || 'Blog not found'}</p>
          <button
            onClick={() => router.back()}
            className='text-primary hover:underline'
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return <BlogForm initialData={{ ...blogData, id: blogData._id }} isEditing />;
}
