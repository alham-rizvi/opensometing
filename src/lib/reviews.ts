export interface Review {
  id: string;
  toolId: string;
  username: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

const KEY = 'oss-directory-reviews';

export const getReviews = (): Review[] => {
  const data = localStorage.getItem(KEY);
  return data ? (JSON.parse(data) as Review[]) : [];
};

const save = (reviews: Review[]) => localStorage.setItem(KEY, JSON.stringify(reviews));

export const getReviewsForTool = (toolId: string): Review[] =>
  getReviews()
    .filter((r) => r.toolId === toolId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

export const getRatingSummary = (toolId: string) => {
  const list = getReviewsForTool(toolId);
  const count = list.length;
  const average = count ? list.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  return { count, average };
};

export const addReview = (review: Omit<Review, 'id' | 'createdAt'>): Review => {
  const reviews = getReviews().filter(
    (r) => !(r.toolId === review.toolId && r.username === review.username)
  );
  const created: Review = {
    ...review,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  reviews.push(created);
  save(reviews);
  return created;
};

export const deleteReview = (id: string) => {
  save(getReviews().filter((r) => r.id !== id));
};
