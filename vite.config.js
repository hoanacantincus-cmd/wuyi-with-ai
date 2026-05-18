import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

function localAgentApiPlugin() {
  return {
    name: "local-agent-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/agent", async (req, res, next) => {
        try {
          const { default: handler } = await import("./api/agent.js");
          await handler(req, res);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.keys(env).forEach((key) => {
    if (env[key] && !process.env[key]) process.env[key] = env[key];
  });

  return {
    plugins: [react(), localAgentApiPlugin()],
    build: {
      sourcemap: false,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
          warn(warning);
        },
      },
    },
  };
});
