import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import BlogFilters from '@/components/BlogFilters';

export const metadata: Metadata = {
  title: 'Blog | CodeMatrix - Latest Insights in Web Development & Technology',
  description:
    'Explore our latest articles on web development, UI/UX design, mobile apps, and technology trends. Stay updated with expert insights and tutorials.',
  keywords: [
    'web development blog',
    'technology insights',
    'programming tutorials',
    'UI UX design',
    'mobile development',
    'React',
    'Next.js',
    'Node.js',
    'CodeMatrix blog',
  ],
  openGraph: {
    title: 'Blogs | CodeMatrix - Latest Insights',
    description:
      'Explore our latest articles on web development, technology, and design.',
    type: 'website',
  },
};

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

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BlogsPage = async ({ searchParams }: BlogsPageProps) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = (params.search as string) || '';
  const category = (params.category as string) || '';

  // Fetch blog posts
  let blogPosts: BlogPost[] = [];
  let totalPages = 1;
  let categories: string[] = [];

  try {
    const searchParamsStr = new URLSearchParams({
      status: 'published',
      page: page.toString(),
      limit: '9',
      ...(search && { search }),
      ...(category && { category }),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs?${searchParamsStr}`,
      {
        cache: 'no-store', // Always fetch fresh data for better UX
      }
    );

    if (response.ok) {
      const data = await response.json();
      blogPosts = data.blogs || [];
      totalPages = data.pagination?.totalPages || 1;
    }

    // Fetch categories
    const categoriesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs?categories=true`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      categories = categoriesData.categories || [];
    }
  } catch {
    // Silently fail if fetching fails
  }

  return (
    <main className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-4xl mx-auto'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 font-poppins'>
              Our Blog
            </h1>
            <p className='text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12'>
              Insights, tutorials, and the latest trends in web development,
              design, and technology.
            </p>

            {/* Search and Filter */}
            <Suspense fallback={<div>Loading filters...</div>}>
              <BlogFilters
                categories={categories}
                initialSearch={search}
                initialCategory={category}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className='py-12 sm:py-16 md:py-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          {blogPosts.length === 0 ? (
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
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto'>
                {blogPosts.map((post, index) => (
                  <Card
                    key={post._id}
                    className='group hover:shadow-lg transition-all duration-300 border-0 shadow-card bg-background animate-fade-in overflow-hidden'
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {post.featuredImage && (
                      <div className='aspect-video overflow-hidden'>
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={400}
                          height={225}
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                    )}
                    <CardContent className='p-4 sm:p-6'>
                      <div className='flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-3'>
                        <div className='flex items-center gap-1'>
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar size={14} />
                          <span>
                            {new Date(post.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      <h2 className='text-lg sm:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2'>
                        {post.title}
                      </h2>

                      <p className='text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3'>
                        {post.excerpt}
                      </p>

                      <div className='flex items-center justify-between'>
                        <span className='text-xs sm:text-sm bg-primary/10 text-primary px-2 py-1 rounded-full'>
                          {post.category}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className='inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1 duration-300'
                        >
                          Read More
                          <ArrowRight size={14} className='ml-1' />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 mt-12'>
                  {page > 1 && (
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(search && { search }),
                        ...(category && { category }),
                        page: (page - 1).toString(),
                      })}`}
                    >
                      <Button variant='outline'>Previous</Button>
                    </Link>
                  )}

                  <div className='flex items-center gap-2'>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Link
                          key={pageNum}
                          href={`/blog?${new URLSearchParams({
                            ...(search && { search }),
                            ...(category && { category }),
                            page: pageNum.toString(),
                          })}`}
                        >
                          <Button
                            variant={page === pageNum ? 'default' : 'outline'}
                            size='sm'
                          >
                            {pageNum}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>

                  {page < totalPages && (
                    <Link
                      href={`/blogs?${new URLSearchParams({
                        ...(search && { search }),
                        ...(category && { category }),
                        page: (page + 1).toString(),
                      })}`}
                    >
                      <Button variant='outline'>Next</Button>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogsPage;
