// Supabase Configuration
const SUPABASE_URL = "https://ammuxtjjyucqzinxznmn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbXV4dGpqeXVjcXppbnh6bm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NzQ4NjEsImV4cCI6MjA3NDI1MDg2MX0.V7hXmqarlAcUOLo48FCRKI2CxtN5WeezVIBTISJfeIw";

// App Configuration
const APP_CONFIG = {
  name: "BookStore Cart",
  version: "1.0.0",
  developer: "John Doe",
  description: "Modern store front with glassmorphism design",
  features: {
    taxRate: 0.1, // 10% tax
    currency: "IDR",
    currencySymbol: "Rp",
    enableNotifications: true,
    enableOfflineMode: true,
    autoSaveCart: true,
  },
};

// Initialize Supabase client with error handling
let supabase;
try {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false, // Since this is a public store, no user sessions needed
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });
} catch (error) {
  console.error("Failed to initialize Supabase client:", error);
  // App will work in offline mode
}

// Export for use in other scripts
window.supabaseClient = supabase;
window.appConfig = APP_CONFIG;

// Set dynamic content
document.addEventListener("DOMContentLoaded", () => {
  // Update developer name if element exists
  const developerNameElement = document.getElementById("developer-name");
  if (developerNameElement) {
    developerNameElement.textContent = APP_CONFIG.developer;
  }

  // Update page title
  document.title = `${APP_CONFIG.name} - Modern Store Front`;
});

// Utility function to check if Supabase is available
window.isSupabaseAvailable = () => {
  return supabase && typeof supabase.from === "function";
};

// Error handling for network issues
window.addEventListener("online", () => {
  console.log("🌐 Back online - Supabase connection restored");
  if (window.showSuccess) {
    window.showSuccess("Connection restored - all features available");
  }
});

window.addEventListener("offline", () => {
  console.log("📴 Offline - Using cached data");
  if (window.showError) {
    window.showError("You are offline - some features may be limited");
  }
});
