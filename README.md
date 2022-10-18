# Jones (Jordan Ones) Shoe Store

Jones is an online store for Nike Jordan Ones &mdash; a seamless e-commerce marketplace. It is a responsive, mobile-first website featuring multiple currency, pop-up search option (Ajax live search), Ajax add to cart and add to wishlist, newsletter form, announcement banner for live updates, customer reviews, product slideshow on hover and is SEO friendly.

## Tech Used

- **Next.JS** &mdash; React Framework - SSR, SSG & REST API
- **Typescript** &mdash; Static Typing, Type Inference & Type Guarding
- **Iron Session** &mdash; Session Management
- **BCrypt** &mdash; Password Hashing & Comparison
- **Yup** &mdash; Schema & Form Validation
- **PostgreSQL** &mdash; Relational Database Management System
- **Prisma** &mdash; ORM for PostgreSQL
- **Sass** &mdash; Custom Styling
- **React Icons** &mdash; SVG Icon Library
- **nProgress** &mdash; Progress Bar For Navigation Indication
- **Friendly Username Generator** &mdash; Generates random usernames for new users
- **ESLint** &mdash; Code Linting
- **Prettier** &mdash; Enforce Consistent Code Format
- **Figma** &mdash; Page Designs
- **Adobe Photoshop** &mdash; Design & Image Editing
- **TinyPng** &mdash; Image Optimization
- **Postman** &mdash; Testing API routes (Auth, Products)
- **Chrome & Firefox Dev Tools**

## Design Decisions

- Because this is an e-commerce website, SEO plays a significant factor in it's success, but the standard client-side rendered React would seriously hinder search engines from properly crawling each page. So I chose Next.JS for this project as it provides a quick and simple way for writing server-side rendered react applications without much overhead.

- React's `useState` & `useReducer` hooks coupled with the Context API provided a sufficient means for managing and centralizing state in this application as there wasn't much information that needed to be kept in memory on the client that would demand a complex library like Redux. Pages are regularly refreshed and data is already being rendered onto pages from server(`getServerSideProps` & `getStaticProps`), which further reduced the need for alternate state management strategies. User preferences are persisted through cookie to allow for pre-rendering on the server.

- For managing the user state, I switched from using multiple `useState` to a single `useReducer` as it's a more convenient option for working with state objects that have multiple sub-values, like the wishlist and cart array on the user object.

- Used Postgres trigger functions for updating cart total whenever a cart item is added or removed.

- After recognizing a repeating pattern in how API routes were being written and wanting to improve the process, I decided to build a method routing class, `RouteHandler`, to arrange request handlers in a similar fashion to `express` routers. It allows all handlers to be composed with a custom error catcher and session middleware and also allows authentication and role-based access control. This reduced boilerplate code inside API routes and made writing async code much cleaner.

- The website UI diverted from the original Figma design in a few areas.

## Issues Encountered

- I had issues with programmatically setting first focusable element as the active element in the document when authoring the code that tab traps a dom container element. Had to wrap the code in a `setTimeout`, which I still don't quite understand.

- No way to add custom constraints onto table columns inside prisma, so I had to resort to hand written SQL Commands.

- The Sass team is deprecating the `@import()` statement in favor of `@use()`, which forced me to import (with `@use()`) all variables, functions, placeholders and mixins into all sass files that depends on them.

- Learning to work with `next/image` was a bit difficult, especially when trying to resize images.

- While implementing the slideshow feature of the product component, I ran into a problem where state wasn't updating as intended. After some point, I realized that the callback being passed to `setInterval` was using an outdated value of state held inside its closure &mdash; the value assigned during the first render. I later discovered a different way of updating state by passing a callback to `setState` instead of a value. The callback accepts the current value of state to calculate and return a new state. [Further details by Dan Abramov...](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

- Made some changes to UI in areas that were not accounted for during design, also for layout and stylistic improvements.

## What I've Learned

- Further developed my intuition for writing custom hooks.
- Dynamic routing strategies through Next JS
- `:focus-visible` selector for keyboard tabbing focus, and `:focus-within` for elements with actively focused descendant.
- Better approaches to BEM naming and component design.
- Canonical tag to signal main version of (near) duplicate pages to search engines.
- Native internationalization(`Intl`) class that has a method for formatting currency
- It's probably best not to program the database using triggers or procedure because they tend to become invisible (may forget or not be aware of them during development), it's probably best to perform calculations on the server instead.
- Alternative way to update state `setState(state => ...)`

## Setup

1. Create a `touch .env` file in the root directory and set the following keys:
	```python
	# Database string for PostgreSQL
	DATABASE_URL="postgres://{user}:{password}@{hostname}:{port}/{database_name}"

	# 32+ character long string for session cookie encryption [https://1password.com/password-generator/]
	SECRET_COOKIE_PASSWORD="complex_password_at_least_32_characters_long"
	```

2. You may edit the following variables inside the `./src/lib/config.ts` file:
	```js
	// name for session cookie
	export const sessionOptions: IronSessionOptions = {
		cookieName: "<site_name>/user",
		// ...
	}

	// name of domain
	export const DOMAIN_NAME = "";

	// https://cloudinary.com upload preset & cloud name
	export const CLOUDINARY_UPLOAD_PRESET = "";
	export const CLOUDINARY_CLOUD_NAME = "";

	// handles for social media pages
	export const SocialHandles = {
		facebook: "",
		instagram: "",
		youtube: "",
		twitter: "",
		pinterest: "",
		tiktok: ""
	};
	```

3. Run `npm install` to install all dependencies for the project.

4. Then run `npx prisma db push`. This will use the schema (from `./prisma/schema.prisma`) to add the relevant tables to your `jones_db` database.

5. If you make any changes to `schema.prisma`, run `npx prisma migrate dev --name <name_of_migration>` to further maintain a history of each update to the database. You may also run `npx prisma generate` to manually sync `@prisma/client` with the database after updating the table schemas. Use `npx prisma studio` to launch the prisma client to observe and manipulate the database.

## Getting Started

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo

- [ ] Find a way to elegantly hide the pinned header when user scrolls down.
- [ ] Build Admin Dashboard
- [ ] Add Google Auth
- [ ] Internationalize
- [ ] Password Recovery Feature
- [ ] Order Tracking

## Credits & Attributions

- Banner background image by [Jos Hoppenbrouwers](https://www.joshoppenbrouwers.com/) - Image was then manipulated using Photoshop.

- Website design Inspired By [8theme XStore](https://xstore.8theme.com/elementor/demos/sneakers/).

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`npx create-next-app@latest . --ts`](https://github.com/vercel/next.js/blob/canary/docs/basic-features/typescript.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
