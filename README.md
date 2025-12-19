# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/your-actual-project-id

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/your-actual-project-id) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository.
git clone https://github.com/your-username/usman-portfolio-42.git

# Step 2: Navigate to the project directory.
cd usman-portfolio-42

# Step 3: Set up your environment variables.
# Create a new file named .env in the root of your project.
# Add the necessary Supabase variables. You can find these in your Supabase project settings.
# VITE_SUPABASE_URL=https://your-project-ref.supabase.co
# VITE_SUPABASE_ANON_KEY=your-public-anon-key

# Step 4: Install the necessary dependencies.
npm i

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Database Schema

This project uses Supabase as its backend database with the following tables:

1. **Contacts** - Stores contact form submissions
2. **Projects** - Stores portfolio projects with title, description, images, and links
3. **Testimonials** - Stores client testimonials with ratings and featured status

### Supabase Functions

- `submit-contact` - Handles contact form submissions
- `chat` - Manages chat interactions
- `manage-projects` - CRUD operations for portfolio projects (authenticated)

The database migrations are stored in `supabase/migrations/` and can be applied using Supabase CLI.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/your-actual-project-id) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

cd "d:\usman vibe coding\usman-portfolio-42"; npm run dev