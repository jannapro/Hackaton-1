# Hackathon 1 — Physical Humanoid Robots Textbook

An AI-Native Textbook for Physical AI and Humanoid Robotics, built with Docusaurus.

## Demo

[![Watch the demo](https://cdn.loom.com/sessions/thumbnails/3ccb5b2b32924cfabaea272fa6b36928-with-play.gif)](https://www.loom.com/share/3ccb5b2b32924cfabaea272fa6b36928)

[Watch the full demo on Loom](https://www.loom.com/share/3ccb5b2b32924cfabaea272fa6b36928)

---

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
