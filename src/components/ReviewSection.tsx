import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { addReview, deleteReview, getReviewsForTool, Review } from '@/lib/reviews';
import { cn } from '@/lib/utils';

interface Props {
  toolId: string;
  toolName: string;
}

const Stars = ({
  value,
  onChange,
  size = 'sm',
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: 'sm' | 'lg';
}) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        disabled={!onChange}
        onClick={() => onChange?.(n)}
        aria-label={`${n} star${n > 1 ? 's' : ''}`}
        className={cn(!onChange && 'cursor-default')}
      >
        <Star
          className={cn(
            size === 'lg' ? 'h-6 w-6' : 'h-4 w-4',
            n <= value ? 'fill-primary text-primary' : 'text-muted-foreground'
          )}
        />
      </button>
    ))}
  </div>
);

const ReviewSection = ({ toolId, toolName }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setReviews(getReviewsForTool(toolId));
  }, [toolId]);

  const summary = useMemo(() => {
    const count = reviews.length;
    const average = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
    return { count, average };
  }, [reviews]);

  const submit = () => {
    if (!user) return;
    if (content.trim().length < 10) {
      toast({ title: 'Review too short', description: 'Please write at least 10 characters.', variant: 'destructive' });
      return;
    }
    addReview({ toolId, username: user.username, rating, title: title.trim() || `Review of ${toolName}`, content: content.trim() });
    setReviews(getReviewsForTool(toolId));
    setTitle('');
    setContent('');
    toast({ title: 'Thanks for your review!', description: 'Your feedback helps others discover good software.' });
  };

  const remove = (id: string) => {
    deleteReview(id);
    setReviews(getReviewsForTool(toolId));
  };

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold">Community Reviews</h2>
        {summary.count > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Stars value={Math.round(summary.average)} />
            <span>
              {summary.average.toFixed(1)} · {summary.count} review{summary.count === 1 ? '' : 's'}
            </span>
          </div>
        )}
      </div>

      {user ? (
        <Card className="mb-6">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Your rating</span>
              <Stars value={rating} onChange={setRating} size="lg" />
            </div>
            <Input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} />
            <Textarea
              placeholder={`What did you like or dislike about ${toolName}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={2000}
            />
            <Button onClick={submit}>Post review</Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardContent className="p-5 text-sm text-muted-foreground">
            <Link to="/login" className="text-primary underline">
              Log in
            </Link>{' '}
            to share your experience with {toolName}.
          </CardContent>
        </Card>
      )}

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet — be the first to help others out.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Stars value={r.rating} />
                      <span className="font-semibold">{r.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {r.username} · {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {user?.username === r.username && (
                    <Button variant="ghost" size="icon" onClick={() => remove(r.id)} aria-label="Delete review">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="mt-3 text-muted-foreground whitespace-pre-wrap">{r.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
