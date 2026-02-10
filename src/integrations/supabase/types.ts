export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string | null
          earned_at: string | null
          id: string
          name: string
          type: string
          user_id: string
        }
        Insert: {
          description?: string | null
          earned_at?: string | null
          id?: string
          name: string
          type: string
          user_id: string
        }
        Update: {
          description?: string | null
          earned_at?: string | null
          id?: string
          name?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          content: string
          cover_image_url: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      community_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          title: string
          tool_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          title: string
          tool_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          title?: string
          tool_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          github_url: string | null
          id: string
          is_verified: boolean | null
          linkedin_url: string | null
          tools_submitted_count: number | null
          twitter_url: string | null
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          github_url?: string | null
          id: string
          is_verified?: boolean | null
          linkedin_url?: string | null
          tools_submitted_count?: number | null
          twitter_url?: string | null
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          github_url?: string | null
          id?: string
          is_verified?: boolean | null
          linkedin_url?: string | null
          tools_submitted_count?: number | null
          twitter_url?: string | null
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          rating: number
          title: string | null
          tool_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          rating: number
          title?: string | null
          tool_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          title?: string | null
          tool_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_claims: {
        Row: {
          claimed_by: string
          created_at: string | null
          evidence: string | null
          id: string
          reason: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
          tool_id: string
        }
        Insert: {
          claimed_by: string
          created_at?: string | null
          evidence?: string | null
          id?: string
          reason: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          tool_id: string
        }
        Update: {
          claimed_by?: string
          created_at?: string | null
          evidence?: string | null
          id?: string
          reason?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_claims_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_contributors: {
        Row: {
          added_at: string | null
          description: string | null
          id: string
          role: string | null
          tool_id: string
          user_id: string
        }
        Insert: {
          added_at?: string | null
          description?: string | null
          id?: string
          role?: string | null
          tool_id: string
          user_id: string
        }
        Update: {
          added_at?: string | null
          description?: string | null
          id?: string
          role?: string | null
          tool_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_contributors_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_issues: {
        Row: {
          created_at: string | null
          description: string
          id: string
          reported_by: string
          status: Database["public"]["Enums"]["issue_status"] | null
          title: string
          tool_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          reported_by: string
          status?: Database["public"]["Enums"]["issue_status"] | null
          title: string
          tool_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          reported_by?: string
          status?: Database["public"]["Enums"]["issue_status"] | null
          title?: string
          tool_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tool_issues_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          avg_rating: number | null
          category_id: string | null
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          install_instructions: string | null
          is_approved: boolean | null
          is_featured: boolean | null
          license: string | null
          long_description: string | null
          name: string
          ownership: Database["public"]["Enums"]["tool_ownership"] | null
          platform: string[] | null
          reviews_count: number | null
          slug: string
          stars_count: number | null
          submitted_by: string | null
          tags: string[] | null
          updated_at: string | null
          url: string
        }
        Insert: {
          avg_rating?: number | null
          category_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          install_instructions?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          license?: string | null
          long_description?: string | null
          name: string
          ownership?: Database["public"]["Enums"]["tool_ownership"] | null
          platform?: string[] | null
          reviews_count?: number | null
          slug: string
          stars_count?: number | null
          submitted_by?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url: string
        }
        Update: {
          avg_rating?: number | null
          category_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          install_instructions?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          license?: string | null
          long_description?: string | null
          name?: string
          ownership?: Database["public"]["Enums"]["tool_ownership"] | null
          platform?: string[] | null
          reviews_count?: number | null
          slug?: string
          stars_count?: number | null
          submitted_by?: string | null
          tags?: string[] | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "tools_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "moderator" | "user"
      claim_status: "pending" | "approved" | "rejected"
      issue_status: "open" | "in_progress" | "resolved" | "closed"
      tool_ownership: "created_by_me" | "uploaded_by_me" | "has_contributors"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "moderator", "user"],
      claim_status: ["pending", "approved", "rejected"],
      issue_status: ["open", "in_progress", "resolved", "closed"],
      tool_ownership: ["created_by_me", "uploaded_by_me", "has_contributors"],
    },
  },
} as const
