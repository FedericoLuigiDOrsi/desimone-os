# Supabase Manual Setup Notes

## Storage Bucket
1. Dashboard → Storage → New bucket
   - Name: `photos`
   - Public: ✅ (required for n8n and FAL.ai to access photos)
2. Run `006_storage_policies.sql` in SQL Editor

## Auth — Test User
1. Dashboard → Authentication → Users → Add user
   - Email: `admin@desimone-os.test`
   - Password: `Admin2026!`
2. In SQL Editor:
   ```sql
   UPDATE auth.users
   SET raw_user_meta_data = '{"role": "admin"}'
   WHERE email = 'admin@desimone-os.test';
   ```

## Database Webhook (after Edge Function deploy)
1. Dashboard → Database → Webhooks → Create webhook
   - Name: `on_article_insert`
   - Table: `articles`
   - Events: ✅ INSERT
   - Type: Supabase Edge Functions
   - Function: `trigger-ai-pipeline`

## SQL Execution Order
1. 001_schema.sql
2. 002_functions.sql
3. 003_triggers.sql
4. 004_rls.sql
5. 005_seed.sql
6. 006_storage_policies.sql
