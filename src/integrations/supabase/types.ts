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
      analytics_events: {
        Row: {
          created_at: string
          event_name: string
          id: string
          local: string | null
          metadata: Json
          path: string | null
          referrer: string | null
          session_id: string | null
          source: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string
          event_name: string
          id?: string
          local?: string | null
          metadata?: Json
          path?: string | null
          referrer?: string | null
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string
          event_name?: string
          id?: string
          local?: string | null
          metadata?: Json
          path?: string | null
          referrer?: string | null
          session_id?: string | null
          source?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          kind: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          kind?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          kind?: string
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          client_id: string
          created_at: string
          direccion: string | null
          dni: string | null
          id: string
          state: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          direccion?: string | null
          dni?: string | null
          id?: string
          state?: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          direccion?: string | null
          dni?: string | null
          id?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          campania: string
          celular: string
          created_at: string
          distrito: string
          estado: string
          id: string
          local: string | null
          nombre: string
          origen: string
          plan_interes: Database["public"]["Enums"]["plan_interes"]
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          campania?: string
          celular: string
          created_at?: string
          distrito: string
          estado?: string
          id?: string
          local?: string | null
          nombre: string
          origen?: string
          plan_interes?: Database["public"]["Enums"]["plan_interes"]
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          campania?: string
          celular?: string
          created_at?: string
          distrito?: string
          estado?: string
          id?: string
          local?: string | null
          nombre?: string
          origen?: string
          plan_interes?: Database["public"]["Enums"]["plan_interes"]
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      analytics_conversion_summary: {
        Row: {
          day: string | null
          event_name: string | null
          source: string | null
          total_events: number | null
          unique_sessions: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      chat_add_message: {
        Args: {
          p_client_id: string
          p_content: string
          p_kind?: string
          p_role: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          kind: string
          role: string
          session_id: string
        }
        SetofOptions: {
          from: "*"
          to: "chat_messages"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      chat_get_messages: {
        Args: { p_client_id: string }
        Returns: {
          content: string
          created_at: string
          id: string
          kind: string
          role: string
          session_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "chat_messages"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      chat_get_or_create_session: {
        Args: { p_client_id: string }
        Returns: {
          client_id: string
          created_at: string
          direccion: string | null
          dni: string | null
          id: string
          state: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "chat_sessions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      chat_update_session: {
        Args: {
          p_client_id: string
          p_direccion?: string
          p_dni?: string
          p_state: string
        }
        Returns: {
          client_id: string
          created_at: string
          direccion: string | null
          dni: string | null
          id: string
          state: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "chat_sessions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      plan_interes:
        | "entrada"
        | "intensivo"
        | "completo"
        | "no_seguro"
        | "plan_200"
        | "plan_400"
        | "plan_2play_200"
        | "plan_2play_400"
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
      plan_interes: [
        "entrada",
        "intensivo",
        "completo",
        "no_seguro",
        "plan_200",
        "plan_400",
        "plan_2play_200",
        "plan_2play_400",
      ],
    },
  },
} as const
