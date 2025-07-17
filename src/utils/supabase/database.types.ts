export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  chat: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          message_id: number
          sender_profile_id: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          message_id?: number
          sender_profile_id: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          message_id?: number
          sender_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'chat_messages_conversation_id_fkey'
            columns: ['conversation_id']
            referencedRelation: 'conversations'
            referencedColumns: ['conversation_id']
          },
        ]
      }
      conversations: {
        Row: {
          conversation_id: string
          last_message: string | null
          participant_ids: string[]
          updated_at: string | null
        }
        Insert: {
          conversation_id?: string
          last_message?: string | null
          participant_ids: string[]
          updated_at?: string | null
        }
        Update: {
          conversation_id?: string
          last_message?: string | null
          participant_ids?: string[]
          updated_at?: string | null
        }
        Relationships: []
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
  collection: {
    Tables: {
      collection_items: {
        Row: {
          collection_id: number
          created_at: string
          item_address: number
          item_type: Database['public']['Enums']['collection_item_type']
        }
        Insert: {
          collection_id: number
          created_at?: string
          item_address: number
          item_type?: Database['public']['Enums']['collection_item_type']
        }
        Update: {
          collection_id?: number
          created_at?: string
          item_address?: number
          item_type?: Database['public']['Enums']['collection_item_type']
        }
        Relationships: [
          {
            foreignKeyName: 'collection_items_collection_id_fkey'
            columns: ['collection_id']
            referencedRelation: 'collections'
            referencedColumns: ['collection_id']
          },
        ]
      }
      collections: {
        Row: {
          collection_id: number
          collection_name: string
          created_at: string
          description: string | null
          ended_at: string | null
          image_url: string
          is_competition: boolean
          owner: string
          view: number
          visibility: Database['collection']['Enums']['visibility']
        }
        Insert: {
          collection_id?: number
          collection_name: string
          created_at?: string
          description?: string | null
          ended_at?: string | null
          image_url: string
          is_competition?: boolean
          owner?: string
          view?: number
          visibility?: Database['collection']['Enums']['visibility']
        }
        Update: {
          collection_id?: number
          collection_name?: string
          created_at?: string
          description?: string | null
          ended_at?: string | null
          image_url?: string
          is_competition?: boolean
          owner?: string
          view?: number
          visibility?: Database['collection']['Enums']['visibility']
        }
        Relationships: []
      }
      competition: {
        Row: {
          collection_id: number
          is_official: boolean | null
          pax: number | null
          target: string
        }
        Insert: {
          collection_id?: number
          is_official?: boolean | null
          pax?: number | null
          target: string
        }
        Update: {
          collection_id?: number
          is_official?: boolean | null
          pax?: number | null
          target?: string
        }
        Relationships: [
          {
            foreignKeyName: 'competition_collection_id_fkey'
            columns: ['collection_id']
            referencedRelation: 'collections'
            referencedColumns: ['collection_id']
          },
        ]
      }
      competition_awards: {
        Row: {
          award_name: string
          collection_id: number
          competition_award_id: number
        }
        Insert: {
          award_name: string
          collection_id: number
          competition_award_id?: number
        }
        Update: {
          award_name?: string
          collection_id?: number
          competition_award_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'collection_award_collection_id_fkey'
            columns: ['collection_id']
            referencedRelation: 'collections'
            referencedColumns: ['collection_id']
          },
        ]
      }
      competition_jurors: {
        Row: {
          collection_id: number
          competition_juror_id: number
          juror_name: string | null
        }
        Insert: {
          collection_id: number
          competition_juror_id?: number
          juror_name?: string | null
        }
        Update: {
          collection_id?: number
          competition_juror_id?: number
          juror_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'competition_jurors_collection_id_fkey'
            columns: ['collection_id']
            referencedRelation: 'collections'
            referencedColumns: ['collection_id']
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
      visibility: 'public' | 'partially public' | 'private'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  community: {
    Tables: {
      community_posts: {
        Row: {
          context: string
          created_at: string
          edited_at: string
          post_id: number
          post_name: string | null
          profile_id: string
        }
        Insert: {
          context: string
          created_at?: string
          edited_at?: string
          post_id?: number
          post_name?: string | null
          profile_id?: string
        }
        Update: {
          context?: string
          created_at?: string
          edited_at?: string
          post_id?: number
          post_name?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'community_posts_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string | null
          isTeam: boolean
          link: string[] | null
          owner: string | null
          profile_id: string
          profile_name: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          isTeam: boolean
          link?: string[] | null
          owner?: string | null
          profile_id?: string
          profile_name: string
        }
        Update: {
          created_at?: string
          email?: string | null
          isTeam?: boolean
          link?: string[] | null
          owner?: string | null
          profile_id?: string
          profile_name?: string
        }
        Relationships: []
      }
      profile_permission: {
        Row: {
          profile_id: string
          student_id: string
        }
        Insert: {
          profile_id: string
          student_id?: string
        }
        Update: {
          profile_id?: string
          student_id?: string
        }
        Relationships: []
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
  enum: {
    Tables: {
      [_ in never]: never
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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgbouncer: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth: {
        Args: { p_usename: string }
        Returns: {
          username: string
          password: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  profile: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      v_profile_certificates: {
        Row: {
          certificate_id: number | null
          certificate_name: string | null
          is_software: boolean | null
          profile_id: string | null
        }
        Relationships: []
      }
      v_profile_competitions: {
        Row: {
          competition_duration: unknown | null
          competition_id: number | null
          competition_name: string | null
          prize: string | null
          profile_id: string | null
        }
        Relationships: []
      }
      v_profile_skills: {
        Row: {
          language: boolean | null
          profile_id: string | null
          skill_id: number | null
          skill_name: string | null
        }
        Relationships: []
      }
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
  project: {
    Tables: {
      [_ in never]: never
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
  public: {
    Tables: {
      after_courses: {
        Row: {
          after_course_id: number
          after_course_name: string
          created_at: string
        }
        Insert: {
          after_course_id?: number
          after_course_name: string
          created_at?: string
        }
        Update: {
          after_course_id?: number
          after_course_name?: string
          created_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_id: number
          certificate_name: string
          is_software: boolean
        }
        Insert: {
          certificate_id?: number
          certificate_name: string
          is_software: boolean
        }
        Update: {
          certificate_id?: number
          certificate_name?: string
          is_software?: boolean
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          message_id: number
          sender_profile_id: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          message_id?: number
          sender_profile_id: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          message_id?: number
          sender_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'chat_messages_conversation_id_fkey'
            columns: ['conversation_id']
            referencedRelation: 'conversations'
            referencedColumns: ['conversation_id']
          },
        ]
      }
      companies: {
        Row: {
          company_address: string | null
          company_id: number
          company_name: string
          hr_manager_name: string | null
          hr_manager_phone: string | null
        }
        Insert: {
          company_address?: string | null
          company_id?: number
          company_name: string
          hr_manager_name?: string | null
          hr_manager_phone?: string | null
        }
        Update: {
          company_address?: string | null
          company_id?: number
          company_name?: string
          hr_manager_name?: string | null
          hr_manager_phone?: string | null
        }
        Relationships: []
      }
      competitions: {
        Row: {
          competition_duration: unknown | null
          competition_id: number
          competition_name: string
        }
        Insert: {
          competition_duration?: unknown | null
          competition_id?: number
          competition_name: string
        }
        Update: {
          competition_duration?: unknown | null
          competition_id?: number
          competition_name?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          conversation_id: string
          last_message: string | null
          participant_ids: string[]
          unread_user_ids: string[]
          updated_at: string | null
        }
        Insert: {
          conversation_id?: string
          last_message?: string | null
          participant_ids: string[]
          unread_user_ids?: string[]
          updated_at?: string | null
        }
        Update: {
          conversation_id?: string
          last_message?: string | null
          participant_ids?: string[]
          unread_user_ids?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          course_id: number
          course_name: string
          grade: number
        }
        Insert: {
          course_id?: number
          course_name: string
          grade: number
        }
        Update: {
          course_id?: number
          course_name?: string
          grade?: number
        }
        Relationships: []
      }
      departments: {
        Row: {
          department_id: number
          department_name: string
        }
        Insert: {
          department_id?: number
          department_name: string
        }
        Update: {
          department_id?: number
          department_name?: string
        }
        Relationships: []
      }
      dream_jobs: {
        Row: {
          company_id: number
          dream_job_id: number
          grade: number
          job_id: number
          student_id: string
        }
        Insert: {
          company_id: number
          dream_job_id: number
          grade: number
          job_id: number
          student_id?: string
        }
        Update: {
          company_id?: number
          dream_job_id?: number
          grade?: number
          job_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dream_job_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
          {
            foreignKeyName: 'dream_jobs_company_id_fkey'
            columns: ['company_id']
            referencedRelation: 'companies'
            referencedColumns: ['company_id']
          },
          {
            foreignKeyName: 'dream_jobs_job_id_fkey'
            columns: ['job_id']
            referencedRelation: 'jobs'
            referencedColumns: ['job_id']
          },
        ]
      }
      employment_companies: {
        Row: {
          company_id: number
          created_at: string
          deleted_at: string | null
          employment_id: number
          end_date: string | null
          job_id: number
          salary: number | null
          start_date: string
          student_id: string
        }
        Insert: {
          company_id: number
          created_at?: string
          deleted_at?: string | null
          employment_id?: number
          end_date?: string | null
          job_id: number
          salary?: number | null
          start_date: string
          student_id?: string
        }
        Update: {
          company_id?: number
          created_at?: string
          deleted_at?: string | null
          employment_id?: number
          end_date?: string | null
          job_id?: number
          salary?: number | null
          start_date?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'employment_companies_company_id_fkey1'
            columns: ['company_id']
            referencedRelation: 'companies'
            referencedColumns: ['company_id']
          },
          {
            foreignKeyName: 'employment_companies_job_id_fkey1'
            columns: ['job_id']
            referencedRelation: 'jobs'
            referencedColumns: ['job_id']
          },
          {
            foreignKeyName: 'employment_companies_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      field_training: {
        Row: {
          company_id: number
          created_at: string
          deleted_at: string | null
          end_date: string | null
          job_id: number
          lead_or_part: boolean | null
          start_date: string
          student_id: string
        }
        Insert: {
          company_id: number
          created_at?: string
          deleted_at?: string | null
          end_date?: string | null
          job_id: number
          lead_or_part?: boolean | null
          start_date: string
          student_id?: string
        }
        Update: {
          company_id?: number
          created_at?: string
          deleted_at?: string | null
          end_date?: string | null
          job_id?: number
          lead_or_part?: boolean | null
          start_date?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'field_training_company_id_fkey1'
            columns: ['company_id']
            referencedRelation: 'companies'
            referencedColumns: ['company_id']
          },
          {
            foreignKeyName: 'field_training_job_id_fkey1'
            columns: ['job_id']
            referencedRelation: 'jobs'
            referencedColumns: ['job_id']
          },
          {
            foreignKeyName: 'field_training_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      job_positions: {
        Row: {
          position_id: number
          position_name: string
        }
        Insert: {
          position_id?: number
          position_name: string
        }
        Update: {
          position_id?: number
          position_name?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          job_id: number
          job_name: string
        }
        Insert: {
          job_id?: number
          job_name: string
        }
        Update: {
          job_id?: number
          job_name?: string
        }
        Relationships: []
      }
      markdown_pictures: {
        Row: {
          image_id: number
          '\bimage_url': string
          mark_id: number
        }
        Insert: {
          image_id?: number
          '\bimage_url': string
          mark_id: number
        }
        Update: {
          image_id?: number
          '\bimage_url'?: string
          mark_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'markdown_picture_mark_id_fkey'
            columns: ['mark_id']
            referencedRelation: 'project_markdown'
            referencedColumns: ['mark_id']
          },
        ]
      }
      middle_schools: {
        Row: {
          middle_school_id: number
          middle_school_name: string
        }
        Insert: {
          middle_school_id?: number
          middle_school_name: string
        }
        Update: {
          middle_school_id?: number
          middle_school_name?: string
        }
        Relationships: []
      }
      military_service_statuses: {
        Row: {
          military_service_status_id: number
          military_service_status_name: string
        }
        Insert: {
          military_service_status_id?: number
          military_service_status_name: string
        }
        Update: {
          military_service_status_id?: number
          military_service_status_name?: string
        }
        Relationships: []
      }
      military_services: {
        Row: {
          end_date: string
          military_service_status_id: number
          start_date: string
          student_id: string
        }
        Insert: {
          end_date: string
          military_service_status_id: number
          start_date: string
          student_id?: string
        }
        Update: {
          end_date?: string
          military_service_status_id?: number
          start_date?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'military_services_military_service_status_id_fkey'
            columns: ['military_service_status_id']
            referencedRelation: 'military_service_statuses'
            referencedColumns: ['military_service_status_id']
          },
          {
            foreignKeyName: 'military_services_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string | null
          isTeam: boolean
          link: string[] | null
          owner: string | null
          profile_id: string
          profile_name: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          isTeam: boolean
          link?: string[] | null
          owner?: string | null
          profile_id?: string
          profile_name: string
        }
        Update: {
          created_at?: string
          email?: string | null
          isTeam?: boolean
          link?: string[] | null
          owner?: string | null
          profile_id?: string
          profile_name?: string
        }
        Relationships: []
      }
      profile_competitions: {
        Row: {
          competition_id: number
          prize: string
          profile_id: string | null
        }
        Insert: {
          competition_id?: number
          prize: string
          profile_id?: string | null
        }
        Update: {
          competition_id?: number
          prize?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profile_competitions_competition_id_fkey'
            columns: ['competition_id']
            referencedRelation: 'competitions'
            referencedColumns: ['competition_id']
          },
          {
            foreignKeyName: 'profile_competitions_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      profile_introduce: {
        Row: {
          introduce: string
          profile_id: string
        }
        Insert: {
          introduce: string
          profile_id?: string
        }
        Update: {
          introduce?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_introduce_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      profile_link: {
        Row: {
          alt: string | null
          link: string
          profile_id: string
        }
        Insert: {
          alt?: string | null
          link: string
          profile_id?: string
        }
        Update: {
          alt?: string | null
          link?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_link_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      profile_permission: {
        Row: {
          profile_id: string
          student_id: string
        }
        Insert: {
          profile_id: string
          student_id?: string
        }
        Update: {
          profile_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_permission_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['profile_id']
          },
          {
            foreignKeyName: 'profile_permission_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      profile_skills: {
        Row: {
          profile_id: string
          skill_id: number
        }
        Insert: {
          profile_id?: string
          skill_id?: number
        }
        Update: {
          profile_id?: string
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'fk_profile_skills_skill_id'
            columns: ['skill_id']
            referencedRelation: 'skills'
            referencedColumns: ['skill_id']
          },
          {
            foreignKeyName: 'profile_skills_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['profile_id']
          },
          {
            foreignKeyName: 'profile_skills_skill_id_fkey'
            columns: ['skill_id']
            referencedRelation: 'skills'
            referencedColumns: ['skill_id']
          },
        ]
      }
      project_category: {
        Row: {
          category_id: number
          category_name: string
        }
        Insert: {
          category_id?: number
          category_name: string
        }
        Update: {
          category_id?: number
          category_name?: string
        }
        Relationships: []
      }
      project_contributors: {
        Row: {
          description: string
          project_id: number
          student_id: string
        }
        Insert: {
          description: string
          project_id?: number
          student_id?: string
        }
        Update: {
          description?: string
          project_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'project_contributor_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['project_id']
          },
        ]
      }
      project_likes: {
        Row: {
          profile_id: string
          project_id: number
        }
        Insert: {
          profile_id?: string
          project_id: number
        }
        Update: {
          profile_id?: string
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'project_likes_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['project_id']
          },
        ]
      }
      project_markdown: {
        Row: {
          mark_desc: string | null
          mark_id: number
          project_id: number
        }
        Insert: {
          mark_desc?: string | null
          mark_id?: number
          project_id: number
        }
        Update: {
          mark_desc?: string | null
          mark_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'project_markdown_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['project_id']
          },
        ]
      }
      project_permissions: {
        Row: {
          authority: boolean | null
          profile_id: string
          project_id: number
        }
        Insert: {
          authority?: boolean | null
          profile_id?: string
          project_id?: number
        }
        Update: {
          authority?: boolean | null
          profile_id?: string
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'project_permissions_profile_id_fkey1'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['profile_id']
          },
          {
            foreignKeyName: 'project_permissions_project_id_fkey'
            columns: ['project_id']
            referencedRelation: 'projects'
            referencedColumns: ['project_id']
          },
        ]
      }
      projects: {
        Row: {
          category_id: number
          created_at: string
          description: string
          project_id: number
          project_name: string
          status: number
        }
        Insert: {
          category_id: number
          created_at?: string
          description: string
          project_id?: number
          project_name: string
          status: number
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string
          project_id?: number
          project_name?: string
          status?: number
        }
        Relationships: [
          {
            foreignKeyName: 'projects_category_id_fkey'
            columns: ['category_id']
            referencedRelation: 'project_category'
            referencedColumns: ['category_id']
          },
        ]
      }
      skills: {
        Row: {
          language: boolean | null
          skill_id: number
          skill_name: string
        }
        Insert: {
          language?: boolean | null
          skill_id?: number
          skill_name: string
        }
        Update: {
          language?: boolean | null
          skill_id?: number
          skill_name?: string
        }
        Relationships: []
      }
      student: {
        Row: {
          birthday: string | null
          department_id: number
          email: string | null
          gender: boolean | null
          graduate_at: string | null
          join_at: string
          name: string
          phone: string | null
          profile: string | null
          student_id: string
          student_number: number | null
        }
        Insert: {
          birthday?: string | null
          department_id: number
          email?: string | null
          gender?: boolean | null
          graduate_at?: string | null
          join_at: string
          name?: string
          phone?: string | null
          profile?: string | null
          student_id?: string
          student_number?: number | null
        }
        Update: {
          birthday?: string | null
          department_id?: number
          email?: string | null
          gender?: boolean | null
          graduate_at?: string | null
          join_at?: string
          name?: string
          phone?: string | null
          profile?: string | null
          student_id?: string
          student_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'student_department_id_fkey'
            columns: ['department_id']
            referencedRelation: 'departments'
            referencedColumns: ['department_id']
          },
        ]
      }
      student_after_courses: {
        Row: {
          after_course_id: number
          grade: number
          student_id: string
        }
        Insert: {
          after_course_id: number
          grade: number
          student_id: string
        }
        Update: {
          after_course_id?: number
          grade?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_after_courses_after_course_id_fkey'
            columns: ['after_course_id']
            referencedRelation: 'after_courses'
            referencedColumns: ['after_course_id']
          },
          {
            foreignKeyName: 'student_after_courses_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      student_certificates: {
        Row: {
          certificate_id: number
          student_id: string
        }
        Insert: {
          certificate_id: number
          student_id?: string
        }
        Update: {
          certificate_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_certificates_certificate_id_fkey1'
            columns: ['certificate_id']
            referencedRelation: 'certificates'
            referencedColumns: ['certificate_id']
          },
          {
            foreignKeyName: 'student_certificates_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      student_competitions: {
        Row: {
          competition_id: number
          prize: string | null
          student_id: string
        }
        Insert: {
          competition_id?: number
          prize?: string | null
          student_id: string
        }
        Update: {
          competition_id?: number
          prize?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_competitions_competition_id_fkey1'
            columns: ['competition_id']
            referencedRelation: 'competitions'
            referencedColumns: ['competition_id']
          },
          {
            foreignKeyName: 'student_competitions_student_id_fkey2'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      student_courses: {
        Row: {
          course_id: number
          student_id: string
        }
        Insert: {
          course_id: number
          student_id: string
        }
        Update: {
          course_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_courses_course_id_fkey'
            columns: ['course_id']
            referencedRelation: 'courses'
            referencedColumns: ['course_id']
          },
          {
            foreignKeyName: 'student_courses_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      student_jobs: {
        Row: {
          job_id: number
          student_id: string
        }
        Insert: {
          job_id: number
          student_id: string
        }
        Update: {
          job_id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_jobs_job_id_fkey1'
            columns: ['job_id']
            referencedRelation: 'jobs'
            referencedColumns: ['job_id']
          },
          {
            foreignKeyName: 'student_jobs_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      student_middle_schools: {
        Row: {
          '1st_score': number | null
          '2nd_score': number | null
          middle_school_id: number
          middle_school_score: number | null
          student_id: string
        }
        Insert: {
          '1st_score'?: number | null
          '2nd_score'?: number | null
          middle_school_id: number
          middle_school_score?: number | null
          student_id?: string
        }
        Update: {
          '1st_score'?: number | null
          '2nd_score'?: number | null
          middle_school_id?: number
          middle_school_score?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'student_middle_schools_middle_school_id_fkey'
            columns: ['middle_school_id']
            referencedRelation: 'middle_schools'
            referencedColumns: ['middle_school_id']
          },
          {
            foreignKeyName: 'student_middle_schools_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
        ]
      }
      student_universities: {
        Row: {
          created_at: string
          student_id: string
          university_id: number
        }
        Insert: {
          created_at?: string
          student_id: string
          university_id?: number
        }
        Update: {
          created_at?: string
          student_id?: string
          university_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'student_universities_student_id_fkey'
            columns: ['student_id']
            referencedRelation: 'student'
            referencedColumns: ['student_id']
          },
          {
            foreignKeyName: 'student_universities_university_id_fkey1'
            columns: ['university_id']
            referencedRelation: 'universities'
            referencedColumns: ['university_id']
          },
        ]
      }
      universities: {
        Row: {
          university_department: string
          university_id: number
          university_name: string
        }
        Insert: {
          university_department: string
          university_id?: number
          university_name: string
        }
        Update: {
          university_department?: string
          university_id?: number
          university_name?: string
        }
        Relationships: []
      }
      web_admin_permission: {
        Row: {
          auth_id: string
          created_at: string
        }
        Insert: {
          auth_id: string
          created_at?: string
        }
        Update: {
          auth_id?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_claim: {
        Args: { uid: string; claim: string }
        Returns: string
      }
      get_claim: {
        Args: { uid: string; claim: string }
        Returns: Json
      }
      get_claims: {
        Args: { uid: string }
        Returns: Json
      }
      get_my_claim: {
        Args: { claim: string }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: { uid: string; claim: string; value: Json }
        Returns: string
      }
      stu_to_pro: {
        Args: { student_id_input: string }
        Returns: string
      }
    }
    Enums: {
      collection_item_type: 'collection' | 'project'
      visibility: 'public' | 'partially_public' | 'private'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'prefixes_bucketId_fkey'
            columns: ['bucket_id']
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey'
            columns: ['bucket_id']
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey'
            columns: ['bucket_id']
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey'
            columns: ['upload_id']
            referencedRelation: 's3_multipart_uploads'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: { _bucket_id: string; _name: string }
        Returns: undefined
      }
      can_insert_object: {
        Args: { bucketid: string; name: string; owner: string; metadata: Json }
        Returns: undefined
      }
      delete_prefix: {
        Args: { _bucket_id: string; _name: string }
        Returns: boolean
      }
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_level: {
        Args: { name: string }
        Returns: number
      }
      get_prefix: {
        Args: { name: string }
        Returns: string
      }
      get_prefixes: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_legacy_v1: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v1_optimised: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v2: {
        Args: {
          prefix: string
          bucket_name: string
          limits?: number
          levels?: number
          start_after?: string
        }
        Returns: {
          key: string
          name: string
          id: string
          updated_at: string
          created_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  student: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      get_dashboard_student_table_data: {
        Row: {
          company_name: string | null
          department_name: string | null
          email: string | null
          gender: boolean | null
          graduate_at: string | null
          job_name: string | null
          name: string | null
          phone: string | null
          student_id: string | null
        }
        Relationships: []
      }
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
  view: {
    Tables: {
      [_ in never]: never
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

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  chat: {
    Enums: {},
  },
  collection: {
    Enums: {
      visibility: ['public', 'partially public', 'private'],
    },
  },
  community: {
    Enums: {},
  },
  enum: {
    Enums: {},
  },
  graphql_public: {
    Enums: {},
  },
  pgbouncer: {
    Enums: {},
  },
  profile: {
    Enums: {},
  },
  project: {
    Enums: {},
  },
  public: {
    Enums: {
      collection_item_type: ['collection', 'project'],
      visibility: ['public', 'partially_public', 'private'],
    },
  },
  storage: {
    Enums: {},
  },
  student: {
    Enums: {},
  },
  view: {
    Enums: {},
  },
} as const
