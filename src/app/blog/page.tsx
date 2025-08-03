'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import BlogFilters from '@/components/BlogFilters';
import BlogList from '@/components/BlogList';
import Pagination from '@/components/Pagination';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  createdAt: string;
  slug: string;
  featuredImage?: string;
  category: string;
}

const BlogsPage = () => {
  const params = useSearchParams();
  const page = Number(params.get('page')) || 1;
  const search = params.get('search') || '';
  const category = params.get('category') || '';

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        status: 'published',
        page: page.toString(),
        limit: '9',
        ...(search && { search }),
        ...(category && { category }),
      });

      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch(`/api/blogs?${query}`),
          fetch(`/api/blogs?categories=true`),
        ]);

        if (postsRes.ok) {
          const data = await postsRes.json();
          setBlogPosts(data.blogs || []);
          setTotalPages(data.pagination?.totalPages || 1);
        }

        if (categoriesRes.ok) {
          const catData = await categoriesRes.json();
          setCategories(catData.categories || []);
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, category]);

  return (
    <main className='min-h-screen bg-background'>
      {/* Hero */}
      <section className='pt-20 pb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5'>
        <div className='container text-center max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 font-poppins'>
            Our Blog
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground mb-8'>
            Insights, tutorials, and the latest trends in web development,
            design, and technology.
          </p>
          <Suspense fallback={<div>Loading filters...</div>}>
            <BlogFilters
              categories={categories}
              initialSearch={search}
              initialCategory={category}
            />
          </Suspense>
        </div>
      </section>

      {/* Blog Posts */}
      <section className='py-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          {loading ? (
            <p className='text-center text-muted-foreground'>
              Loading blogs...
            </p>
          ) : blogPosts.length === 0 ? (
            <div className='text-center py-16'>
              <p className='text-lg text-muted-foreground mb-6'>
                {search || category
                  ? 'No articles found matching your criteria.'
                  : 'No articles published yet.'}
              </p>
              <Link href='/'>
                <Button>Back to Home</Button>
              </Link>
            </div>
          ) : (
            <>
              <BlogList blogPosts={blogPosts} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  search={search}
                  category={category}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogsPage;
