// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Auth helpers
export async function requireAuth() {
  // AUTH BYPASS — riabilitare in produzione
  return true
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  await supabase.auth.signOut()
  window.location.href = '/login.html'
}

// Query helpers
export async function getCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select('id, name, slug, channel, sort_order')
    .is('deleted_at', null)
    .order('sort_order')
  if (error) throw error
  return data
}

export async function getMaterials(type = null) {
  let query = supabase.from('materials').select('id, name, code, type').eq('active', true)
  if (type) query = query.eq('type', type)
  const { data, error } = await query.order('name')
  if (error) throw error
  return data
}

export async function getArticles(collectionId = null) {
  let query = supabase
    .from('articles')
    .select(`
      id, name, sku, product_type, status, channel,
      price_retail, price_wholesale, stock_retail, stock_wholesale,
      collection_id, coral_material_id, metal_material_id, created_at,
      collections(name, slug),
      coral:materials!coral_material_id(name, code),
      metal:materials!metal_material_id(name, code),
      photos(id, public_url, is_cover, photo_type, sort_order),
      measurements
    `)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (collectionId) query = query.eq('collection_id', collectionId)

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function insertArticle(fields) {
  const { data, error } = await supabase
    .from('articles')
    .insert(fields)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function uploadPhoto(file, articleId) {
  const ext = file.name.split('.').pop()
  const path = `raw/${articleId}/${crypto.randomUUID()}.${ext}`
  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(path, file, { contentType: file.type })
  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(path)

  const { data, error } = await supabase
    .from('photos')
    .insert({
      article_id: articleId,
      storage_path: path,
      public_url: publicUrl,
      photo_type: 'raw',
      processing_status: 'pending'
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export function subscribeToArticleStatus(onUpdate) {
  return supabase
    .channel('articles-status')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'articles'
    }, (payload) => onUpdate(payload.new))
    .subscribe()
}
