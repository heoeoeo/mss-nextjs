export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  audit_log: {
    Tables: {
      biz_notice_logs: {
        Row: {
          change_reason: string
          changed_at: string
          changed_by: string
          contents: string
          log_id: number
          notice_id: number
          status: Database["public"]["Enums"]["STATUS"]
        }
        Insert: {
          change_reason?: string
          changed_at?: string
          changed_by?: string
          contents: string
          log_id?: number
          notice_id: number
          status?: Database["public"]["Enums"]["STATUS"]
        }
        Update: {
          change_reason?: string
          changed_at?: string
          changed_by?: string
          contents?: string
          log_id?: number
          notice_id?: number
          status?: Database["public"]["Enums"]["STATUS"]
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
  public: {
    Tables: {
      biz_base_info: {
        Row: {
          b_nm: string
          b_no: string
          created_at: string
          id: string
          p_nm: string
          start_dt: string
        }
        Insert: {
          b_nm: string
          b_no: string
          created_at?: string
          id?: string
          p_nm: string
          start_dt: string
        }
        Update: {
          b_nm?: string
          b_no?: string
          created_at?: string
          id?: string
          p_nm?: string
          start_dt?: string
        }
        Relationships: []
      }
      biz_courses: {
        Row: {
          "\bcourse_name": string
          created_at: string
          id: number
          post_id: string
        }
        Insert: {
          "\bcourse_name": string
          created_at?: string
          id?: number
          post_id?: string
        }
        Update: {
          "\bcourse_name"?: string
          created_at?: string
          id?: number
          post_id?: string
        }
        Relationships: []
      }
      biz_parkings: {
        Row: {
          created_at: string
          id: number
          parking_title: string
        }
        Insert: {
          created_at?: string
          id?: number
          parking_title: string
        }
        Update: {
          created_at?: string
          id?: number
          parking_title?: string
        }
        Relationships: []
      }
      biz_post_notices: {
        Row: {
          contents: string | null
          created_at: string
          id: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          contents?: string | null
          created_at?: string
          id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          contents?: string | null
          created_at?: string
          id?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      biz_post_parkings: {
        Row: {
          created_at: string
          id: number
          parking_id: number
          post_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          parking_id: number
          post_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          parking_id?: number
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "biz_post_parkings_parking_id_fkey"
            columns: ["parking_id"]
            isOneToOne: false
            referencedRelation: "biz_parkings"
            referencedColumns: ["id"]
          },
        ]
      }
      biz_post_types: {
        Row: {
          created_at: string
          id: number
          post_id: string
          type_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          post_id?: string
          type_id: number
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: string
          type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "biz_post_types_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "biz_types"
            referencedColumns: ["id"]
          },
        ]
      }
      biz_posts: {
        Row: {
          created_at: string
          id: number
          is_open: boolean
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_open?: boolean
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_open?: boolean
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      biz_posts_off_days: {
        Row: {
          created_at: string
          id: number
          off_day: Database["public"]["Enums"]["\bclosed-days"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          off_day: Database["public"]["Enums"]["\bclosed-days"]
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          off_day?: Database["public"]["Enums"]["\bclosed-days"]
          user_id?: string
        }
        Relationships: []
      }
      biz_price_time: {
        Row: {
          course_id: number
          created_at: string
          id: number
          minutes: number
          origin_price: number
          sale_price: number | null
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          minutes: number
          origin_price: number
          sale_price?: number | null
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          minutes?: number
          origin_price?: number
          sale_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "biz_price_time_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "biz_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      biz_total_infos: {
        Row: {
          address: string
          approval: Database["public"]["Enums"]["accept_state"]
          bname: string
          created_at: string
          detail_address: string | null
          id: string
          near_station: string | null
          phone: string
          sido: string
          sigungu: string
        }
        Insert: {
          address: string
          approval?: Database["public"]["Enums"]["accept_state"]
          bname: string
          created_at?: string
          detail_address?: string | null
          id?: string
          near_station?: string | null
          phone: string
          sido: string
          sigungu: string
        }
        Update: {
          address?: string
          approval?: Database["public"]["Enums"]["accept_state"]
          bname?: string
          created_at?: string
          detail_address?: string | null
          id?: string
          near_station?: string | null
          phone?: string
          sido?: string
          sigungu?: string
        }
        Relationships: []
      }
      biz_types: {
        Row: {
          created_at: string
          id: number
          type_title: string
        }
        Insert: {
          created_at?: string
          id?: number
          type_title: string
        }
        Update: {
          created_at?: string
          id?: number
          type_title?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          created_at: string
          desc: string
          discount_per: number
          expiration_period: number
          id: number
          is_valid: boolean
          months: number
          title: string
        }
        Insert: {
          created_at?: string
          desc: string
          discount_per: number
          expiration_period: number
          id?: number
          is_valid?: boolean
          months: number
          title: string
        }
        Update: {
          created_at?: string
          desc?: string
          discount_per?: number
          expiration_period?: number
          id?: number
          is_valid?: boolean
          months?: number
          title?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          id: number
          months: number | null
          price: number | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          months?: number | null
          price?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          months?: number | null
          price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["member_role"]
        }
        Insert: {
          created_at?: string
          id: string
          role?: Database["public"]["Enums"]["member_role"]
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["member_role"]
        }
        Relationships: []
      }
      top_banners: {
        Row: {
          created_at: string | null
          id: number
          link_url: string | null
          text: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          link_url?: string | null
          text?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          link_url?: string | null
          text?: string | null
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
      accept_state: "승인" | "대기" | "반려"
      biz_type:
        | "1인샵"
        | "경락"
        | "로미로미"
        | "스웨디시"
        | "발 마사지"
        | "스포츠"
        | "아로마"
        | "에스테틱"
        | "중국"
        | "타이"
        | "한국"
        | "왁싱"
      "\bclosed-days":
        | "월요일"
        | "화요일"
        | "수요일"
        | "목요일"
        | "금요일"
        | "토요일"
        | "일요일"
        | "연중무휴"
        | "랜덤휴무"
      member_role: "member" | "biz" | "admin" | "biz_done"
      parking_lot_info:
        | "무료 주차"
        | "유료 주차"
        | "한시간 무료"
        | "두시간 무료"
        | "SUV 주차 가능"
        | "주차 불가"
      STATUS: "ACCEPT" | "WAIT" | "REJECT"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
