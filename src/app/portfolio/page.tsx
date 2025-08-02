'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Filter, Github } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'design', name: 'UI/UX Design' },
  ];

  const projects = [
    {
      id: 1,
      title: 'TechStart E-commerce Platform',
      category: 'ecommerce',
      description:
        'Modern e-commerce platform with advanced inventory management and payment integration.',
      image:
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'FinanceFlow Mobile App',
      category: 'mobile',
      description:
        'Cross-platform mobile application for personal finance management with real-time analytics.',
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      technologies: ['Flutter', 'Firebase', 'Dart'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Corporate Website Redesign',
      category: 'web',
      description:
        'Complete redesign and development of corporate website with CMS integration.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      technologies: ['Vue.js', 'Laravel', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Healthcare Dashboard',
      category: 'web',
      description:
        'Real-time dashboard for healthcare providers with patient management system.',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Express.js', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 5,
      title: 'Restaurant Booking App',
      category: 'mobile',
      description:
        'Mobile application for restaurant reservations with integrated payment system.',
      image:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'Learning Management System',
      category: 'web',
      description:
        'Comprehensive LMS platform with video streaming and progress tracking.',
      image:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Laravel', 'MySQL', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 7,
      title: 'Brand Identity Design',
      category: 'design',
      description:
        'Complete brand identity design including logo, color palette, and style guide.',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      technologies: ['Figma', 'Adobe Creative Suite'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 8,
      title: 'Inventory Management System',
      category: 'web',
      description:
        'Real-time inventory tracking system with automated alerts and reporting.',
      image:
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
      technologies: ['Vue.js', 'PHP', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center text-white'>
            <h1 className='text-4xl lg:text-5xl font-bold mb-6 font-poppins animate-fade-in-up'>
              Our Portfolio
            </h1>
            <p
              className='text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in'
              style={{ animationDelay: '0.2s' }}
            >
              Showcase of successful projects and innovative solutions
              we&apos;ve delivered for our clients
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              Featured Projects
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Our most successful and innovative projects that showcase our
              expertise
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
            {featuredProjects.slice(0, 2).map((project, index) => (
              <Card
                key={project.id}
                className='group overflow-hidden border-0 shadow-card hover:shadow-hero transition-all duration-300 animate-fade-in'
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className='relative overflow-hidden'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    height={300}
                    width={600}
                    className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <div className='flex space-x-4'>
                      <Button
                        size='sm'
                        className='bg-white text-primary hover:bg-white/90'
                      >
                        <ExternalLink size={16} className='mr-2' />
                        Live Demo
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        className='border-white text-white hover:bg-white/20'
                      >
                        <Github size={16} className='mr-2' />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-semibold text-foreground mb-3 font-poppins'>
                    {project.title}
                  </h3>
                  <p className='text-muted-foreground mb-4 leading-relaxed'>
                    {project.description}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className='px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              All Projects
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto mb-8'>
              Browse through our complete portfolio of successful projects
            </p>

            {/* Filter Buttons */}
            <div className='flex flex-wrap justify-center gap-4 mb-8'>
              {filters.map(filter => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`${activeFilter === filter.id ? 'bg-gradient-primary border-0' : ''}`}
                >
                  <Filter size={16} className='mr-2' />
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className='group overflow-hidden border-0 bg-background shadow-card hover:shadow-hero transition-all duration-300 animate-fade-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='relative overflow-hidden'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    height={300}
                    width={600}
                    className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <div className='flex space-x-3'>
                      <Button
                        size='sm'
                        className='bg-white text-primary hover:bg-white/90'
                      >
                        <ExternalLink size={14} />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        className='border-white text-white hover:bg-white/20'
                      >
                        <Github size={14} />
                      </Button>
                    </div>
                  </div>
                  {project.featured && (
                    <div className='absolute top-4 left-4 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-semibold'>
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className='p-6'>
                  <h3 className='text-lg font-semibold text-foreground mb-2 font-poppins'>
                    {project.title}
                  </h3>
                  <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
                    {project.description}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {project.technologies.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className='px-2 py-1 bg-accent text-accent-foreground rounded text-xs'
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className='px-2 py-1 bg-muted text-muted-foreground rounded text-xs'>
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-lg text-muted-foreground'>
                No projects found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-gradient-hero'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white'>
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '30+', label: 'Happy Clients' },
              { number: '15+', label: 'Technologies Used' },
              { number: '98%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className='animate-scale-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='text-3xl lg:text-4xl font-bold mb-2 font-poppins'>
                  {stat.number}
                </div>
                <div className='text-sm lg:text-base opacity-90'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-6 font-poppins'>
              Ready to Add Your Project to Our Portfolio?
            </h2>
            <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
              Let&apos;s work together to create something amazing that
              showcases your brand and achieves your business goals.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a href='/contact' className='inline-block'>
                <Button size='lg' className='bg-gradient-primary border-0'>
                  Start Your Project
                </Button>
              </a>
              <a href='/services' className='inline-block'>
                <Button variant='outline' size='lg'>
                  View Our Services
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
