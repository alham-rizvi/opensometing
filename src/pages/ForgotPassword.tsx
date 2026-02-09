import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyRound, ArrowLeft, ShieldQuestion, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { getUserByUsername, verifySecurityAnswer, updatePassword } from '@/lib/storage';

const usernameSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
});

const resetSchema = z.object({
  securityAnswer: z.string().min(1, 'Please enter your answer'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type UsernameFormData = z.infer<typeof usernameSchema>;
type ResetFormData = z.infer<typeof resetSchema>;

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<'username' | 'reset' | 'success'>('username');
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const usernameForm = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: '' },
  });

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      securityAnswer: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onUsernameSubmit = (data: UsernameFormData) => {
    const user = getUserByUsername(data.username);
    if (!user) {
      toast({
        title: 'User not found',
        description: 'No account exists with this username.',
        variant: 'destructive',
      });
      return;
    }
    setUsername(user.username);
    setSecurityQuestion(user.securityQuestion);
    setStep('reset');
  };

  const onResetSubmit = async (data: ResetFormData) => {
    setIsLoading(true);
    try {
      const isValid = await verifySecurityAnswer(username, data.securityAnswer);
      if (!isValid) {
        toast({
          title: 'Incorrect answer',
          description: 'Your security answer does not match.',
          variant: 'destructive',
        });
        return;
      }

      await updatePassword(username, data.newPassword);
      setStep('success');
      toast({
        title: 'Password reset!',
        description: 'Your password has been updated successfully.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>

        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              {step === 'username' && 'Enter your username to get started'}
              {step === 'reset' && 'Answer your security question'}
              {step === 'success' && 'Your password has been reset'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'username' && (
              <Form {...usernameForm}>
                <form onSubmit={usernameForm.handleSubmit(onUsernameSubmit)} className="space-y-4">
                  <FormField
                    control={usernameForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </form>
              </Form>
            )}

            {step === 'reset' && (
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <ShieldQuestion className="h-4 w-4" />
                      <span>Your Security Question</span>
                    </div>
                    <p className="font-medium">{securityQuestion}</p>
                  </div>

                  <FormField
                    control={resetForm.control}
                    name="securityAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Answer</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your answer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={resetForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    <KeyRound className="h-4 w-4" />
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </form>
              </Form>
            )}

            {step === 'success' && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-primary mx-auto" />
                <p className="text-muted-foreground">
                  Your password has been successfully reset.
                </p>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Go to Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
