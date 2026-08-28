import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // 빌드/배포 시 환경변수 누락을 바로 알아챌 수 있도록 경고
  console.warn(
    '[supabaseClient] VITE_SUPABASE_URL 또는 VITE_SUPABASE_ANON_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
