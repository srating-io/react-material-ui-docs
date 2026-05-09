# react-material-ui-docs

Documentation for [@esmalley/react-material-ui](https://github.com/srating-io/react-material-ui).

This repository contains the documentation for the React Material UI component library.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

Clone this repository and install the dependencies:

```bash
npm install
```

### Working on this project
This is indended to be worked on in tandum with [react-material-ui](https://github.com/srating-io/react-material-ui). The docs page will be the place to test and develop new feature for that package.

Assuming both repo are installed and set up, to link them and develop do this:

In `react-material-ui`
```bash
npm link
```

In `react-material-ui-docs`
```bash
npm link @esmalley/react-material-ui
```

In `react-material-ui`
```bash
npm run watch
```

In `react-material-ui-docs`
```bash
npm run dev
```

The application will be available at [http://localhost:3002](http://localhost:3002).

### Building and Running

To create an optimized production build:

```bash
npm run build
```

To run the production build:

```bash
npm run start
```

Alternatively, you can use `npm run cluster` to run the production server using a clustered approach.

## Adding New Documentation Pages

This project uses the Next.js App Router. To add a new documentation page for a component:

1.  Navigate to the `app/` directory.
2.  Create a new folder under `app/` corresponding to your component's name (e.g., `app/my-component/`).
3.  Inside that folder, create a `page.tsx` file.
4.  Implement the component showcase within `page.tsx`.

The structure of the `app/` directory determines the URL paths for the documentation.

## Available Scripts

| Script | Description |
| :--- | :--- |
| `dev` | Runs the development server at `http://localhost:3002`. |
| `build` | Builds the production-ready Next.js application. |
| `start` | Starts the production server at `http://localhost:3002`. |
| `cluster` | Runs the production server in cluster mode. |
