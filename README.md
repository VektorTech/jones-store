# Jones (Jordan Ones) Shoe Store

Jones is an e-commerce store for Nike Jordan Ones. It is a responsive, mobile-first website featuring an admin dashboard for viewing website analytics and managing the backend.

## Tech Used

* Next.JS - SSR & SSG & REST API
* Iron Session - Session Management
* BCrypt - Password Hashing & Comparison
* Yup - Schema & Form Validation
* Sass - Custom Styling
* Material UI - Form Components
* React Icons - SVG Icon Library
* Friendly Username Generator - Random usernames for new users
* Typescript - Type Safety
* Prisma - ORM for PostgresSQL
* ESLint - Code Linting
* Prettier - Code Formatting
* Figma - Page Designs
* Adobe Photoshop - Image Editing
* Postman - Testing API routes (Auth, products)
* Chrome & Firefox Dev Tools

## About

Because this is an e-commerce website, SEO plays a significant factor in it's success, but the standard client-side rendered React would seriously hinder search engines from properly crawling each page. So I chose Next.JS for this project as it provides a quick and simple way for writing server-side rendered react applications without much overhead.

React Context API was a sufficient option for managing state in this application, as there wasn't much information that needed to be kept in memory on the client that would demand a complex library like Redux. Pages are regularly refreshed and data is already being rendered onto pages from server(`getServerSideProps` & `getStaticProps`), which further reduced the need for alternate state management strategies. User preferences are persisted through cookie to allow for pre-rendering on the server.

# Issues Encountered

* I had issues with programmatically setting first focusable element as the active element in the document when authoring the code that tab traps a dom container element. Had to place wrap the code in a `setTimeout`, which I still don't understand.

* Need a solution for elegantly hiding the pinned header when user scrolls down.

* No way to add custom constraints onto table columns inside prisma, so I had to resort to hand written SQL Commands.

* The Sass team is deprecating the `@import()` statement in favor of `@use()`, which forced me to import (with `@use()`) all variables, functions, placeholders and mixins into all sass files that depends on them.

* Took me some time getting used to `next/image`, especially resizing.

* I initially intended on writing all styles and components from scratch but later tapped out and resorted to Material UI due to time constraints.

## What I've Learned

* Further developed my intuition for writing custom hooks.
* Dynamic routing strategies through Next JS
* `:focus-visible` selector for keyboard only focus, and `:focus-within` for elements with actively focused descendant.
* Better approaches to BEM naming and component design.
* Canonical tag to signal main version of (near) duplicate pages to search engines.

## Setup

1. Create a `.env` file in the root directory and set the following keys:
	```python
	# Database string for PostgreSQL
	DATABASE_URL="postgres://{user}:{password}@{hostname}:{port}/{database_name}"

	# 32+ character long string for session cookie encryption [https://1password.com/password-generator/]
	SECRET_COOKIE_PASSWORD="complex_password_at_least_32_characters_long"
	```

2. Run `npm install` to install all dependencies for the project.

3. Then run `npx prisma db push`. This will use the schema (from `./prisma/schema.prisma`) to add the relevant tables to your `jones_db`, database. You can use `npx prisma generate` to manually sync `@prisma/client` with the database after updating the table schemas.

5. (Optional) Run code inside `./prisma/constraints.sql` on database.

4. `npm run dev` to start development server.

## Credits & Attributions

* Banner background image by [Jos Hoppenbrouwers](https://www.joshoppenbrouwers.com/) - Image was then manipulated using Photoshop.

* Website design Inspired By [8theme XStore](https://xstore.8theme.com/elementor/demos/sneakers/).

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
