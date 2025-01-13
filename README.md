# NEXT-RBAC

A Role-Based Access Control (RBAC) implementation using Next.js 14, demonstrating secure authentication and authorization patterns.

## Features

- 🔐 Role-based authentication system
- 👥 Multiple user roles (Admin, Advisor, Investor, Guest)
- 🛡️ Protected routes based on user permissions
- 🎨 Clean UI with Tailwind CSS and Shadcn/ui
- 🔄 Server-side session management
- 📱 Responsive sidebar navigation

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- JWT for session management
- JSON Server (mock backend)

## Getting Started

1. Install dependencies:
```
pnpm install
```

2. Start the development server:
```
pnpm dev
```

3. Start the mock API server:
```
pnpm server
```

## Default Users

| Role     | Email             | Password           |
|----------|-------------------|-------------------|
| Admin    | admin@demo.com    | kP9#mN2$vL8@jH4xQ5 |
| Advisor  | advisor@demo.com  | rT7$wY9#pM5&nB3cX6 |
| Investor | investor@demo.com | hK4$fG8#dL2@sA9mE5 |
| Guest    | guest@demo.com    | bN6#zX4$qW7@vR2yU9 |

## License

MIT