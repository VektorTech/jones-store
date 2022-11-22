# Jones (Jordan Ones) Shoe Store

Jones is an online store for purchasing Nike Jordan Ones &mdash; a seamless e-commerce marketplace.

This is a responsive, mobile-first website featuring real-time product filters, a pop-up search option (AJAX live search), AJAX add to cart and add to wishlist options, a newsletter form, an announcement banner for live updates, customer reviews functionality, a product slideshow on hover and SEO friendly markup.

## Tech Used

- **Next.JS** &mdash; React Framework - SSR, SSG & REST API
- **Typescript** &mdash; Static Typing, Type Inference & Type Guarding
- **Iron Session** &mdash; Session Management
- **BCrypt** &mdash; Password Hashing & Comparison
- **Yup** &mdash; Schema & Form Validation
- **PostgreSQL** &mdash; Relational Database Management System
- **Prisma** &mdash; ORM for accessing PostgreSQL
- **Stripe** &mdash; Payment Gateway & Library for accessing the Stripe API
- **Micro** &mdash; Parsing Incoming Request Body
- **Sass** &mdash; Custom Styling
- **React Icons** &mdash; SVG Icon Library
- **Next Share** &mdash; Share buttons for social media
- **React Toastify** &mdash; Toast Popup Library
- **Probe Image Size** &mdash; Gets dimension of remote images
- **React Spinners** &mdash; Loading Animation Components
- **nProgress** &mdash; Progress Bar For Navigation Indication
- **Moment** &mdash; Formatting Dates
- **Friendly Username Generator** &mdash; Generates random usernames for new users
- **ESLint** &mdash; Code Linting
- **Prettier** &mdash; Enforce Consistent Code Format
- **Figma** &mdash; Page Designs
- **Adobe Photoshop** &mdash; Design & Image Editing
- **TinyPng** &mdash; Image Optimization
- **Postman** &mdash; Testing API routes (Auth, Products)
- **Chrome & Firefox Dev Tools**

## Design Decisions

- Because this is an e-commerce website, SEO plays a significant factor in its success, but the standard client-side rendered React would seriously hinder search engines from properly crawling each page. So I chose Next.JS for this project as it provides a quick and simple way for writing performant, server-side rendered react applications without much overhead.

- React's `useState` & `useReducer` hooks coupled with the Context API provided a sufficient means for managing and centralizing state in this application as there wasn't much information that needed to be kept in memory on the client that would demand a complex library like Redux. Pages are frequently refreshed, and data is already being rendered onto pages from the server(`getServerSideProps`), which further reduced the need for alternate state management strategies. User preferences are persisted through cookies to allow for pre-rendering on the server.

- For managing the user state, I switched from using multiple `useState` to a single `useReducer` as it's a more convenient option for working with state objects with multiple sub-values, like the wishlist and cart field on the user object.

- Used Postgres trigger functions for updating cart total whenever a cart item gets added or removed.

- After recognizing a repeating pattern in how API routes were being written and wanting to improve the process, I decided to build a method routing function, `RouteHandler`, that arranges request handlers in a similar fashion to `express` routers. It allows all handlers to be composed with a custom error catcher and session middleware and enables authentication and role-based access control. This abstraction reduced boilerplate code inside API routes and made writing async code much cleaner.

- The website UI diverted from the original Figma design in a few areas.

- I created a product context to manage the product data on the client for products page, because I wanted more control over filtering and saw the need to reduce querying the database each time the user selects a different criterion.

- Lazy load tab panels until the user selects their corresponding tab on the product page.

## Issues Encountered

- Programmatically setting a focusable element to the active element inside the document was not working. I had to wrap the code in a `setTimeout`, for some reason, which I still don't quite understand.

- No way to add custom constraints onto table columns inside Prisma, so I had to resort to handwritten SQL Commands.

- The Sass team is deprecating the `@import` statement in favour of `@use`, which forced me to import (with `@use()`) all variables, functions, placeholders and mixins into all sass files that depends on them.

- Learning to work with `next/image` was a bit difficult, especially when trying to resize images.

- While implementing the slideshow feature of the product component, I ran into a problem where the state wasn't updating as intended. After some point, I realized that the callback being passed to `setInterval` was using an outdated value of state held inside its closure &mdash; the value assigned during the first render. I later discovered a different way of updating the state by passing a callback to `setState` instead of a value. The callback accepts the current value of the state to calculate and return a new state. [Further details by Dan Abramov...](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

- Made some changes to UI in areas that were not accounted for during design, also for layout and stylistic improvements.

- Realized that I needed to `await` all Prisma DB queries for them to run successfully.

## What I've Learned

- Further developed my intuition for writing custom hooks.

- Dynamic routing strategies through Next JS

- `:focus-visible` selector for keyboard tabbing focus, and `:focus-within` for elements with an actively focused descendant.

- Better approaches to BEM naming and component design.

- Canonical tag to signal the main version of (near) duplicate pages to search engines.

- Native internationalization(`Intl`) class that has a method for formatting currency.

- It's probably best not to program the database using triggers or procedures because they tend to become invisible (may forget or not be aware of them during development), it's probably best to perform calculations on the server instead.

- Alternative way to update state `setState(state => ...)`

- Intl Object - API that provides many tools for internationalization purposes.

- For future projects, prefer a test-driven approach - Write tests to specify the purpose of each module before coding. This way, I can check to ensure that adding new code doesn't trigger hidden side effects or break prior features before shipping to production.

## Setup

1. Create a `touch .env` file in the root directory and set the following keys:
    ```python
    # Database string for PostgreSQL
    DATABASE_URL="postgres://{user}:{password}@{hostname}:{port}/{database_name}"

    # 32+ character long string for session cookie encryption [https://1password.com/password-generator/]
    SECRET_COOKIE_PASSWORD="complex_password_at_least_32_characters_long"

    # DOMAIN ADDRESS
    DOMAIN="http(s)://example.org"

    # STRIPE INFO
    STRIPE_PUBLISHABLE_KEY="pk_..."
    STRIPE_SECRET_KEY="sk_..."
    STRIPE_ENDPOINT_SECRET="whsec_..."
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

4. Then run `npx prisma db push`. This will use the schema (from `./prisma/schema.prisma`) to add the relevant tables to your `jonesdb` database.

5. If you make any changes to `schema.prisma`, run `npm run db:migrate --name <name_of_migration>` to further maintain a history of each update to the database. You may also run `npx prisma generate` to manually sync `@prisma/client` with the database after updating the table schemas. Use `npx prisma studio` to launch the prisma client to observe and manipulate the database.

## Getting Started

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo

- [ ] Find a way to elegantly hide the pinned header when the user scrolls back up.
- [ ] Build Admin Dashboard
- [ ] Add Google Auth
- [ ] Internationalize - Allow multiple currencies and languages
- [ ] Password Recovery Feature
- [ ] Order Tracking Feature
- [ ] Add Structured Data to Product Pages Using [JSON-LD](https://nextjs.org/learn/seo/rendering-and-ranking/metadata)
- [ ] Add An [XML Sitemap](https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps)
- [ ] Image Drag n Drop feature when uploading profile avatar
- [ ] Images Drag n Drop feature for `/api/add-products` when adding product images.
- [ ] Use SMTP to email users after sign-up and product purchases.
- [ ] Show products count per filter item constraint on the products page.
- [ ] Integrate Paypal as a second payment gateway.
- [ ] Add a captcha to the signup and login forms.
- [ ] Scrape Products to DB.
- [ ] Create a size chart table.

## Credits & Attributions

- Banner background image by [Jos Hoppenbrouwers](https://www.joshoppenbrouwers.com/) - Image was then manipulated using Photoshop.

- Website design Inspired By [8theme XStore](https://xstore.8theme.com/elementor/demos/sneakers/).

- [Pexels](https://www.pexels.com/)

- Nike.com for ["Jumpman" Logo](https://www.nike.com/jordan)
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

Install Command: `npm install && npx prisma db push`