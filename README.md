# visrec.ly

⚠️ **Project in active development**

## What Is This All About?

*visrec.ly* is a task-based visualization-recommendation tool with the goal in mind to allow novice VIS users create
novel visualizations quickly for their dataset, solely by uploading it, then specifying what they would like to achieve
with their data (e.g correlate, find differences, cluster, etc.).

This idea and project was so interesting to me that I decided to make it the project of my Bachelor's Thesis at the CS
department of Universität Wien. I enjoy the supervision of [Torsten Möller](https://research.com/u/torsten-moller)
and [Manfred Klaffenböck](https://www.cg.tuwien.ac.at/staff/ManfredKlaffenb%C3%B6ck).

### Tech Overview

In an attempt to make this tool as accessible to the public as possible, I am building it with modern web technologies,
such as:

- React, Next.js
- Material-UI, TailwindCSS
- 100% TypeScript

This monorepo has three notable modules at this point:

- `libs/draco`: The core of the underlying recommendation engine, defining learning and visualization design guidelines
  as
  Answer Set Programming (ASP) problems. It is a custom fork
  of [draco by UW Interactive Data Lab](https://github.com/uwdata/draco).
- `libs/draco-web`: Custom web-API leveraging the core API introduced in `libs/draco`
  and [`clingo-wasm`](https://github.com/domoritz/clingo-wasm) to solve ASP programs in the browser, eliminating the
  need for a server component.
- `apps/dashboard`: The actual client of the above modules, the dashboard that allows users to steer their desired
  tasks and marvel at the generated vega-lite-based visualizations.

### Decomposing the Project's Name

The first part, *visrec*, stands for VisRec, that is, **Vis**ualization **Rec**ommendation, while the *ly* segment is a
tribute to Grammarly (the grammar checker) which inspired me to jump into this project. As I exposed myself to formal,
academic concepts of visualization and visual data analysis, I realised that a Grammarly-like tool for visualization
would be beneficial to VIS-novices.

## NX Stuff

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects
as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

### Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@visrecly/mylib`.

### Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you
change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use
the `--prod` flag for a production build.

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

### ☁ Nx Cloud

#### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that
are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s
advanced code generation and project dependency graph, plus a unified experience for both frontend and backend
developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
