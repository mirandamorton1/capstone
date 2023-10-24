# Wedding Budget App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a CRUD Customer Central Application intended for the Agricultural Cloud Commercial Team to use. This allows dealers, managers, and sales members to create, and manager customer profiles. 

### You can watch a walk-through of this app here

[https://watch.screencastify.com/v/W7AUe4g9nOt3wNXaBySQ](https://watch.screencastify.com/v/Y8MW62lZviM2rhLrFsw7)

<img width="1193" alt="Screenshot 2023-10-24 at 9 42 23 AM" src="https://github.com/mirandamorton1/capstone/assets/107001559/35957708-7fac-41af-bbaf-1525cc4c27ba">


## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [License](#license)
- [Technology Used](#technology-used)
- [Contributors](#contributors)
- [Questions](#questions)

### Usage:

To use, clone the project and open it in your text editor. To run the express server, enter `node index.js`. Also, enter the command `npm run buid` to start vite and typescript and open localhost:5173. To seed the database, run the command `node seed-data/seed-data.js`.

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`This project is licensed under MIT`


### Technology Used:

- React
- TypeScript
- Express
- Node.js
- Vite
- Bootstrap
- MySQL


### Contributors:

To contribute to this project, clone this repo locally and commit your code on a separate branch.

#### Contributors:

- Miranda Morton

### Questions:

If you have any questions regarding this app, feel free to contact us:

#### GitHub:

- https://github.com/mirandamorton1

#### Email:

- miranda.morton1@gmail.com

### Below are recommendations provided by React + TypeScript + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
