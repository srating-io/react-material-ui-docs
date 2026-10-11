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
This is intended to be worked on in tandem with [react-material-ui](https://github.com/srating-io/react-material-ui). The docs page will be the place to test and develop new feature for that package.

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

1.  Create `app/<group>/<name>/page.tsx` (or `app/<name>/page.tsx` for a top-level entry).
2.  Implement the showcase in `page.tsx`, following the template in [`.agents/conventions.md`](.agents/conventions.md).
3.  **Add a matching entry to the `sections` array in `components/Sidebar.tsx`.** A page without one has no link and is unreachable.
4.  If you added a new group that should start expanded, add its `value` to the default-expanded set in the same file.
5.  Run `npm run coverage` to confirm no library export is left undocumented.

The structure of the `app/` directory determines the URL paths for the documentation.

## Available Scripts

| Script | Description |
| :--- | :--- |
| `dev` | Runs the development server at `http://localhost:3002`. |
| `build` | Builds the production-ready Next.js application. |
| `start` | Starts the production server at `http://localhost:3002`. |
| `cluster` | Runs the production server in cluster mode. |
