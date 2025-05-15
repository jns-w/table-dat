# Table Dat

Web application for exploring the blockchain.

## Getting Started

Installing dependencies:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Project will be running on [http://localhost:3000](http://localhost:3000).

## Stack & Codebase Design

- React
- Next.js
- TypeScript
- Tailwind
- Sass
- Jotai
- Motion

### Overall File Structure

This project uses Next.js [App Router](https://nextjs.org/docs/app/building-your-application/routing) and naturally
adheres closely to React's component-based file structure. Each element component are compartmentalised into their own
folder, with subcomponents and stylesheets in them.

#### Code Comments - JSDoc

This project adheres to JSDoc syntax for code comments. In IDE, it should be possible to hover over components and functions to see their documentation.

### Theming

Theming is achieved through CSS variables in `app/global.scss`. You will see variable declarations for light
and dark theme in there. We use the data-theme attribute on the html
element to switch between light and dark modes. Always search for hex values in the file to reuse colors before adding
new ones into the stylesheet.

### Tailwind & Sass the Balancing Act

Tailwind is great for it's one lining and convenience of use. However, for many aspects of styling like responsive
design
and reusablility it starts to fall short. This project aims to use the best of both worlds of Tailwind & CSS. Tailwind
can and should be used
for plain
simple elements, typically one-offs and static items, think wrapper divs with just `flex justify-center` we do not want
these short classes to overpopulate our CSS files. Whereas we use Sass for complex responsive and/or highly reusable
styling declarations.

A good rule of thumb is to use Tailwind for up to _max of 6 classes_ per element. If you find yourself using more than 6
classes or
repeating
yourself, consider
using CSS definitions instead. Avoid large paragraphs of repeated Tailwind classes.

### Use "px" for styling

Why use "px" when "rem" is considered best practice? This project uses postcss-pxtorem plugin to convert all px to rem
at
compile time. So we do get all the benefits of using rem values on the site. When using px to code, developer experience
is superior, we have more precision, codebase is readable and we can work faster.

### Media Queries

The most common use case for this app is on desktop devices, thus it makes sense to design and code for desktop first.

Queries are used via a Sass mixin method, defined in `styles/mixins/media.scss`. Simply import the
mixin `@import "@/styles/mixins/media"` and use it this way: `@include media(tablet) { ...styles }`

- mobile-xs: <= 320px
- mobile-s: 320px - 375px
- mobile: 375px - 464px
- tablet: 464px - 765px
- small: 765px - 984px
- medium: 984px - 1248px
- standard (default): 1248px - 1500px
- large: 1500px - 2560px
- xlarge: >= 2560px

Recommended queries ordering:
standard > medium > small > tablet > mobile > mobile-s > mobile-xs > large > xlarge

### Jotai (State Management)

[Jotai](https://jotai.org/) is a react-like state management library that is simple and easy to use. Atomic in nature,
it helps to manage state shared across multiple components, and yet keeps syntax exactly the same as React's useState.
Read up on its [documentation](https://jotai.org/docs/introduction) to understand the structure.

### Animation

This project aims to achieve animations with CSS first. And where there are advanced animations, we
use [motion](https://motion.dev).