# RPS Third task built with Nuxt 3 and Nitro

This is web app for array manipulation and sorting. All arrays should be stored in the database and can be manipulated using the API.
Main features:
- Array CRUD
- Get all arrays
- Sort an array with a specific algorithm

# Project Structure

## Folder Structure

- `assets/`: Contains static assets like stylesheets.
	- `styles/`: Main styles directory.
		- `css/`: Contains CSS files.
		- `scss/`: Contains SCSS files.
- `components/`: Contains Vue components.
	- `layout/`: Components for layout.
	- `navigation/`: Components for navigation.
	- `theming/`: Components for theming.
		- `ColorSwitch.vue`: Component for switching colors.
		- `ThemeSwitch.vue`: Component for switching themes.
	- `utility/`: Utility components.
- `pages/`: Contains page components.
	- `index.vue`: Home page.
- `public/`: Contains public assets.
	- `fonts/`: Contains font files.
	- `images/`: Contains image files.
- `server/`: Contains server-side code.
	- `api/`: API routes.
    - `utils/`: Utility functions.
	- `tsconfig.json`: TypeScript configuration for the server.
- `stores/`: Contains Pinia stores.
- `types/`: Contains TypeScript type definitions.
	- `ui/`: UI-related types.
	- `utility/`: Utility types.
- `utils/`: Contains utility functions.
	- `navigation.ts`: Utility functions for navigation.

## Explanation

The project is structured to separate concerns and improve maintainability:

- **Assets**: Static files like stylesheets are organized under `assets` to keep them separate from the application logic.
- **Components**: Vue components are organized by their functionality (layout, navigation, theming, utility) to make it easier to find and manage them.
- **Pages**: Each page of the application has its own file under `pages`, following the Nuxt.js convention.
- **Public**: Public assets like fonts and images are placed under `public` to be served directly.
- **Server**: Server-side code is kept under `server` to separate it from client-side code.
- **Stores**: State management is handled using Pinia stores, which are placed under `stores`.
- **Types**: TypeScript type definitions are organized under `types` to ensure type safety across the application.
- **Utils**: Utility functions are placed under `utils` for reusability and better organization.

## Stores

### `stores/settings.ts`

This file contains the settings store which manages the application's settings, such as the primary color. It uses Pinia for state management.

## Server-side
All server-side code is located in the `server` directory. The server is built using Nitro, part of the Nuxt 3 framework.
`/server/api` contains the API routes (like get, post, etc.), and `/server/utils` contains utility functions (database connection, other utility functions).

# Getting ready to run the project
## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

```bash
# pnpm
pnpm install
```

```bash
# yarn
yarn install
```

```bash
# bun
bun install
```

## Development
# Before running the project, make sure to create a `.env` file in the root directory with the following content:
- `NITRO_DATABASE_URL="your_database_url"`

```bash

## Deployment

```bash
# bun
bun run dev
```

```bash
# npm
npm run dev
```

```bash
# pnpm
pnpm run dev
```

```bash
# yarn
yarn dev
```

Check out the [Deployment guide](https://nuxt.com/docs/getting-started/deployment) for more information.  
