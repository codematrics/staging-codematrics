import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle,
  Code,
  Palette,
  Server,
  Smartphone,
  Star,
} from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  const services = [
    {
      icon: Palette,
      title: 'Web & Graphic Design',
      description:
        'Beautiful, user-centric designs that convert visitors into customers.',
      features: ['UI/UX Design', 'Brand Identity', 'Responsive Layouts'],
    },
    {
      icon: Code,
      title: 'Frontend Development',
      description:
        'Modern, interactive web applications using cutting-edge technologies.',
      features: ['React & Vue.js', 'TypeScript', 'Progressive Web Apps'],
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Robust, scalable server solutions for your business needs.',
      features: ['API Development', 'Database Design', 'Cloud Integration'],
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications.',
      features: ['iOS & Android', 'Flutter', 'React Native'],
    },
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '15+', label: 'Technologies' },
    { number: '3+', label: 'Years Experience' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content:
        'CodeMatrics transformed our digital presence completely. Their attention to detail and technical expertise is outstanding.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCorp',
      content:
        'The mobile app they developed exceeded our expectations. Professional, efficient, and always delivered on time.',
      rating: 5,
    },
  ];

  return (
    <div className='min-h-screen'>
      <Hero />

      {/* Services Overview */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              Our Services
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Comprehensive IT solutions tailored to drive your business forward
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className='group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card animate-fade-in'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className='p-6 text-center'>
                    <div className='w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                      <Icon size={32} className='text-white' />
                    </div>
                    <h3 className='text-xl font-semibold text-foreground mb-3 font-poppins'>
                      {service.title}
                    </h3>
                    <p className='text-muted-foreground mb-4 leading-relaxed'>
                      {service.description}
                    </p>
                    <ul className='space-y-2'>
                      {service.features.map(feature => (
                        <li
                          key={feature}
                          className='flex items-center text-sm text-muted-foreground'
                        >
                          <CheckCircle
                            size={16}
                            className='text-primary mr-2 flex-shrink-0'
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className='text-center mt-12'>
            <Link href='/services'>
              <Button size='lg' className='bg-gradient-primary border-0 group'>
                View All Services
                <ArrowRight
                  size={20}
                  className='ml-2 group-hover:translate-x-1 transition-transform'
                />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-gradient-hero'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className='text-center animate-scale-in'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='text-4xl lg:text-5xl font-bold text-white mb-2 font-poppins'>
                  {stat.number}
                </div>
                <div className='text-white/80 text-sm lg:text-base'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-16 lg:py-24 bg-accent/30'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4 font-poppins'>
              What Our Clients Say
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Don&apos;t just take our word for it - hear from our satisfied
              clients
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className='bg-background border-0 shadow-card animate-fade-in'
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className='p-8'>
                  <div className='flex items-center mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className='text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <p className='text-foreground mb-6 text-lg leading-relaxed italic'>
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <div className='font-semibold text-foreground'>
                      {testimonial.name}
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-6 font-poppins'>
              Ready to Start Your Project?
            </h2>
            <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
              Let&apos;s discuss your ideas and turn them into reality. Get in
              touch with our team today.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/contact'>
                <Button
                  size='lg'
                  className='bg-gradient-primary border-0 group'
                >
                  Get In Touch
                  <ArrowRight
                    size={20}
                    className='ml-2 group-hover:translate-x-1 transition-transform'
                  />
                </Button>
              </Link>
              <Link href='/portfolio'>
                <Button variant='outline' size='lg'>
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
