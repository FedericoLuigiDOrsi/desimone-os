import { createClient } from '@supabase/supabase-js'
const fs = require('fs')

const code = fs.readFileSync('config.js', 'utf8')
const urlMatch = code.match(/SUPABASE_URL\s*=\s*'([^']+)'/)
const keyMatch = code.match(/SUPABASE_ANON_KEY\s*=\s*'([^']+)'/)

if (urlMatch && keyMatch) {
  const supabase = createClient(urlMatch[1], keyMatch[1])
  
  async function test() {
    const { data, error } = await supabase.from('materials').select('*')
    console.log('Materials:', data, error)
  }
  
  test()
}
