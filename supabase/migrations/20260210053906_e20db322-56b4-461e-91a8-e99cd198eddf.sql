
-- =============================================
-- OPENWIRED DATABASE SCHEMA
-- =============================================

-- 1. ENUMS
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'moderator', 'user');
CREATE TYPE public.tool_ownership AS ENUM ('created_by_me', 'uploaded_by_me', 'has_contributors');
CREATE TYPE public.claim_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.issue_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- 2. PROFILES (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  github_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  tools_submitted_count INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 3. USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Admin can view all roles
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Super admins can manage roles" ON public.user_roles FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin')
);

-- 4. CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES public.categories(id),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

-- 5. TOOLS
CREATE TABLE public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  category_id UUID REFERENCES public.categories(id),
  url TEXT NOT NULL,
  image_url TEXT,
  license TEXT,
  tags TEXT[] DEFAULT '{}',
  install_instructions TEXT,
  platform TEXT[] DEFAULT '{}',
  ownership tool_ownership DEFAULT 'uploaded_by_me',
  submitted_by UUID REFERENCES auth.users(id),
  is_approved BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  stars_count INT DEFAULT 0,
  reviews_count INT DEFAULT 0,
  avg_rating NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved tools visible to all" ON public.tools FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can see own tools" ON public.tools FOR SELECT USING (auth.uid() = submitted_by);
CREATE POLICY "Authenticated users can submit tools" ON public.tools FOR INSERT TO authenticated WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Users can update own tools" ON public.tools FOR UPDATE USING (auth.uid() = submitted_by);
CREATE POLICY "Admins can manage all tools" ON public.tools FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

-- 6. TOOL CONTRIBUTORS
CREATE TABLE public.tool_contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'contributor',
  description TEXT,
  added_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tool_id, user_id)
);

ALTER TABLE public.tool_contributors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contributors are viewable by everyone" ON public.tool_contributors FOR SELECT USING (true);
CREATE POLICY "Admins can manage contributors" ON public.tool_contributors FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

-- 7. REVIEWS
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tool_id, user_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews visible to all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- 8. TOOL ISSUES
CREATE TABLE public.tool_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
  reported_by UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status issue_status DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tool_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Issues visible to all" ON public.tool_issues FOR SELECT USING (true);
CREATE POLICY "Users can report issues" ON public.tool_issues FOR INSERT TO authenticated WITH CHECK (auth.uid() = reported_by);
CREATE POLICY "Users can update own issues" ON public.tool_issues FOR UPDATE USING (auth.uid() = reported_by);
CREATE POLICY "Admins can manage issues" ON public.tool_issues FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

-- 9. TOOL CLAIMS
CREATE TABLE public.tool_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
  claimed_by UUID REFERENCES auth.users(id) NOT NULL,
  reason TEXT NOT NULL,
  evidence TEXT,
  status claim_status DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tool_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see own claims" ON public.tool_claims FOR SELECT USING (auth.uid() = claimed_by);
CREATE POLICY "Users can submit claims" ON public.tool_claims FOR INSERT TO authenticated WITH CHECK (auth.uid() = claimed_by);
CREATE POLICY "Admins can manage claims" ON public.tool_claims FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

-- 10. COMMUNITY POSTS
CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool_id UUID REFERENCES public.tools(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts visible to all" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON public.community_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

-- 11. COMMUNITY COMMENTS
CREATE TABLE public.community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments visible to all" ON public.community_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.community_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.community_comments FOR DELETE USING (auth.uid() = user_id);

-- 12. BLOG POSTS
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blogs visible to all" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage blogs" ON public.blog_posts FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

-- 13. ACHIEVEMENTS
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, type)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements visible to all" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "System can manage achievements" ON public.achievements FOR ALL USING (
  public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'admin')
);

-- 14. PROFILE TRIGGER (auto-create on signup)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 15. UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON public.tools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_tool_issues_updated_at BEFORE UPDATE ON public.tool_issues FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 16. STORAGE BUCKET FOR AVATARS AND TOOL IMAGES
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('tool-images', 'tool-images', true);

CREATE POLICY "Avatar images publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Tool images publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'tool-images');
CREATE POLICY "Authenticated users can upload tool images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'tool-images');
