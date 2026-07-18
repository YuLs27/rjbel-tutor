// ---- Supabase config ----
// Replace these with your own project's values (Project Settings -> API).
// The anon/public key is safe to expose in client-side code — it only has
// the permissions you grant it via Row Level Security policies.
const SUPABASE_URL = "https://ebaclraptnatnnwiygkz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UIr96-iglWyuzcbLsnn4Mg_1vk10ZG-";

const isConfigured =
  SUPABASE_URL !== "https://ebaclraptnatnnwiygkz.supabase.co" &&
  SUPABASE_ANON_KEY !== "sb_publishable_UIr96-iglWyuzcbLsnn4Mg_1vk10ZG-";

let supabase = null;
if (isConfigured && window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const form = document.getElementById("booking-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const goal = document.getElementById("goal").value.trim();

  if (!name || !email) {
    statusEl.textContent = "Please fill in your name and email.";
    return;
  }

  submitBtn.disabled = true;
  statusEl.textContent = "Sending...";

  if (!supabase) {
    // Supabase isn't wired up yet — this keeps the form usable locally
    // before you've created a project. See README.md for setup steps.
    console.log("Booking (not sent — Supabase not configured):", { name, email, goal });
    statusEl.textContent = "Form works, but isn't connected to a database yet.";
    submitBtn.disabled = false;
    return;
  }

  const { error } = await supabase.from("bookings").insert([
    { name, email, goal }
  ]);

  submitBtn.disabled = false;

  if (error) {
    console.error(error);
    statusEl.textContent = "Something went wrong. Please try again.";
    return;
  }

  statusEl.textContent = "Thanks! I'll email you shortly to schedule your trial.";
  form.reset();
});
