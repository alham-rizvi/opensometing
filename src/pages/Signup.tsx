import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, ArrowLeft, ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
  confirmPassword: z.string(),
  securityQuestion: z
    .string()
    .min(10, 'Security question must be at least 10 characters')
    .max(100, 'Security question must be less than 100 characters'),
  securityAnswer: z
    .string()
    .min(2, 'Security answer must be at least 2 characters')
    .max(50, 'Security answer must be less than 50 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const { user, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: '',
    },
  });

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const result = await signup(
        data.username,
        data.password,
        data.securityQuestion,
        data.securityAnswer
      );
      if (result.success) {
        toast({
          title: 'Account created!',
          description: 'Welcome to OSS Directory.',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Signup failed',
          description: result.error || 'Could not create account',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join our community and start sharing tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Choose a username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                    <ShieldQuestion className="h-5 w-5" />
                    <span className="text-sm font-medium">Security Question (Required)</span>
                  </div>

                  <FormField
                    control={form.control}
                    name="securityQuestion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Custom Security Question</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., What was your first pet's name?"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Create a question only you know the answer to
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securityAnswer"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Answer</FormLabel>
                        <FormControl>
                          <Input placeholder="Your answer" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be used to recover your password
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  <UserPlus className="h-4 w-4" />
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
