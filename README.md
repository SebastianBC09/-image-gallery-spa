# Image Gallery SPA with Infinite Scroll, Search, and Like/Dislike Functionality

This project is a Single Page Application (SPA) built with React, Vite, and TypeScript. It features an image gallery with infinite scroll, search functionality, and the ability to like or dislike images. The application is fully responsive and optimized for performance.

## Features
- **Infinite Scroll**: Automatically loads more images as you scroll.
- **Search**: Filter images by keywords.
- **Like/Dislike**: Toggle like or dislike for each image.
- **Responsive Design**: Optimized for mobile and desktop views.

## Installation

### 1. Clone the repository
Start by cloning the repository to your local machine and navigating into the project directory.

`git clone https://github.com/your-username/image-gallery-spa.git`
`cd image-gallery-spa`

### 2. Install dependencies
To set up the project, you need to install all the required dependencies. This includes React, Vite, TypeScript, Tailwind CSS, Axios, React Query, and other necessary packages. Once inside the project directory, run the installation command to install all dependencies listed in `package.json`.

### 3. Run the development server
With all dependencies installed and Tailwind CSS configured, you can start the development server. This will allow you to see your application live in your browser. The development server will watch for file changes and automatically reload the page, ensuring a smooth development experience.

### 4. Build the application
When you're ready to deploy the application, run the build command. This will compile your application into an optimized, production-ready version. The output will be stored in the `dist` directory, ready to be deployed to your hosting service.

## Usage

- **Infinite Scroll**: Scroll down to automatically load more images.
- **Search**: Type keywords into the search bar to filter images.
- **Like/Dislike**: Click the heart icon on each image to like or dislike it.

## Technologies
- **React**: For building the user interface.
- **Vite**: As the build tool and development server.
- **TypeScript**: For type safety.
- **Tailwind CSS**: For utility-first styling.
- **Axios**: For making API requests.
- **React Query**: For data fetching and caching.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## License
This project is licensed under the MIT License.
