This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## How to Verify the 25-Minute Cache

### Test Steps:

1. **First Request** (Month 1)
   - Console: `🔄 Fetching events for month 1 at...`
   - Takes ~500-1000ms
   - Status: 🔄 Fresh

2. **Switch to Month 2**
   - Console: `🔄 Fetching events for month 2 at...`
   - Takes ~500-1000ms
   - Status: 🔄 Fresh

3. **Switch Back to Month 1** (within 25 minutes)
   - Response in < 100ms
   - Status: ⚡ Cached
   - **Same `cachedAt` timestamp from step 1**

4. **Check Network Tab**
   - Cached requests show smaller size
   - May show "disk cache" or "memory cache"

5. **Server Logs**
   - Fresh fetch: You'll see `🔄 Fetching events for month X`
   - Cached: No new log entry (request served from Next.js cache)

### Browser Network Tab Verification:
```
Fresh:   /api/arena/events?month=1  |  500ms  |  5.2 KB
Cached:  /api/arena/events?month=1  |  12ms   |  (disk cache)
