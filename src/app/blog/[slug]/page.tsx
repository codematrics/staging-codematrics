import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Eye, Tag, User } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs/${slug}?public=true`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return {
        title: 'Blog Not Found | CodeMatrix',
        description: 'The requested blog post could not be found.',
      };
    }

    const post: BlogPost = await response.json();

    return {
      title: post.metaTitle || `${post.title} | CodeMatrix Blog`,
      description:
        post.metaDescription ||
        post.excerpt ||
        'Read the latest insights on web development and technology.',
      keywords: post.metaKeywords || [
        ...post.tags,
        post.category,
        'web development',
        'technology',
        'CodeMatrix',
      ],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.author],
        tags: post.tags,
        ...(post.featuredImage && {
          images: [
            {
              url: post.featuredImage,
              alt: post.title,
            },
          ],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        ...(post.featuredImage && {
          images: [post.featuredImage],
        }),
      },
    };
  } catch {
    return {
      title: 'Blog Not Found | CodeMatrix',
      description: 'The requested blog post could not be found.',
    };
  }
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;

  let post: BlogPost | null = null;
  let relatedPosts: BlogPost[] = [];

  try {
    // Fetch the blog post
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs/${slug}?public=true`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      notFound();
    }

    post = await response.json();

    // Increment view count
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs/${slug}?action=increment-views`,
      {
        method: 'POST',
        cache: 'no-store',
      }
    ).catch(() => {
      // Silently fail if view increment fails
    });

    // Fetch related posts
    if (post) {
      const relatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/blogs?status=published&category=${post.category}&limit=3&exclude=${post._id}`,
        {
          next: { revalidate: 3600 },
        }
      );

      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        relatedPosts = relatedData.blogs || [];
      }
    }
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <main className='min-h-screen bg-background'>
      {/* Hero Section with Featured Image */}
      <section className='pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto'>
            {/* Back Button */}
            <Link
              href='/blog'
              className='inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6'
            >
              <ArrowLeft size={18} className='mr-2' />
              Back to Blog
            </Link>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className='aspect-video rounded-lg overflow-hidden mb-8'>
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={800}
                  height={450}
                  className='w-full h-full object-cover'
                />
              </div>
            )}

            {/* Article Header */}
            <div className='mb-8'>
              <div className='flex items-center gap-4 text-sm text-muted-foreground mb-4'>
                <span className='bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium'>
                  {post.category}
                </span>
                <div className='flex items-center gap-1'>
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Calendar size={14} />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className='flex items-center gap-1'>
                  <Eye size={14} />
                  <span>{post.views} views</span>
                </div>
              </div>

              <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 font-poppins leading-tight'>
                {post.title}
              </h1>

              <p className='text-lg text-muted-foreground leading-relaxed'>
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className='flex items-center gap-2 mt-6'>
                  <Tag size={16} className='text-muted-foreground' />
                  <div className='flex flex-wrap gap-2'>
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className='text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className='pb-12 sm:pb-16 md:pb-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto'>
            <article className='prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary prose-a:text-primary hover:prose-a:text-primary/80'>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Article Footer */}
            <div className='mt-12 pt-8 border-t border-border'>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-muted-foreground'>
                  Last updated:{' '}
                  {new Date(post.updatedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
                <Link
                  href='/blog'
                  className='text-primary hover:text-primary/80 transition-colors text-sm font-medium'
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className='py-12 sm:py-16 bg-muted/20'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='max-w-6xl mx-auto'>
              <h2 className='text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center'>
                Related Articles
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {relatedPosts.map(relatedPost => (
                  <Card
                    key={relatedPost._id}
                    className='group hover:shadow-lg transition-all duration-300 border-0 shadow-card bg-background overflow-hidden'
                  >
                    {relatedPost.featuredImage && (
                      <div className='aspect-video overflow-hidden'>
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          width={300}
                          height={169}
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                    )}
                    <CardContent className='p-4 sm:p-6'>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground mb-2'>
                        <span>{relatedPost.category}</span>
                        <span>•</span>
                        <span>
                          {new Date(relatedPost.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </span>
                      </div>

                      <h3 className='text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2'>
                        {relatedPost.title}
                      </h3>

                      <p className='text-sm text-muted-foreground mb-4 line-clamp-2'>
                        {relatedPost.excerpt}
                      </p>

                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className='text-primary hover:text-primary/80 transition-colors text-sm font-medium'
                      >
                        Read More →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetailPage;
