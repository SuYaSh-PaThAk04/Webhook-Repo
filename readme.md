# GitHub Webhook Tracker

A full-stack application that listens to GitHub Webhook events (Push, Pull Request, Merge) and displays real-time repository activity with a beautiful, animated UI.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://plant-ai-j6xn.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Flask-blue)](https://render.com)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)](https://vercel.com)

## 🌐 Live Demo

- **Frontend:** [https://plant-ai-j6xn.vercel.app/](https://plant-ai-j6xn.vercel.app/)
- **Backend:** Deployed on Render (configured via environment variables)
- **Repository:** [https://github.com/SuYaSh-PaThAk04/Action-Repo](https://github.com/SuYaSh-PaThAk04/Action-Repo)

---

## ✨ Features

### Webhook Events
- **Push Events** - Tracks commits pushed to any branch
- **Pull Request Events** - Monitors PR creation and updates
- **Merge Events** - Detects when PRs are successfully merged

### Real-Time Updates
- Auto-refreshes every 15 seconds
- Beautiful, animated UI with premium dark theme
- Deduplication to prevent showing duplicate events
- Color-coded event types for easy identification

### Security
- HMAC SHA-256 webhook signature verification
- Secure `X-Hub-Signature-256` validation
- Environment-based secret management

---

## 🎨 UI Features

The frontend provides an exceptional user experience with:

- **Premium Black Theme** - Sleek, modern dark interface
- **Smooth Animations** - Bouncy entrance effects, hover interactions, particle effects
- **Event Categories** - Color-coded badges (Push: Violet, PR: Cyan, Merge: Emerald)
- **Live Indicators** - Pulsing status indicators showing real-time sync
- **Glassmorphism Design** - Modern backdrop blur effects
- **Responsive Layout** - Works seamlessly on all devices

### Event Display Format

```
🚀 {author} pushed to "{branch}" on {timestamp}
🔄 {author} submitted a pull request from "{from_branch}" to "{to_branch}" on {timestamp}
✨ {author} merged branch "{from_branch}" to "{to_branch}" on {timestamp}
```

---

## 🗄️ MongoDB Schema

**Collection:** `events`

```json
{
  "event_type": "push",
  "author": "Travis",
  "from_branch": null,
  "to_branch": "staging",
  "timestamp": "2026-01-29T18:47:50Z",
  "message": "Travis pushed to \"staging\" on 29th January 2026 - 06:47 PM UTC"
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local or Atlas)
- **ngrok** (for local webhook testing)

### 1. Clone the Repository

```bash
git clone https://github.com/SuYaSh-PaThAk04/Action-Repo.git
cd webhook-repo
```

### 2. Backend Setup (Flask)

```bash
# Navigate to server directory
cd server

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
```

**Configure `.env` file:**

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=github_webhooks
GITHUB_WEBHOOK_SECRET=your_secret_here
```

**Start the Flask server:**

```bash
python app.py
```

Backend runs at: `http://localhost:5000`

### 3. Frontend Setup (Next.js)

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

**Configure `.env.local` file:**

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

**Start the development server:**

```bash
npm run dev
```

Frontend runs at: `http://localhost:3000`

### 4. Start MongoDB

**For local MongoDB:**

```bash
mongod
```

**Verify connection (optional):**

```bash
mongosh
```

---

## 🔗 GitHub Webhook Configuration

Since GitHub cannot directly call localhost, you'll need to use **ngrok** for local testing or deploy your backend.

### Using ngrok (Local Testing)

```bash
ngrok http 5000
```

Copy the forwarding URL (e.g., `https://xxxx.ngrok-free.app`)

### Configure Webhook in GitHub

1. Go to your repository: [Action-Repo](https://github.com/SuYaSh-PaThAk04/Action-Repo)
2. Navigate to **Settings** → **Webhooks** → **Add webhook**
3. Configure the following:

   | Field | Value |
   |-------|-------|
   | **Payload URL** | `https://<backend-url>/webhook` |
   | **Content type** | `application/json` |
   | **Secret** | Same as `GITHUB_WEBHOOK_SECRET` in `.env` |
   | **Events** | ✅ Pushes<br>✅ Pull requests |

4. Click **Add webhook**

GitHub will send a ping event to verify the connection.

---

## 🧪 Testing

### 1. Test Push Event

```bash
git checkout -b test-branch
echo "hello" > test.txt
git add .
git commit -m "test push"
git push origin test-branch
```

**Expected UI Output:**
```
🚀 {author} pushed to "test-branch" on {timestamp}
```

### 2. Test Pull Request Event

Create a PR from `test-branch` → `main`

**Expected UI Output:**
```
🔄 {author} submitted a pull request from "test-branch" to "main" on {timestamp}
```

### 3. Test Merge Event

Merge the PR through GitHub

**Expected UI Output:**
```
✨ {author} merged branch "test-branch" to "main" on {timestamp}
```

---

## 🛡️ Security

- **Webhook Signature Verification:** All incoming webhooks are validated using `X-Hub-Signature-256` with HMAC SHA-256
- **Environment Variables:** Sensitive data stored securely in `.env` files
- **Git Ignore:** `.env` and `.env.local` files are excluded from version control

---

## 📦 Tech Stack

### Backend
- **Flask** - Python web framework
- **MongoDB** - NoSQL database
- **PyMongo** - MongoDB driver for Python
- **python-dotenv** - Environment variable management

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

---

## 🚀 Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables in Render dashboard
4. Deploy

### Frontend (Vercel)
1. Import project to Vercel
2. Configure `NEXT_PUBLIC_BACKEND_URL` in environment variables
3. Deploy

---

## 📝 Notes

- The UI automatically deduplicates events to prevent showing the same event multiple times
- Events are polled every 15 seconds for real-time updates
- Only essential fields are stored and displayed for optimal performance
- The premium dark theme provides an exceptional user experience with smooth animations

---

## 👤 Author

**Suyash Pathak**

- GitHub: [@SuYaSh-PaThAk04](https://github.com/SuYaSh-PaThAk04)
- Repository: [Action-Repo](https://github.com/SuYaSh-PaThAk04/Action-Repo)

---

## 📄 License

This project is open source and available under the MIT License.

---

<div align="center">
  <p>Built with ❤️ by Suyash Pathak</p>
  <p>
    <a href="https://plant-ai-j6xn.vercel.app/">View Live Demo</a> •
    <a href="https://github.com/SuYaSh-PaThAk04/Action-Repo">View Repository</a>
  </p>
</div>