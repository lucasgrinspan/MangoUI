# Mango UI

[Home page](https://lucasgrinspan.github.io/MangoUI/docs/index.html) | [Documentation](https://lucasgrinspan.github.io/MangoUI/docs/design/)

This is a fun little project experimenting with using semantic selectors to build a component library. The idea is simple, instead of using `class="button loading"` to make a loading button, you would use a markup like:

```html
<button>
  <span role="alert">Loading...</span>
</button>
```

This way, the developer is forced to use descriptive HTML and the styles applied to each component will match the semantics.

On top of this, I wanted to practice web design and creating a cohesive design skills. Using the colors of a mango as inspiration, I created a few themes.

![The colors of a mango](site/assets/mango-colors.png)

## Usage

You can check out the [installation guide](https://lucasgrinspan.github.io/MangoUI/docs/getting-started/) but you can use the jsDelivr CDN or install the project in NPM (`npm install mango-ui-components`).

### CDN

```html
<!-- place this in your head tag -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/mango-ui-components@1.0.0/dist/mango.css"
/>

<!-- place this at the end of your body tag -->
<script src="https://cdn.jsdelivr.net/npm/mango-ui-components@1.0.0/dist/mango.js"></script>
```

### NPM

```js
import "node_modules/mango-ui-components/dist/mango.css";
```

## Project

```
.
│
├── src/                          # all styles and scripts for components
│   ├── components/               # SCSS files for component styles
│   ├── helpers/                  # SCSS files for helper classes
│   ├── js/                       # JS files for components
│   ├── tokens/                   # Design tokens that components/ uses
│   │   ├── themes/               # Holds the Mango UI themes (SCSS)
│   │   │   ├── _palette.scss     # Definition of all of the colors
│   │   │   └── ...               # SCSS files that link tokens to components
│   │   └── ...                   # Other design token files
│   ├── main.scss                 # Builds the mango.css stylesheet
│   └── utils.scss                # Holds utility functions for referencing colors
├── site/                         # Mini repo for building the docs site
└── assets/                       # Fonts and icons held here
```

## Future Work

I'd mostly like to use this project to learn more about accessibility and web design. There are a few common web patterns that aren't possible without JavaScript that I haven't gotten to yet. Specificially, it would be cool if I could complete the components listed in [ARIA's design patterns](https://www.w3.org/TR/wai-aria-practices-1.2/#aria_ex).
