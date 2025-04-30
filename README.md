<<<<<<< HEAD

# The Apothecary Shoppe

An anime-inspired digital apothecary where users can explore holistic wellness through a curated herb database, trusted remedies, and custom herbal recipes—all wrapped in a magical, earthy interface.


## Tech Stack
- **Frontend:** React (with Vite)
- **Backend:** Node.js + Express + GraphQL
- **Database:** MongoDB Atlas + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker + Render + GitHub Actions (CI/CD)
- **Styling:** Styled-Components + CSS Variables (Earthy Anime Theme)

## Features

- Search herbs by **name or symptom**
- View **remedies and healing properties**
- **Save favorite herbs** and searches
- Responsive, mobile-friendly, and accessible design


## Deployment

To deploy this project run

```bash
  npm run dev
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@Imani](https://www.github.com/neopoku)
- [@Diana](https://github.com/Bahashem)
- [@Bodi](https://www.github.com/bhaktabodi108)
- [@Malcolm](https://www.github.com/KingRaii)


## Demo

Insert gif or link to demo

=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
>>>>>>> 03202f05 (made changes to the main)
