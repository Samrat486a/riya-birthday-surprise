# ✨ Riya's Birthday Surprise | Premium Friendship Celebration

A production-ready, cinematic, mobile-first birthday surprise web experience handcrafted for **Riya**, celebrating genuine friendship, shared laughter, loyalty, and unforgettable memories.

Built with **HTML5, TypeScript, React, Tailwind CSS, Anime.js, and Three.js**.

---

## 🌟 Cinematic Chapters & Features

1. **Elegant Preloader**: Animated monogram with progress counter and image preloading.
2. **Secret PIN Lock Screen**:
   - Prominent, unblurred photo of Riya with a split glassmorphism layout.
   - Interactive 4-digit PIN keypad with animated indicators, tactile audio feedback, wrong PIN shake animation (`anime.js`), and unlock celebration.
   - Default PIN: `2026` (easily changeable in `src/config/siteConfig.ts`).
3. **Cinematic Birthday Introduction**:
   - Emotional sequence: *"Today isn't just another day… Because someone truly extraordinary was born."*
   - Gold gradient typography reveal for Riya with a *"Begin the Story"* transition.
4. **Hero Section**:
   - Sharp, unblurred portrait of Riya with depth lighting.
   - Live birthday countdown (Days / Hours / Minutes / Seconds) that automatically switches to *"It's finally your day!"* on her birthday.
5. **Chapter 01: The Friendship Chronicles (Timeline)**:
   - Scroll-driven story timeline highlighting key milestones (first meeting, 3 AM deep talks, spontaneous road trips, unwavering support).
   - Alternating desktop layout and mobile vertical timeline.
6. **Chapter 02: Interactive Photo Gallery**:
   - Editorial masonry grid with category filter pills (*All, Memories, Laughter, Candid, Adventures*).
   - Fullscreen Lightbox modal with next/prev navigation and keyboard controls (Escape, Left/Right arrows).
7. **Interactive Floating Polaroids**:
   - Realistic paper cards with subtle rotations and handwritten captions.
   - Click or tap to shuffle through the snapshot stack.
8. **Chapter 03: Six Things I Value About You**:
   - Respectful, heartwarming cards celebrating her genuine qualities: Unfiltered Realness, Infectious Laughter, Fierce Loyalty, How She Shows Up, Ambitious Drive, and Unconditional Support.
9. **Interactive Friendship Trivia Quiz**:
   - Fun banter questions (*"What is our default reaction when something awkward happens?"*, *"What guarantees a bad day cure?"*).
   - Instant feedback, explanations, and score celebration.
10. **Chapter 04: Interactive 3D Birthday Cake (Three.js WebGL)**:
    - Multi-tiered cake with frosting details, gold trim, and glowing candles with flickering flame lights.
    - Tap or click *"Blow Out the Candles"* to extinguish the flames with gentle air whoosh audio, smoke sparkles, and a confetti blast.
    - Automatic 2D animated fallback for low-power devices.
11. **Interactive Scratch Card Surprise**:
    - HTML5 Canvas interactive scratch-off card that works with finger touch or mouse.
    - Reveals a *"Lifetime Friendship Pass"* with voucher code.
12. **Interactive Surprise Gift Box**:
    - Animated gift box that opens upon tap to reveal an official friendship appreciation voucher with confetti.
13. **Special Wax-Sealed Birthday Letter**:
    - Clickable sealed envelope that slides open to reveal a heartfelt, personal letter to Riya, paired with an unblurred companion photo.
14. **Custom Audio & Voice Memo Player**:
    - Synthesized soothing ambient harmony (via Web Audio API, zero broken external files) or custom audio file support.
    - Voice note card with simulated animated waveform and duration counter.
15. **Mosaic Memory Collage**:
    - Clean photo wall of memories with hover highlights.
16. **Secret Easter Egg**:
    - Click the subtle golden star in the corner 5 times to unlock a secret friendship achievement.
17. **Grand Finale & Replay**:
    - Deep midnight starfield, heartfelt concluding message, and one-click replay.

---

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

### Step 1: Open Terminal in Project Directory
Navigate to the project folder:
```bash
cd /Users/samratchakraborty/Desktop/riya-birthday-surprise
```

### Step 2: Install Dependencies (if not already installed)
```bash
npm install
```

### Step 3: Start the Local Development Server
```bash
npm run dev
```

### Step 4: Open in Your Browser
The terminal will display a local URL:
```text
  VITE v6.4.5  ready in 180 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```
Open **`http://localhost:3000`** in your browser (Chrome, Safari, Firefox, Edge, or on your mobile device on the same Wi-Fi using the Network address).

### Step 5: Test Production Build
To create a production-optimized build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📸 How to Add Riya's Real Photos

All photos, texts, and settings are centralized in **one single file**:
📁 **`src/config/siteConfig.ts`**

### Recommended steps:
1. Place Riya's photos into the `public/photos/` folder:
   - `public/photos/hero.jpg`
   - `public/photos/lock.jpg`
   - `public/photos/letter.jpg`
   - `public/photos/finale.jpg`
   - `public/photos/mem-1.jpg`, `mem-2.jpg`, etc.
2. Open `src/config/siteConfig.ts` and update the paths:
   ```ts
   photos: {
     lockScreen: '/photos/lock.jpg',
     hero: '/photos/hero.jpg',
     letter: '/photos/letter.jpg',
     finale: '/photos/finale.jpg',
     timeline: [
       { id: '1', photo: '/photos/mem-1.jpg', title: '...', caption: '...' },
       ...
     ],
     gallery: [
       { id: 'g-1', url: '/photos/gallery-1.jpg', title: '...', ... }
     ]
   }
   ```
*(Note: If you haven't added photos yet, high-resolution aesthetic placeholder portraits are already configured so the site is instantly viewable without broken image links!)*

---

## 🔒 Changing the Secret PIN

In `src/config/siteConfig.ts`:
```ts
secretPin: "2026", // Change to Riya's birth year, favorite number, or any 4 digits!
```

---

## ✍️ Customizing the Friendship Messages

In `src/config/siteConfig.ts`, you can personalize:
- `senderName`: Your name/nickname.
- `birthdayDate`: Her birth date in `"YYYY-MM-DD"` format for the countdown.
- `birthdayLetter`: The paragraphs of the letter.
- `appreciations`: The 6 traits you value in her.
- `quiz`: Questions and answers for the friendship quiz.
- `scratchCard`: Voucher text and code.

---

## 🌐 Deploying to Vercel (Free 1-Click Deployment)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**!
*(Privacy note: The site already has `<meta name="robots" content="noindex,nofollow">` so search engines will not index it).*
