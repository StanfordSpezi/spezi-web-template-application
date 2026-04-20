<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Stanford Biodesign Digital Health Spezi Web Template Application Web Frontend

[![Build and Test](https://github.com/StanfordSpezi/spezi-web-template-application/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-web-template-application/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/spezi-web-template-application/graph/badge.svg?token=PsKyNz7Woe)](https://codecov.io/gh/StanfordSpezi/spezi-web-template-application)

Template repository for a web React application

## Stack

The Spezi Web Template Application repository contains a React application built with TypeScript, Vite and Firebase. It provides automated GitHub Actions, setups for code linting, testing and test coverage reports, docker deployments, a docker compose setup. Uses Stanford Spezi Web kit.

## Getting started

This project uses Node.js v24. Install Node.js, e.g. using [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating), [homebrew (for macOS)](https://formulae.brew.sh/formula/node) or the official [Node.js installer](https://nodejs.org/en/download).

### Backend

To use Web Frontend, you need to use an actual Firebase environment or Emulator with seeded data. For developing locally, it's best to use the Emulator.

1. Clone https://github.com/StanfordSpezi/spezi-firebase-template repository

2. In the root of Spezi Firebase Template run:

```bash
npm run prepare && npm run serve:seeded
```

Repeat step 2 each time files have changed.

Refer to [the Spezi Firebase Template](https://github.com/StanfordSpezi/spezi-firebase-template) repository for more details.

### Dashboard

1. Install all dependencies

```bash
npm install
```

2. Setup environment variables

Refer [.env.example](.env.example) file for environment variables documentation. Copy `.env.example` to `.env.local` and adjust if necessary.

3. Start the Vite Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Deployment

This repository contains all necessary files to deploy the web frontend to Google Cloud Firebase.

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/spezi-web-template-application/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Byers Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](https://github.com/StanfordSpezi/spezi-web-template-application/tree/main/CONTRIBUTORS.md) for a full list of all contributors.

![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-light.png#gh-light-mode-only)
![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-dark.png#gh-dark-mode-only)