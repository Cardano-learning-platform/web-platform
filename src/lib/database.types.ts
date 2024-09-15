export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_permissions: {
        Row: {
          action: string | null
          action_parameters: Json | null
          conditions: Json | null
          created_at: string | null
          created_by_id: number | null
          id: number
          properties: Json | null
          subject: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          action_parameters?: Json | null
          conditions?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          properties?: Json | null
          subject?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          action_parameters?: Json | null
          conditions?: Json | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          properties?: Json | null
          subject?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_permissions_role_links: {
        Row: {
          id: number
          permission_id: number | null
          permission_order: number | null
          role_id: number | null
        }
        Insert: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Update: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_permissions_role_links_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "admin_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_permissions_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_roles: {
        Row: {
          code: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          id: number
          name: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_roles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_roles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          blocked: boolean | null
          created_at: string | null
          created_by_id: number | null
          email: string | null
          firstname: string | null
          id: number
          is_active: boolean | null
          lastname: string | null
          password: string | null
          prefered_language: string | null
          registration_token: string | null
          reset_password_token: string | null
          updated_at: string | null
          updated_by_id: number | null
          username: string | null
        }
        Insert: {
          blocked?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean | null
          lastname?: string | null
          password?: string | null
          prefered_language?: string | null
          registration_token?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Update: {
          blocked?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean | null
          lastname?: string | null
          password?: string | null
          prefered_language?: string | null
          registration_token?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users_roles_links: {
        Row: {
          id: number
          role_id: number | null
          role_order: number | null
          user_id: number | null
          user_order: number | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          role_order?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Update: {
          id?: number
          role_id?: number | null
          role_order?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_roles_links_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_users_roles_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "admin_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      archived_users: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          published_at: string | null
          updated_at: string | null
          updated_by_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          published_at?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "archived_users_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archived_users_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          category_description: string | null
          category_title: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          published_at: string | null
          slug: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          category_description?: string | null
          category_title?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          published_at?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          category_description?: string | null
          category_title?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          published_at?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          chapter_description: string | null
          chapter_name: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          slug: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          chapter_description?: string | null
          chapter_name?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          chapter_description?: string | null
          chapter_name?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters_course_links: {
        Row: {
          chapter_id: number | null
          chapter_order: number | null
          course_id: number | null
          id: number
        }
        Insert: {
          chapter_id?: number | null
          chapter_order?: number | null
          course_id?: number | null
          id?: number
        }
        Update: {
          chapter_id?: number | null
          chapter_order?: number | null
          course_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "chapters_course_links_fk"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapters_course_links_inv_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          course_image_url: string | null
          course_name: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          id: number
          price: number | null
          slug: string | null
          tag: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          course_image_url?: string | null
          course_name?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          price?: number | null
          slug?: string | null
          tag?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          course_image_url?: string | null
          course_name?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          price?: number | null
          slug?: string | null
          tag?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_category_links: {
        Row: {
          category_id: number | null
          course_id: number | null
          course_order: number | null
          id: number
        }
        Insert: {
          category_id?: number | null
          course_id?: number | null
          course_order?: number | null
          id?: number
        }
        Update: {
          category_id?: number | null
          course_id?: number | null
          course_order?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_links_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_category_links_inv_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          alternative_text: string | null
          caption: string | null
          created_at: string | null
          created_by_id: number | null
          ext: string | null
          folder_path: string | null
          formats: Json | null
          hash: string | null
          height: number | null
          id: number
          mime: string | null
          name: string | null
          preview_url: string | null
          provider: string | null
          provider_metadata: Json | null
          size: number | null
          updated_at: string | null
          updated_by_id: number | null
          url: string | null
          width: number | null
        }
        Insert: {
          alternative_text?: string | null
          caption?: string | null
          created_at?: string | null
          created_by_id?: number | null
          ext?: string | null
          folder_path?: string | null
          formats?: Json | null
          hash?: string | null
          height?: number | null
          id?: number
          mime?: string | null
          name?: string | null
          preview_url?: string | null
          provider?: string | null
          provider_metadata?: Json | null
          size?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
          url?: string | null
          width?: number | null
        }
        Update: {
          alternative_text?: string | null
          caption?: string | null
          created_at?: string | null
          created_by_id?: number | null
          ext?: string | null
          folder_path?: string | null
          formats?: Json | null
          hash?: string | null
          height?: number | null
          id?: number
          mime?: string | null
          name?: string | null
          preview_url?: string | null
          provider?: string | null
          provider_metadata?: Json | null
          size?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
          url?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "files_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      files_folder_links: {
        Row: {
          file_id: number | null
          file_order: number | null
          folder_id: number | null
          id: number
        }
        Insert: {
          file_id?: number | null
          file_order?: number | null
          folder_id?: number | null
          id?: number
        }
        Update: {
          file_id?: number | null
          file_order?: number | null
          folder_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "files_folder_links_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_folder_links_inv_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      files_related_morphs: {
        Row: {
          field: string | null
          file_id: number | null
          id: number
          order: number | null
          related_id: number | null
          related_type: string | null
        }
        Insert: {
          field?: string | null
          file_id?: number | null
          id?: number
          order?: number | null
          related_id?: number | null
          related_type?: string | null
        }
        Update: {
          field?: string | null
          file_id?: number | null
          id?: number
          order?: number | null
          related_id?: number | null
          related_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_related_morphs_fk"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
        ]
      }
      i18n_locale: {
        Row: {
          code: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          name: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "i18n_locale_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "i18n_locale_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_histories: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_histories_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_histories_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_histories_course_links: {
        Row: {
          course_id: number | null
          id: number
          lesson_history_id: number | null
          lesson_history_order: number | null
        }
        Insert: {
          course_id?: number | null
          id?: number
          lesson_history_id?: number | null
          lesson_history_order?: number | null
        }
        Update: {
          course_id?: number | null
          id?: number
          lesson_history_id?: number | null
          lesson_history_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_histories_course_links_fk"
            columns: ["lesson_history_id"]
            isOneToOne: false
            referencedRelation: "lesson_histories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_histories_course_links_inv_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_histories_lesson_links: {
        Row: {
          id: number
          lesson_history_id: number | null
          lesson_history_order: number | null
          lesson_id: number | null
        }
        Insert: {
          id?: number
          lesson_history_id?: number | null
          lesson_history_order?: number | null
          lesson_id?: number | null
        }
        Update: {
          id?: number
          lesson_history_id?: number | null
          lesson_history_order?: number | null
          lesson_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_histories_lesson_links_fk"
            columns: ["lesson_history_id"]
            isOneToOne: false
            referencedRelation: "lesson_histories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_histories_lesson_links_inv_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_histories_profile_links: {
        Row: {
          id: number
          lesson_history_id: number | null
          lesson_history_order: number | null
          profile_id: number | null
        }
        Insert: {
          id?: number
          lesson_history_id?: number | null
          lesson_history_order?: number | null
          profile_id?: number | null
        }
        Update: {
          id?: number
          lesson_history_id?: number | null
          lesson_history_order?: number | null
          profile_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_histories_profile_links_fk"
            columns: ["lesson_history_id"]
            isOneToOne: false
            referencedRelation: "lesson_histories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_histories_profile_links_inv_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          lesson_content: string | null
          lesson_description: string | null
          lesson_title: string | null
          lesson_type: string | null
          slug: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          lesson_content?: string | null
          lesson_description?: string | null
          lesson_title?: string | null
          lesson_type?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          lesson_content?: string | null
          lesson_description?: string | null
          lesson_title?: string | null
          lesson_type?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons_chapter_links: {
        Row: {
          chapter_id: number | null
          id: number
          lesson_id: number | null
          lesson_order: number | null
        }
        Insert: {
          chapter_id?: number | null
          id?: number
          lesson_id?: number | null
          lesson_order?: number | null
        }
        Update: {
          chapter_id?: number | null
          id?: number
          lesson_id?: number | null
          lesson_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_links_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_chapter_links_inv_fk"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons_course_links: {
        Row: {
          course_id: number | null
          id: number
          lesson_id: number | null
          lesson_order: number | null
        }
        Insert: {
          course_id?: number | null
          id?: number
          lesson_id?: number | null
          lesson_order?: number | null
        }
        Update: {
          course_id?: number | null
          id?: number
          lesson_id?: number | null
          lesson_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_links_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_course_links_inv_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          created_by_id: number | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          tour_status: Json | null
          updated_at: string | null
          updated_by_id: number | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          tour_status?: Json | null
          updated_at?: string | null
          updated_by_id?: number | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          tour_status?: Json | null
          updated_at?: string | null
          updated_by_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          question_answer: string | null
          question_title: string | null
          question_type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          question_answer?: string | null
          question_title?: string | null
          question_type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          question_answer?: string | null
          question_title?: string | null
          question_type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      questions_quiz_links: {
        Row: {
          id: number
          question_id: number | null
          question_order: number | null
          quiz_id: number | null
        }
        Insert: {
          id?: number
          question_id?: number | null
          question_order?: number | null
          quiz_id?: number | null
        }
        Update: {
          id?: number
          question_id?: number | null
          question_order?: number | null
          quiz_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_quiz_links_fk"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_quiz_links_inv_fk"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_performances: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          quiz_time_taken: number | null
          score: number | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          quiz_time_taken?: number | null
          score?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          quiz_time_taken?: number | null
          score?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_performances_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_performances_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_performances_profile_links: {
        Row: {
          id: number
          profile_id: number | null
          quiz_performance_id: number | null
          quiz_performance_order: number | null
        }
        Insert: {
          id?: number
          profile_id?: number | null
          quiz_performance_id?: number | null
          quiz_performance_order?: number | null
        }
        Update: {
          id?: number
          profile_id?: number | null
          quiz_performance_id?: number | null
          quiz_performance_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_performances_profile_links_fk"
            columns: ["quiz_performance_id"]
            isOneToOne: false
            referencedRelation: "quiz_performances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_performances_profile_links_inv_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_performances_quiz_links: {
        Row: {
          id: number
          quiz_id: number | null
          quiz_performance_id: number | null
          quiz_performance_order: number | null
        }
        Insert: {
          id?: number
          quiz_id?: number | null
          quiz_performance_id?: number | null
          quiz_performance_order?: number | null
        }
        Update: {
          id?: number
          quiz_id?: number | null
          quiz_performance_id?: number | null
          quiz_performance_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_performances_quiz_links_fk"
            columns: ["quiz_performance_id"]
            isOneToOne: false
            referencedRelation: "quiz_performances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_performances_quiz_links_inv_fk"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          published_at: string | null
          quiz_description: string | null
          quiz_difficulty: string | null
          quiz_title: string | null
          slug: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          published_at?: string | null
          quiz_description?: string | null
          quiz_difficulty?: string | null
          quiz_title?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          published_at?: string | null
          quiz_description?: string | null
          quiz_difficulty?: string | null
          quiz_title?: string | null
          slug?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes_lesson_links: {
        Row: {
          id: number
          lesson_id: number | null
          quiz_id: number | null
          quiz_order: number | null
        }
        Insert: {
          id?: number
          lesson_id?: number | null
          quiz_id?: number | null
          quiz_order?: number | null
        }
        Update: {
          id?: number
          lesson_id?: number | null
          quiz_id?: number | null
          quiz_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_links_fk"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_lesson_links_inv_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_informations: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          reading_time: number | null
          timestamp: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          reading_time?: number | null
          timestamp?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          reading_time?: number | null
          timestamp?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_informations_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_informations_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_informations_course_links: {
        Row: {
          course_id: number | null
          id: number
          reading_information_id: number | null
        }
        Insert: {
          course_id?: number | null
          id?: number
          reading_information_id?: number | null
        }
        Update: {
          course_id?: number | null
          id?: number
          reading_information_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_informations_course_links_fk"
            columns: ["reading_information_id"]
            isOneToOne: false
            referencedRelation: "reading_informations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_informations_course_links_inv_fk"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_informations_lessons_links: {
        Row: {
          id: number
          lesson_id: number | null
          lesson_order: number | null
          reading_information_id: number | null
        }
        Insert: {
          id?: number
          lesson_id?: number | null
          lesson_order?: number | null
          reading_information_id?: number | null
        }
        Update: {
          id?: number
          lesson_id?: number | null
          lesson_order?: number | null
          reading_information_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_informations_lessons_links_fk"
            columns: ["reading_information_id"]
            isOneToOne: false
            referencedRelation: "reading_informations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_informations_lessons_links_inv_fk"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_informations_profile_links: {
        Row: {
          id: number
          profile_id: number | null
          reading_information_id: number | null
          reading_information_order: number | null
        }
        Insert: {
          id?: number
          profile_id?: number | null
          reading_information_id?: number | null
          reading_information_order?: number | null
        }
        Update: {
          id?: number
          profile_id?: number | null
          reading_information_id?: number | null
          reading_information_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_informations_profile_links_fk"
            columns: ["reading_information_id"]
            isOneToOne: false
            referencedRelation: "reading_informations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_informations_profile_links_inv_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_token_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_token_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_token_permissions_token_links: {
        Row: {
          api_token_id: number | null
          api_token_permission_id: number | null
          api_token_permission_order: number | null
          id: number
        }
        Insert: {
          api_token_id?: number | null
          api_token_permission_id?: number | null
          api_token_permission_order?: number | null
          id?: number
        }
        Update: {
          api_token_id?: number | null
          api_token_permission_id?: number | null
          api_token_permission_order?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_token_permissions_token_links_fk"
            columns: ["api_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_token_permissions_token_links_inv_fk"
            columns: ["api_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_api_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_api_tokens: {
        Row: {
          access_key: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          lifespan: number | null
          name: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_api_tokens_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_api_tokens_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_core_store_settings: {
        Row: {
          environment: string | null
          id: number
          key: string | null
          tag: string | null
          type: string | null
          value: string | null
        }
        Insert: {
          environment?: string | null
          id?: number
          key?: string | null
          tag?: string | null
          type?: string | null
          value?: string | null
        }
        Update: {
          environment?: string | null
          id?: number
          key?: string | null
          tag?: string | null
          type?: string | null
          value?: string | null
        }
        Relationships: []
      }
      strapi_database_schema: {
        Row: {
          hash: string | null
          id: number
          schema: Json | null
          time: string | null
        }
        Insert: {
          hash?: string | null
          id?: number
          schema?: Json | null
          time?: string | null
        }
        Update: {
          hash?: string | null
          id?: number
          schema?: Json | null
          time?: string | null
        }
        Relationships: []
      }
      strapi_migrations: {
        Row: {
          id: number
          name: string | null
          time: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          time?: string | null
        }
        Relationships: []
      }
      strapi_release_actions: {
        Row: {
          content_type: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          is_entry_valid: boolean | null
          locale: string | null
          target_id: number | null
          target_type: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          is_entry_valid?: boolean | null
          locale?: string | null
          target_id?: number | null
          target_type?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          is_entry_valid?: boolean | null
          locale?: string | null
          target_id?: number | null
          target_type?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_release_actions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_release_actions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_release_actions_release_links: {
        Row: {
          id: number
          release_action_id: number | null
          release_action_order: number | null
          release_id: number | null
        }
        Insert: {
          id?: number
          release_action_id?: number | null
          release_action_order?: number | null
          release_id?: number | null
        }
        Update: {
          id?: number
          release_action_id?: number | null
          release_action_order?: number | null
          release_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_release_actions_release_links_fk"
            columns: ["release_action_id"]
            isOneToOne: false
            referencedRelation: "strapi_release_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_release_actions_release_links_inv_fk"
            columns: ["release_id"]
            isOneToOne: false
            referencedRelation: "strapi_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_releases: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          name: string | null
          released_at: string | null
          scheduled_at: string | null
          status: string | null
          timezone: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          released_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          released_at?: string | null
          scheduled_at?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_releases_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_releases_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_token_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_token_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_token_permissions_token_links: {
        Row: {
          id: number
          transfer_token_id: number | null
          transfer_token_permission_id: number | null
          transfer_token_permission_order: number | null
        }
        Insert: {
          id?: number
          transfer_token_id?: number | null
          transfer_token_permission_id?: number | null
          transfer_token_permission_order?: number | null
        }
        Update: {
          id?: number
          transfer_token_id?: number | null
          transfer_token_permission_id?: number | null
          transfer_token_permission_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_links_fk"
            columns: ["transfer_token_permission_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_token_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_token_permissions_token_links_inv_fk"
            columns: ["transfer_token_id"]
            isOneToOne: false
            referencedRelation: "strapi_transfer_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_transfer_tokens: {
        Row: {
          access_key: string | null
          created_at: string | null
          created_by_id: number | null
          description: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          lifespan: number | null
          name: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          access_key?: string | null
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          lifespan?: number | null
          name?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "strapi_transfer_tokens_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strapi_transfer_tokens_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      strapi_webhooks: {
        Row: {
          enabled: boolean | null
          events: Json | null
          headers: Json | null
          id: number
          name: string | null
          url: string | null
        }
        Insert: {
          enabled?: boolean | null
          events?: Json | null
          headers?: Json | null
          id?: number
          name?: string | null
          url?: string | null
        }
        Update: {
          enabled?: boolean | null
          events?: Json | null
          headers?: Json | null
          id?: number
          name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          transaction_amount: string | null
          transaction_id: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          transaction_amount?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          transaction_amount?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions_profile_links: {
        Row: {
          id: number
          profile_id: number | null
          transaction_id: number | null
          transaction_order: number | null
        }
        Insert: {
          id?: number
          profile_id?: number | null
          transaction_id?: number | null
          transaction_order?: number | null
        }
        Update: {
          id?: number
          profile_id?: number | null
          transaction_id?: number | null
          transaction_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_profile_links_fk"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_profile_links_inv_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      up_permissions: {
        Row: {
          action: string | null
          created_at: string | null
          created_by_id: number | null
          id: number
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_permissions_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_permissions_role_links: {
        Row: {
          id: number
          permission_id: number | null
          permission_order: number | null
          role_id: number | null
        }
        Insert: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Update: {
          id?: number
          permission_id?: number | null
          permission_order?: number | null
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_permissions_role_links_fk"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "up_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_permissions_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      up_roles: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          description: string | null
          id: number
          name: string | null
          type: string | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          description?: string | null
          id?: number
          name?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_roles_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_roles_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_users: {
        Row: {
          blocked: boolean | null
          confirmation_token: string | null
          confirmed: boolean | null
          created_at: string | null
          created_by_id: number | null
          email: string | null
          id: number
          password: string | null
          provider: string | null
          reset_password_token: string | null
          updated_at: string | null
          updated_by_id: number | null
          username: string | null
        }
        Insert: {
          blocked?: boolean | null
          confirmation_token?: string | null
          confirmed?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          id?: number
          password?: string | null
          provider?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Update: {
          blocked?: boolean | null
          confirmation_token?: string | null
          confirmed?: boolean | null
          created_at?: string | null
          created_by_id?: number | null
          email?: string | null
          id?: number
          password?: string | null
          provider?: string | null
          reset_password_token?: string | null
          updated_at?: string | null
          updated_by_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "up_users_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      up_users_role_links: {
        Row: {
          id: number
          role_id: number | null
          user_id: number | null
          user_order: number | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Update: {
          id?: number
          role_id?: number | null
          user_id?: number | null
          user_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "up_users_role_links_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "up_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "up_users_role_links_inv_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "up_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_folders: {
        Row: {
          created_at: string | null
          created_by_id: number | null
          id: number
          name: string | null
          path: string | null
          path_id: number | null
          updated_at: string | null
          updated_by_id: number | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          path?: string | null
          path_id?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: number | null
          id?: number
          name?: string | null
          path?: string | null
          path_id?: number | null
          updated_at?: string | null
          updated_by_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "upload_folders_created_by_id_fk"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_updated_by_id_fk"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_folders_parent_links: {
        Row: {
          folder_id: number | null
          folder_order: number | null
          id: number
          inv_folder_id: number | null
        }
        Insert: {
          folder_id?: number | null
          folder_order?: number | null
          id?: number
          inv_folder_id?: number | null
        }
        Update: {
          folder_id?: number | null
          folder_order?: number | null
          id?: number
          inv_folder_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "upload_folders_parent_links_fk"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upload_folders_parent_links_inv_fk"
            columns: ["inv_folder_id"]
            isOneToOne: false
            referencedRelation: "upload_folders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
