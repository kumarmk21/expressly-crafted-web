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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_users: {
        Row: {
          auth_user_id: string
          created_at: string
          full_name: string
          id: string
          official_id: string | null
          role: Database["public"]["Enums"]["app_role_vms"]
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          full_name?: string
          id?: string
          official_id?: string | null
          role?: Database["public"]["Enums"]["app_role_vms"]
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          full_name?: string
          id?: string
          official_id?: string | null
          role?: Database["public"]["Enums"]["app_role_vms"]
        }
        Relationships: [
          {
            foreignKeyName: "app_users_official_id_fkey"
            columns: ["official_id"]
            isOneToOne: false
            referencedRelation: "company_officials"
            referencedColumns: ["id"]
          },
        ]
      }
      application_answers: {
        Row: {
          answer_text: string
          application_id: string
          created_at: string
          id: string
          question_id: string
          updated_at: string
        }
        Insert: {
          answer_text?: string
          application_id: string
          created_at?: string
          id?: string
          question_id: string
          updated_at?: string
        }
        Update: {
          answer_text?: string
          application_id?: string
          created_at?: string
          id?: string
          question_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_answers_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          created_at: string
          current_level: number
          emp_id: string
          id: string
          is_draft: boolean
          opportunity_type: string
          status: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_level?: number
          emp_id: string
          id?: string
          is_draft?: boolean
          opportunity_type: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_level?: number
          emp_id?: string
          id?: string
          is_draft?: boolean
          opportunity_type?: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_emp_id_fkey"
            columns: ["emp_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_comments: {
        Row: {
          application_id: string
          approver_id: string
          comment: string
          created_at: string
          id: string
          workflow_id: string | null
        }
        Insert: {
          application_id: string
          approver_id: string
          comment: string
          created_at?: string
          id?: string
          workflow_id?: string | null
        }
        Update: {
          application_id?: string
          approver_id?: string
          comment?: string
          created_at?: string
          id?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approval_comments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_comments_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_comments_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "approval_workflow"
            referencedColumns: ["id"]
          },
        ]
      }
      approval_workflow: {
        Row: {
          actioned_at: string | null
          application_id: string
          approver_id: string | null
          created_at: string
          delegated_to: string | null
          id: string
          level: number
          sla_deadline: string | null
          status: string
        }
        Insert: {
          actioned_at?: string | null
          application_id: string
          approver_id?: string | null
          created_at?: string
          delegated_to?: string | null
          id?: string
          level: number
          sla_deadline?: string | null
          status?: string
        }
        Update: {
          actioned_at?: string | null
          application_id?: string
          approver_id?: string | null
          created_at?: string
          delegated_to?: string | null
          id?: string
          level?: number
          sla_deadline?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_workflow_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_workflow_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_workflow_delegated_to_fkey"
            columns: ["delegated_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          visitor_key: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          visitor_key: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          visitor_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_name: string
          body: string
          cover_image_url: string | null
          created_at: string
          id: string
          is_published: boolean
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          body?: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          body?: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          active: boolean
          created_at: string
          display_order: number
          id: string
          issuer: string | null
          kind: string
          logo_url: string | null
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          display_order?: number
          id?: string
          issuer?: string | null
          kind?: string
          logo_url?: string | null
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          display_order?: number
          id?: string
          issuer?: string | null
          kind?: string
          logo_url?: string | null
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string
          display_order: number
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          partner_since: string | null
          services: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          partner_since?: string | null
          services?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          partner_since?: string | null
          services?: string | null
        }
        Relationships: []
      }
      company_officials: {
        Row: {
          contact_number: string
          created_at: string
          department: string
          designation: string
          email: string
          full_name: string
          id: string
          is_available: boolean
          updated_at: string
        }
        Insert: {
          contact_number?: string
          created_at?: string
          department?: string
          designation?: string
          email?: string
          full_name: string
          id?: string
          is_available?: boolean
          updated_at?: string
        }
        Update: {
          contact_number?: string
          created_at?: string
          department?: string
          designation?: string
          email?: string
          full_name?: string
          id?: string
          is_available?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          business_type: string | null
          company_name: string | null
          consented_at: string | null
          created_at: string
          email: string
          first_name: string | null
          form_type: string
          id: string
          last_name: string | null
          location: string | null
          message: string | null
          owns_vehicle: boolean | null
          phone: string
          privacy_consent: boolean
          service_interested: string | null
          status: string
          worked_as_franchisee: boolean | null
        }
        Insert: {
          business_type?: string | null
          company_name?: string | null
          consented_at?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          form_type: string
          id?: string
          last_name?: string | null
          location?: string | null
          message?: string | null
          owns_vehicle?: boolean | null
          phone: string
          privacy_consent?: boolean
          service_interested?: string | null
          status?: string
          worked_as_franchisee?: boolean | null
        }
        Update: {
          business_type?: string | null
          company_name?: string | null
          consented_at?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          form_type?: string
          id?: string
          last_name?: string | null
          location?: string | null
          message?: string | null
          owns_vehicle?: boolean | null
          phone?: string
          privacy_consent?: boolean
          service_interested?: string | null
          status?: string
          worked_as_franchisee?: boolean | null
        }
        Relationships: []
      }
      courier_receipts: {
        Row: {
          created_at: string
          description: string
          id: string
          num_packages: number
          package_weight: string
          recipient_official_id: string
          sender_address: string
          sender_name: string
          tracking_number: string
          visit_record_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          num_packages?: number
          package_weight?: string
          recipient_official_id: string
          sender_address?: string
          sender_name?: string
          tracking_number?: string
          visit_record_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          num_packages?: number
          package_weight?: string
          recipient_official_id?: string
          sender_address?: string
          sender_name?: string
          tracking_number?: string
          visit_record_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "courier_receipts_recipient_official_id_fkey"
            columns: ["recipient_official_id"]
            isOneToOne: false
            referencedRelation: "company_officials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courier_receipts_visit_record_id_fkey"
            columns: ["visit_record_id"]
            isOneToOne: false
            referencedRelation: "visit_records"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          application_id: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          uploaded_at: string
        }
        Insert: {
          application_id: string
          file_name: string
          file_path: string
          file_size?: number
          file_type?: string
          id?: string
          uploaded_at?: string
        }
        Update: {
          application_id?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      emp_portal_modules: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          display_order: number
          group_name: string
          icon: string | null
          id: string
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          group_name?: string
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          group_name?: string
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      events_news: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          display_order: number
          employee_designation: string | null
          employee_name: string | null
          event_date: string | null
          id: string
          image_url: string | null
          link_url: string | null
          month_year: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          employee_designation?: string | null
          employee_name?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          month_year?: string | null
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          employee_designation?: string | null
          employee_name?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          link_url?: string | null
          month_year?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          created_at: string
          email: string
          experience: string | null
          id: string
          job_opening_id: string | null
          message: string | null
          name: string
          phone: string
          resume_file_name: string
          resume_file_size: number
          resume_url: string
          role: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          experience?: string | null
          id?: string
          job_opening_id?: string | null
          message?: string | null
          name: string
          phone: string
          resume_file_name: string
          resume_file_size: number
          resume_url: string
          role: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          job_opening_id?: string | null
          message?: string | null
          name?: string
          phone?: string
          resume_file_name?: string
          resume_file_size?: number
          resume_url?: string
          role?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_opening_id_fkey"
            columns: ["job_opening_id"]
            isOneToOne: false
            referencedRelation: "job_openings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_openings: {
        Row: {
          created_at: string
          department: string
          description: string
          display_order: number
          experience: string
          id: string
          is_active: boolean
          job_type: string
          location: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string
          description?: string
          display_order?: number
          experience?: string
          id?: string
          is_active?: boolean
          job_type?: string
          location?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          display_order?: number
          experience?: string
          id?: string
          is_active?: boolean
          job_type?: string
          location?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leadership_members: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
          photo_url: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
          photo_url?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          photo_url?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string | null
          city: string | null
          contact_number: string | null
          created_at: string
          display_order: number
          email: string | null
          hierarchy: string
          id: string
          is_active: boolean
          location_code: string
          location_name: string
          pincode: string | null
          state: string | null
          updated_at: string
          zone: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string
          display_order?: number
          email?: string | null
          hierarchy?: string
          id?: string
          is_active?: boolean
          location_code: string
          location_name: string
          pincode?: string | null
          state?: string | null
          updated_at?: string
          zone?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          contact_number?: string | null
          created_at?: string
          display_order?: number
          email?: string | null
          hierarchy?: string
          id?: string
          is_active?: boolean
          location_code?: string
          location_name?: string
          pincode?: string | null
          state?: string | null
          updated_at?: string
          zone?: string
        }
        Relationships: []
      }
      network_stats: {
        Row: {
          category: string
          created_at: string
          display_order: number
          icon: string | null
          id: string
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          label?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          error_message: string | null
          id: string
          message_body: string
          notification_type: Database["public"]["Enums"]["notification_type_vms"]
          official_id: string
          sent_at: string
          status: Database["public"]["Enums"]["notification_status_vms"]
          visit_record_id: string | null
        }
        Insert: {
          error_message?: string | null
          id?: string
          message_body?: string
          notification_type: Database["public"]["Enums"]["notification_type_vms"]
          official_id: string
          sent_at?: string
          status?: Database["public"]["Enums"]["notification_status_vms"]
          visit_record_id?: string | null
        }
        Update: {
          error_message?: string | null
          id?: string
          message_body?: string
          notification_type?: Database["public"]["Enums"]["notification_type_vms"]
          official_id?: string
          sent_at?: string
          status?: Database["public"]["Enums"]["notification_status_vms"]
          visit_record_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_official_id_fkey"
            columns: ["official_id"]
            isOneToOne: false
            referencedRelation: "company_officials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_visit_record_id_fkey"
            columns: ["visit_record_id"]
            isOneToOne: false
            referencedRelation: "visit_records"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      page_blocks: {
        Row: {
          block_type: string
          content: Json
          created_at: string
          display_order: number
          id: string
          page_id: string
          updated_at: string
        }
        Insert: {
          block_type: string
          content?: Json
          created_at?: string
          display_order?: number
          id?: string
          page_id: string
          updated_at?: string
        }
        Update: {
          block_type?: string
          content?: Json
          created_at?: string
          display_order?: number
          id?: string
          page_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_blocks_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string
          id: string
          is_published: boolean
          meta_description: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          max_chars: number
          min_chars: number
          path: string
          question_text: string
          question_type: string
          section: string
          tooltip_text: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          max_chars?: number
          min_chars?: number
          path?: string
          question_text: string
          question_type?: string
          section: string
          tooltip_text?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          max_chars?: number
          min_chars?: number
          path?: string
          question_text?: string
          question_type?: string
          section?: string
          tooltip_text?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          company: string | null
          consented_at: string | null
          created_at: string
          destination: string | null
          email: string | null
          id: string
          message: string | null
          name: string
          origin: string | null
          phone: string
          privacy_consent: boolean
          service: string
        }
        Insert: {
          company?: string | null
          consented_at?: string | null
          created_at?: string
          destination?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name: string
          origin?: string | null
          phone: string
          privacy_consent?: boolean
          service: string
        }
        Update: {
          company?: string | null
          consented_at?: string | null
          created_at?: string
          destination?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          origin?: string | null
          phone?: string
          privacy_consent?: boolean
          service?: string
        }
        Relationships: []
      }
      shipments: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_name: string | null
          destination: string
          estimated_delivery: string | null
          id: string
          origin: string
          status: string
          tracking_number: string
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          destination: string
          estimated_delivery?: string | null
          id?: string
          origin: string
          status?: string
          tracking_number: string
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          destination?: string
          estimated_delivery?: string | null
          id?: string
          origin?: string
          status?: string
          tracking_number?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      technology_items: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon: string | null
          id: string
          image_url: string | null
          no: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          no: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          no?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          created_at: string
          description: string
          email: string
          id: string
          name: string
          phone: string | null
          status: string
          subject: string
          ticket_number: string
        }
        Insert: {
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          ticket_number?: string
        }
        Update: {
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          ticket_number?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          date_of_joining: string
          department: string
          department_head_id: string | null
          designation: string
          email: string
          emp_id: string
          first_login: boolean
          full_name: string
          grade: string
          id: string
          is_active: boolean
          manager_id: string | null
          password_hash: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_joining?: string
          department?: string
          department_head_id?: string | null
          designation?: string
          email: string
          emp_id: string
          first_login?: boolean
          full_name: string
          grade?: string
          id: string
          is_active?: boolean
          manager_id?: string | null
          password_hash?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_joining?: string
          department?: string
          department_head_id?: string | null
          designation?: string
          email?: string
          emp_id?: string
          first_login?: boolean
          full_name?: string
          grade?: string
          id?: string
          is_active?: boolean
          manager_id?: string | null
          password_hash?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_department_head_id_fkey"
            columns: ["department_head_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      visit_records: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          check_in_at: string
          check_out_at: string | null
          created_at: string
          id: string
          official_id: string | null
          purpose: string
          receptionist_notes: string | null
          status: Database["public"]["Enums"]["visit_status"]
          visitor_id: string
          visitor_type: Database["public"]["Enums"]["visitor_type"]
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          check_in_at?: string
          check_out_at?: string | null
          created_at?: string
          id?: string
          official_id?: string | null
          purpose?: string
          receptionist_notes?: string | null
          status?: Database["public"]["Enums"]["visit_status"]
          visitor_id: string
          visitor_type: Database["public"]["Enums"]["visitor_type"]
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          check_in_at?: string
          check_out_at?: string | null
          created_at?: string
          id?: string
          official_id?: string | null
          purpose?: string
          receptionist_notes?: string | null
          status?: Database["public"]["Enums"]["visit_status"]
          visitor_id?: string
          visitor_type?: Database["public"]["Enums"]["visitor_type"]
        }
        Relationships: [
          {
            foreignKeyName: "visit_records_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "company_officials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visit_records_official_id_fkey"
            columns: ["official_id"]
            isOneToOne: false
            referencedRelation: "company_officials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visit_records_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "visitors"
            referencedColumns: ["id"]
          },
        ]
      }
      visitors: {
        Row: {
          created_at: string
          full_name: string
          id: string
          mobile_number: string
          photo_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          mobile_number: string
          photo_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          mobile_number?: string
          photo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_role: { Args: never; Returns: string }
      get_vms_official_id: { Args: never; Returns: string }
      get_vms_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role_vms"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      track_shipment: {
        Args: { p_tracking_number: string }
        Returns: {
          created_at: string
          destination: string
          estimated_delivery: string
          origin: string
          status: string
          tracking_number: string
        }[]
      }
      unlike_blog_post: {
        Args: { p_like_id: string; p_visitor_key: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      app_role_vms: "receptionist" | "official" | "admin"
      notification_status_vms: "sent" | "failed" | "pending"
      notification_type_vms: "sms" | "push"
      visit_status:
        | "checked_in"
        | "pending_approval"
        | "checked_out"
        | "cancelled"
      visitor_type: "courier" | "delivery" | "visitor"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
      app_role_vms: ["receptionist", "official", "admin"],
      notification_status_vms: ["sent", "failed", "pending"],
      notification_type_vms: ["sms", "push"],
      visit_status: [
        "checked_in",
        "pending_approval",
        "checked_out",
        "cancelled",
      ],
      visitor_type: ["courier", "delivery", "visitor"],
    },
  },
} as const
