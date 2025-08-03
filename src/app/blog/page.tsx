import BlogsPageClient from '@/components/BlogsPage';
import { Suspense } from 'react';

export default function BlogPage() {
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
        </div>
      </section>

      {/* Blog Posts */}
      <section className='py-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Suspense fallback={<p className='text-center'>Loading...</p>}>
            <BlogsPageClient />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
