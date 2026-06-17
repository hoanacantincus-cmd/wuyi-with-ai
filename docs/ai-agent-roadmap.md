# WuYi Personal AI Agent Roadmap

This document records the planned AI Agent direction for the website. The live page currently keeps the original static visual experience; the Agent UI is intentionally not mounted yet.

## Goal

Add a personal AI Agent to the website when a stable public model router is available.

The Agent should support two jobs:

- Introduce WuYi: capabilities, project style, contact path, and suitable collaboration scenarios.
- Diagnose AI project ideas: output need type, technical route, risks, MVP steps, and collaboration advice.

## Planned Architecture

```text
Visitor browser
  -> Website frontend
  -> Vercel /api/agent
  -> Public 9router endpoint
  -> Free or paid model provider
```

The browser must never receive the 9router API key. The key stays in Vercel environment variables and is used only by the server-side proxy.

## Existing Backend Contract

The server route is planned as:

```text
POST /api/agent
```

Request:

```json
{
  "intent": "about_wuyi | project_diagnosis",
  "message": "visitor message",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Response:

```json
{
  "reply": "assistant reply",
  "diagnosis": {
    "needType": "string",
    "techRoute": ["string"],
    "risks": ["string"],
    "mvpSteps": ["string"],
    "collaborationAdvice": "string"
  }
}
```

## Environment Variables

```text
NINE_ROUTER_BASE_URL=https://router.example.com/v1
NINE_ROUTER_API_KEY=sk-...
NINE_ROUTER_MODEL=oc/deepseek-v4-flash-free
AGENT_ALLOWED_ORIGINS=https://wuyi-with-ai.pages.dev,https://wuyi-with-ai.vercel.app,http://127.0.0.1:5173,http://localhost:5173
```

Optional frontend override:

```text
VITE_AGENT_API_URL=https://wuyi-with-ai.vercel.app/api/agent
```

## Local Test Notes

Local 9router can run at:

```text
http://127.0.0.1:20128/v1
```

The tested free model was:

```text
oc/deepseek-v4-flash-free
```

Temporary tunnel testing can expose local 9router through a public URL, but this is not production-stable because the URL can change or expire.

## Production Requirement

For a stable public website, run 9router on a persistent VPS/cloud server and expose it over HTTPS:

```text
https://router.example.com/v1
```

Minimum practical VPS size:

```text
1 vCPU
1 GB RAM
20 GB disk
Ubuntu 22.04 or 24.04
```

Recommended production steps:

1. Provision a VPS or long-running container service.
2. Install and run 9router as a service.
3. Configure HTTPS through Nginx/Caddy or a managed tunnel.
4. Create a 9router API key and enable `Require API key`.
5. Add at least one stable provider/model.
6. Set Vercel environment variables.
7. Redeploy Vercel and test `/api/agent`.
8. Reintroduce the frontend Agent Dock after the backend endpoint is stable.

## Frontend Direction

When enabled, prefer a right-bottom floating cyber Agent dock:

- collapsed glowing launcher
- expanded desktop side panel
- mobile bottom sheet
- two modes: `认识伍轶` and `项目诊断`
- diagnosis cards for structured output

Do not add the frontend dock until the public 9router endpoint is stable enough for production demos.
