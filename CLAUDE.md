# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn serve        # Development server with hot reload (proxies /v1/* to http://localhost:8080)
yarn build        # Production build
yarn lint         # ESLint validation

# Generate API client from OpenAPI spec (run after openapi.json changes)
make task.generate_client.javascript

# Docker builds
make build.docker           # Standard Docker image
make build.docker.buildx    # Multi-platform (amd64 + arm64)
```

Node v16.18.1 is required (OpenSSL legacy provider is explicitly set in scripts).

## Architecture

**Stack:** Vue 2 + Vuex 3 + Vue Router 3 + Vuetify 2 + Axios

### API Layer

The `src/client/` directory is **auto-generated** from `openapi.json` — do not manually edit files there. The generation command is `make task.generate_client.javascript`. All API calls go through the generated client classes (e.g., `AdminPodApi`, `NonadminPodApi`, `AuthApi`).

`src/axios.js` installs request interceptors that inject the JWT `Authorization` header and handle error responses globally.

### Authentication

Auth state lives entirely in `localStorage` (token, uid, role, email). Helper functions are in `src/utils/tool.js`. The router guard in `src/router.js` redirects unauthenticated users to `/login`. Admin-only routes (`/users`, `/templates`) are enforced at the UI level via role checks.

### Component Structure

All page-level components are flat in `src/components/`. There is no nested component hierarchy — views are large single-file components (SFCs):

- `Pod.vue` (~935 LOC) — pod lifecycle management, terminal (XTerm), maps (Leaflet), real-time updates via MQTT/Socket.IO
- `User.vue` (~727 LOC) — admin user CRUD
- `Template.vue` (~503 LOC) — admin template management
- `Home.vue` — main layout shell with sidebar navigation
- `Dashboard.vue` — backend health/version display

### State Management

Vuex is present but nearly empty. Components manage their own local state directly. Do not add Vuex state unless necessary — the pattern here is component-local state with direct API calls.

### Environment

| Variable | Purpose |
|---|---|
| `CLPL_BACKEND_URL` | Backend API URL (required for Docker/production) |
| `CLPL_DNS_RESOLVER` | DNS resolver (default: `10.43.0.10`) |

In development, `vue.config.js` proxies `/v1/*` to `http://localhost:8080`.
