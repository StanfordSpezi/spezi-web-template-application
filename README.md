<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Spezi Web Template Application

[![Build and Test](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/build-and-test.yml)
[![Deployment](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/deployment.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-web-design-system/actions/workflows/deployment.yml)
<!-- [![codecov](https://github.com/StanfordSpezi/spezi-web-design-system/graph/badge.svg?token=PsKyNz7Woe)](https://codecov.io/gh/StanfordBDHG/ENGAGE-HF-Web-Frontend) -->

## How To Use

This repository contains the Spezi Web Template Application. It demonstrates using the Spezi Web ecosystem to build a modern digital health web application.

## Getting Started

You can run the project using the following command. You will need to install Node.js and npm, e.g., using [homebrew (recommended for macOS)](https://formulae.brew.sh/formula/node) or the official [Node.js installer](https://nodejs.org/en/download).

1. Install All Dependencies

```bash
npm install
```

2. Setup Firebase Environment Values

Create an `.env.local` file or inject the following environment variables required for the Google Firebase Setup:

```
VITE_PUBLIC_FIREBASE_API_KEY=
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN=
VITE_PUBLIC_FIREBASE_PROJECT_ID=
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET=
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
VITE_PUBLIC_FIREBASE_APP_ID=
```

3. Start the Firebase Emulator Suite

```bash
firebase emulators:start
```

4. Optionally Seed the Firestore Database

```bash
npm run seed
```

5. Start the Spezi Web Template Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.<!-- markdown-link-check-disable-line -->

## Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build the image and run the docker compose setup: `docker compose -f docker-compose-development.yml up`.

You can view the images you create with `docker images`.

Open [http://localhost](http://localhost) with your browser to see the result. You can visit [http://localhost:8080](http://localhost:8080) to see the reverse proxy setup before the main application.<!-- markdown-link-check-disable-line -->

The `docker-compose.yml` setup contains a production-ready setup using a reverse proxy.

Every version of the application on the `main` branch is automatically packaged into docker images using the `main` tag. Every release is also published using the `latest` and respective version tags.

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/spezi-web-design-system/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Byers Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](hhttps://github.com/StanfordSpezi/spezi-web-design-system/tree/main/CONTRIBUTORS.md) for a full list of all contributors.

![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-light.png#gh-light-mode-only)
![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-dark.png#gh-dark-mode-only)
