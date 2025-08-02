'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Briefcase,
  Calendar,
  Download,
  Eye,
  Mail,
  MessageSquare,
  Search,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: string;
  status?: 'new' | 'read' | 'replied';
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contact', {
        headers: {
          Authorization: 'Bearer admin-token-123', // Change this to your secure token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }

      const data = await response.json();
      setInquiries(data);
    } catch {
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries = inquiries.filter(
    inquiry =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Company',
      'Subject',
      'Message',
      'Status',
      'Timestamp',
    ];
    const csvContent = [
      headers.join(','),
      ...inquiries.map(inquiry =>
        [
          inquiry._id,
          `"${inquiry.name}"`,
          inquiry.email,
          inquiry.company || '',
          `"${inquiry.subject}"`,
          `"${inquiry.message.replace(/"/g, '""')}"`,
          inquiry.status || 'new',
          inquiry.timestamp,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-background p-8'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
              <p className='text-muted-foreground'>Loading inquiries...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-background p-8'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-center h-64'>
            <div className='text-center'>
              <p className='text-red-500 mb-4'>{error}</p>
              <Button onClick={fetchInquiries}>Try Again</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-foreground mb-2'>
            Contact Inquiries
          </h1>
          <p className='text-muted-foreground'>
            Manage and review customer inquiries
          </p>
        </div>

        {/* Controls */}
        <div className='flex flex-col sm:flex-row gap-4 mb-6'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              placeholder='Search inquiries...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <Button
            onClick={exportToCSV}
            variant='outline'
            className='flex items-center gap-2'
          >
            <Download className='h-4 w-4' />
            Export CSV
          </Button>
          <Button onClick={fetchInquiries} variant='outline'>
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center gap-2'>
                <MessageSquare className='h-5 w-5 text-primary' />
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Total Inquiries
                  </p>
                  <p className='text-2xl font-bold'>{inquiries.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-primary' />
                <div>
                  <p className='text-sm text-muted-foreground'>This Month</p>
                  <p className='text-2xl font-bold'>
                    {
                      inquiries.filter(inquiry => {
                        const inquiryDate = new Date(inquiry.timestamp);
                        const now = new Date();
                        return (
                          inquiryDate.getMonth() === now.getMonth() &&
                          inquiryDate.getFullYear() === now.getFullYear()
                        );
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4'>
              <div className='flex items-center gap-2'>
                <Search className='h-5 w-5 text-primary' />
                <div>
                  <p className='text-sm text-muted-foreground'>
                    Filtered Results
                  </p>
                  <p className='text-2xl font-bold'>
                    {filteredInquiries.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries List */}
        <div className='grid gap-4'>
          {filteredInquiries.length === 0 ? (
            <Card>
              <CardContent className='p-8 text-center'>
                <MessageSquare className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                <p className='text-muted-foreground'>
                  {searchTerm
                    ? 'No inquiries match your search.'
                    : 'No inquiries yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredInquiries.map(inquiry => (
              <Card
                key={inquiry._id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader className='pb-3'>
                  <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
                    <CardTitle className='text-lg flex items-center gap-2'>
                      <User className='h-5 w-5 text-primary' />
                      {inquiry.name}
                    </CardTitle>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Calendar className='h-4 w-4' />
                      {formatDate(inquiry.timestamp)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-3'>
                    <div className='flex items-center gap-2 text-sm'>
                      <Mail className='h-4 w-4 text-primary' />
                      <a
                        href={`mailto:${inquiry.email}`}
                        className='text-primary hover:underline'
                      >
                        {inquiry.email}
                      </a>
                    </div>

                    {inquiry.company && (
                      <div className='flex items-center gap-2 text-sm'>
                        <Briefcase className='h-4 w-4 text-primary' />
                        <span className='text-muted-foreground'>
                          {inquiry.company}
                        </span>
                      </div>
                    )}

                    <div className='flex items-center gap-2 text-sm'>
                      <MessageSquare className='h-4 w-4 text-primary' />
                      <span className='px-2 py-1 bg-primary/10 text-primary rounded-full text-xs'>
                        {inquiry.subject}
                      </span>
                    </div>

                    <div className='mt-3'>
                      <div className='flex items-start gap-2'>
                        <MessageSquare className='h-4 w-4 text-primary mt-1 flex-shrink-0' />
                        <div className='flex-1'>
                          <p className='text-sm text-muted-foreground mb-1'>
                            Message:
                          </p>
                          <p className='text-sm bg-accent/50 p-3 rounded-lg'>
                            {inquiry.message}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-end gap-2 mt-4 pt-3 border-t'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => {
                          // View details functionality can be implemented later
                        }}
                        className='flex items-center gap-1'
                      >
                        <Eye className='h-3 w-3' />
                        View Details
                      </Button>
                      <Button
                        size='sm'
                        onClick={() =>
                          window.open(
                            `mailto:${inquiry.email}?subject=Re: ${inquiry.subject}&body=Hello ${inquiry.name},%0D%0A%0D%0AThank you for your inquiry about ${inquiry.subject}.%0D%0A%0D%0A`
                          )
                        }
                        className='flex items-center gap-1'
                      >
                        <Mail className='h-3 w-3' />
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
