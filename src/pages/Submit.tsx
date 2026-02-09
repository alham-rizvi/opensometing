import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Send, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { addTool } from '@/lib/storage';
import { CATEGORIES, ToolCategory } from '@/lib/types';

const submitSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(500, 'Description must be less than 500 characters'),
  category: z.string().min(1, 'Please select a category'),
  url: z.string().url('Please enter a valid URL').refine(
    (url) => url.includes('github.com') || url.includes('gitlab.com') || url.includes('bitbucket.org'),
    'URL must be from GitHub, GitLab, or Bitbucket'
  ),
  imageUrl: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
  license: z.string().min(1, 'Please enter the license').max(50, 'License must be less than 50 characters'),
  tags: z.string().min(1, 'Please enter at least one tag'),
});

type SubmitFormData = z.infer<typeof submitSchema>;

const Submit = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubmitFormData>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      url: '',
      imageUrl: '',
      license: '',
      tags: '',
    },
  });

  const onSubmit = async (data: SubmitFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const tags = data.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);

      addTool({
        name: data.name.trim(),
        description: data.description.trim(),
        category: data.category as ToolCategory,
        url: data.url.trim(),
        imageUrl: data.imageUrl?.trim() || '/placeholder.svg',
        license: data.license.trim(),
        tags,
        submittedBy: user.username,
      });

      toast({
        title: 'Tool submitted!',
        description: 'Your tool has been added to the directory.',
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit tool. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Login Required</CardTitle>
              <CardDescription>
                You need to be logged in to submit a tool
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Link to="/login">
                <Button className="w-full gap-2">
                  <LogIn className="h-4 w-4" />
                  Login to Submit
                </Button>
              </Link>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submit a Tool</CardTitle>
            <CardDescription>
              Share an open source project with our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tool Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., TensorFlow" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this tool does and why it's useful..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum 20 characters, maximum 500
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.icon} {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repository URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/..." {...field} />
                      </FormControl>
                      <FormDescription>
                        GitHub, GitLab, or Bitbucket URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/logo.png" {...field} />
                      </FormControl>
                      <FormDescription>
                        Direct link to the tool's logo or icon
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="license"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., MIT, Apache-2.0, GPL-3.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="python, machine-learning, cli" {...field} />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of tags
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Tool'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Submit;
