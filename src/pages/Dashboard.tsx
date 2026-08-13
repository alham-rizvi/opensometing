import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Trash2, Plus, Calendar, Gauge, MessageSquare, Layers, Star, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { getToolsByUser, deleteTool } from '@/lib/storage';
import { getCategoryName } from '@/lib/types';
import { getReviews } from '@/lib/reviews';
import { openStackerScore, scoreLabel } from '@/lib/score';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!user) return null;

  const userTools = getToolsByUser(user.username);
  const userReviews = getReviews().filter((r) => r.username === user.username);
  const categoriesCovered = new Set(userTools.map((t) => t.category)).size;
  const avgScore = userTools.length
    ? Math.round(userTools.reduce((sum, t) => sum + openStackerScore(t), 0) / userTools.length)
    : 0;

  const stats = [
    { label: 'Published tools', value: userTools.length, icon: Package, hint: 'Live in the directory' },
    { label: 'Reviews written', value: userReviews.length, icon: MessageSquare, hint: 'Helping the community' },
    { label: 'Categories covered', value: categoriesCovered, icon: Layers, hint: 'Across the stack' },
    {
      label: 'Avg. Stacker Score',
      value: avgScore || '—',
      icon: Gauge,
      hint: avgScore ? scoreLabel(avgScore) : 'Submit a project',
    },
  ];

  const handleDeleteTool = (toolId: string, toolName: string) => {
    const success = deleteTool(toolId);
    if (success) {
      toast({
        title: 'Tool deleted',
        description: `"${toolName}" has been removed.`,
      });
      setRefreshKey((k) => k + 1);
    } else {
      toast({
        title: 'Error',
        description: 'Could not delete tool.',
        variant: 'destructive',
      });
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-4 py-8" key={refreshKey}>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your published projects, reviews and contributor profile on Open Stacker
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, hint }) => (
              <Card key={label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-3xl font-bold mt-2">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{hint}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tools submitted</p>
                  <p className="font-medium">{userTools.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reviews written</p>
                  <p className="font-medium flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {userReviews.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contributor level</p>
                  <Badge variant="secondary">
                    {userTools.length + userReviews.length >= 10
                      ? 'Core contributor'
                      : userTools.length + userReviews.length >= 3
                        ? 'Active contributor'
                        : 'Newcomer'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tools Section */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Your published projects
                  </CardTitle>
                  <CardDescription>
                    Projects you've published to Open Stacker
                  </CardDescription>
                </div>
                <Link to="/submit">
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Tool
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {userTools.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      You haven't submitted any tools yet
                    </p>
                    <Link to="/submit">
                      <Button variant="outline" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Submit Your First Tool
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userTools.map((tool) => (
                      <div
                        key={tool.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src={tool.imageUrl}
                              alt={tool.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          <div>
                            <Link
                              to={`/tools/${tool.id}`}
                              className="font-medium hover:underline"
                            >
                              {tool.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {getCategoryName(tool.category)}
                              </Badge>
                              <Badge className="text-xs gap-1">
                                <Gauge className="h-3 w-3" />
                                {openStackerScore(tool)}/100
                              </Badge>
                              <Badge variant="outline" className="text-xs gap-1">
                                <Globe className="h-3 w-3" />
                                Published
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(tool.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Tool?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{tool.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTool(tool.id, tool.name)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Dashboard;
