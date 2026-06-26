# React & Next.js Interview Preparation Guide

## React Core Concepts (2025)

### Hooks Best Practices

- **useState** : Local state, re-renders on change
- **useEffect** : Side effects, dependencies are crucial
- **useCallback** : Memoize functions to avoid unnecessary re-renders
- **useMemo** : Memoize expensive computations
- **useRef** : Direct DOM access, persists between renders
- **useContext** : Share state without prop drilling
- **useReducer** : Complex state with predictable logic

**Common pitfall** : Missing dependencies array = subtle bugs

```typescript
// ❌ Bad - refetch on every render
useEffect(() => {
  fetchData()
})

// ✅ Good - refetch only once on mount
useEffect(() => {
  fetchData()
}, [])

// ✅ Good - refetch if userId changes
useEffect(() => {
  fetchData(userId)
}, [userId])
```

### Render Optimization

- **React.memo** : Skip re-render if props unchanged
- **Key prop** : Identify elements in lists (never use index)
- **Code splitting** : React.lazy + Suspense

```typescript
const HeavyComponent = React.lazy(() => import('./Heavy'))

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### State Management

- **Prop drilling** : Passing state through many layers = bad
- **Context API** : Share state globally, easy but can cause unnecessary re-renders
- **Zustand/Jotai** : Lightweight global state, Redux alternative
- **React Query** : Server state management (API data)

**Common interview pattern** :

```typescript
// ❌ Avoid this:
<Component1 user={user}>
  <Component2 user={user}>
    <Component3 user={user} />
  </Component2>
</Component1>

// ✅ Use Context:
<UserContext.Provider value={user}>
  <Component1>
    <Component2>
      <Component3 /> {/* useContext(UserContext) */}
    </Component2>
  </Component1>
</UserContext.Provider>
```

---

## Next.js 15 (2025)

### App Router (Essential for interviews)

- **Layouts** : Reusable, persistent during navigation
- **Server Components** : Default, reduce client-side JS
- **Client Components** : `'use client'` for interactivity
- **Route Groups** : `(auth)`, `(dashboard)` to organize without affecting URL

**Recommended structure** :

```
app/
├── layout.tsx           // Root layout
├── page.tsx             // /
├── (auth)/
│   ├── layout.tsx       // Auth layout (login, signup)
│   ├── login/page.tsx   // /login
│   └── signup/page.tsx  // /signup
├── dashboard/
│   ├── layout.tsx       // Dashboard layout
│   ├── page.tsx         // /dashboard
│   └── [id]/page.tsx    // /dashboard/[id]
└── api/
    └── users/route.ts   // POST /api/users
```

### Server vs Client Components

| Aspect | Server Component | Client Component |
|--------|------------------|------------------|
| Fetch data | ✅ Directly | ❌ Via API route |
| Access secrets | ✅ Safe | ❌ Exposed to client |
| Interactivity | ❌ No | ✅ Hooks, events |
| Bundle size impact | ✅ None | ❌ JS sent to browser |

**Rule** : Server by default, Client when necessary

```typescript
// ✅ Server Component (fetches data)
async function UserList() {
  const users = await db.users.findMany()
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}

// ✅ Client Component (interactive)
'use client'
export function SearchUsers() {
  const [query, setQuery] = useState('')
  return <input onChange={e => setQuery(e.target.value)} />
}
```

### Performance (Common Questions)

**Image optimization** :
- Use `<Image />` from Next.js (lazy load, responsive)
- Avoid `<img />` (not optimized)

**Font optimization** :

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
// Automatically applied, zero layout shift
```

**Dynamic imports** :

```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./Heavy'), {
  loading: () => <div>Loading...</div>
})
```

### API Routes & Middleware

**API Route** (`app/api/users/route.ts`) :

```typescript
export async function GET(request: Request) {
  const users = await db.users.findMany()
  return Response.json(users)
}

export async function POST(request: Request) {
  const data = await request.json()
  const user = await db.users.create(data)
  return Response.json(user, { status: 201 })
}
```

**Middleware** (`middleware.ts`) :

```typescript
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth')?.value
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
```

---

## Common Interview Questions & Answers

### "What's the difference between useState and useReducer?"

**useState** : Simple, for basic state

```typescript
const [count, setCount] = useState(0)
```

**useReducer** : Complex, predictable logic, testable

```typescript
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'INCREMENT', payload: 5 })
```

Use **useReducer if** :
- State has multiple sub-values
- Complex logic with dependencies
- Sharing logic between components

---

### "How to optimize a list of 10k items?"

1. **Virtualization** : Only render visible items (react-window, react-virtualized)
2. **Pagination** : Load 50 items at a time
3. **Server-side filtering** : Don't load everything in JS
4. **React.memo** : Memoize each item
5. **Correct key prop** : NEVER use index

```typescript
import { FixedSizeList } from 'react-window'

export function LargeList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  )
}
```

---

### "Explain Server Components vs Client Components"

**Server Components** (default) :
- Run on server
- Access to database, secrets
- Zero client-side JS
- Ideal for : Fetching data, database queries, auth checks

**Client Components** :
- `'use client'` at top
- Run in browser
- Access to hooks, events, local state
- Ideal for : Interactions, forms, real-time updates

**Pattern** :

```typescript
// Server - Fetch + pass data to client
async function Dashboard() {
  const data = await fetchData()
  return <ClientDashboard initialData={data} />
}

// Client - Interactive
'use client'
export function ClientDashboard({ initialData }) {
  const [data, setData] = useState(initialData)
  return <div>{/* interact with data */}</div>
}
```

---

### "How to handle authentication?"

**With Next.js** :
1. Use `next-auth` or `Clerk` (simplifies everything)
2. Middleware to protect routes
3. Server Components to verify session

```typescript
import { auth } from '@/auth'

// In a Server Component
export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }
  
  return <div>Welcome {session.user.name}</div>
}
```

---

## Performance Tips

### Bundle Size

- `npm install -D bundlesize` or `esbuild-analyzer`
- Tree-shaking : Import specific functions, not everything
- Automatic code splitting by route in Next.js

### Lighthouse Score

- **Performance** : Optimized images, lazy load, code splitting
- **Accessibility** : Labels, alt text, contrast, keyboard navigation
- **Best Practices** : HTTPS, no console errors
- **SEO** : next/head, meta tags, structured data

### Real-World Patterns

**Error Boundary** (React 18+) :

```typescript
'use client'
import { useEffect } from 'react'

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

**Data Fetching Pattern** :

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}
```

---

## Quick Interview Checklist

- [ ] Understand Server vs Client Components
- [ ] Know when to use React.memo, useMemo, useCallback
- [ ] Explain prop drilling & Context API
- [ ] Virtualization for large lists
- [ ] next/image vs img
- [ ] API routes & middleware
- [ ] Middleware for auth
- [ ] Error boundaries
- [ ] ISR / SSG / SSR differences
- [ ] Prepare 2-3 examples of bugs you've fixed

---

## Resources

- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [Web.dev - Performance](https://web.dev/performance/)
- [Kent C. Dodds - React Testing](https://epicreact.dev)
