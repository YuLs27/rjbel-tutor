# Clara Bennett — English Tutor site

Your original one-page site, split into separate files (HTML/CSS/JS, no
build step), with a booking form added to the "Ready to improve your
English?" section that saves submissions to Supabase.

Files:
- `index.html` — page content/structure
- `styles.css` — all styling (pulled out of the original `<style>` block)
- `script.js` — form handling + Supabase client
- `supabase.sql` — table + security policy to run in Supabase

---

## 1. Put it on GitHub

1. Create a new repo at https://github.com/new (e.g. `clara-tutor-site`).
   Don't initialize it with a README — you already have these files.
2. In a terminal, inside this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/clara-tutor-site.git
   git push -u origin main
   ```
3. Refresh the GitHub page — your files should be there.

No terminal/Git installed? Drag-and-drop all four files into the repo via
"Add file -> Upload files" on the GitHub website instead.

---

## 2. Publish it on Vercel

1. Go to https://vercel.com and sign in (GitHub login works).
2. **Add New -> Project** -> select `clara-tutor-site`.
3. Framework preset: **Other** (static HTML, no build command needed).
4. Click **Deploy**. You'll get a live URL like `clara-tutor-site.vercel.app`
   within about 30 seconds.
5. Every future push to `main` redeploys automatically.

---

## 3. Set up the database on Supabase

1. Go to https://supabase.com -> **New project**. Pick a name, password,
   and region, then wait ~2 minutes.
2. **SQL Editor -> New query**, paste in `supabase.sql`, click **Run**.
   This creates a `bookings` table and a policy allowing the public form
   to insert rows (but not read/edit existing ones).
3. **Project Settings -> API**, copy the **Project URL** and **anon
   public** key.
4. Open `script.js` and replace the placeholders near the top:
   ```js
   const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
   const SUPABASE_ANON_KEY = "eyJhbGciOi...";
   ```
5. Commit and push — Vercel redeploys with the database connected.
6. Test it: submit the form on your live site, then check **Table Editor
   -> bookings** in Supabase to confirm the row appeared.

### Notes
- The "Book your free trial" button in the hero and nav still link to
  `#contact`, which scrolls down to the new form.
- The book/testimonial/credential content is still the placeholder copy
  from the original page — swap in your real bio, testimonials, and
  credentials whenever you're ready.
