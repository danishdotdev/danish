# Private Blog Studio setup

The Studio is ready at `/studio`. It is intentionally locked until Supabase is connected.

1. Create a Supabase project.
2. In **SQL Editor**, run [`supabase/schema.sql`](./supabase/schema.sql).
3. In **Authentication → URL Configuration**, set the site URL to `https://danish.sh` and add `https://danish.sh/auth/callback` as a redirect URL.
4. In Vercel → **Settings → Environment Variables**, add the four values shown in [`.env.example`](./.env.example) for Production, Preview, and Development.
5. Redeploy, visit `https://danish.sh/studio`, and sign in with `dk557876@gmail.com`.

The database rules only allow that email to create, update, or delete posts and upload cover images. Visitors can only read posts with the `published` status.
