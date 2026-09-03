import { supabase } from '../lib/supabaseClient'

// 사전에 등록된 이름인지 확인 (대소문자/공백 무시하고 매칭)
export async function findTravelerByName(rawName) {
  const name = rawName.trim()
  if (!name) return null

  const { data, error } = await supabase
    .from('travelers')
    .select('*')
    .ilike('name', name)
    .maybeSingle()

  if (error) throw error
  return data
}
