Purpose & Intent

Implement Chrome Tools MCP Server as our browser–→LLM bridge so that Cursor’s Composer agent can ingest live console.log, network, and DOM events directly from Chrome DevTools. This removes manual copy-paste, enables autonomous debugging loops, and future-proofs our observability stack for any IDE or agent that speaks the Model-Context-Protocol (MCP). (github.com, pulsemcp.com)

Why Chrome Tools over BrowserTools? Chrome Tools MCP is lightweight (no extension), scriptable via Node, and offers deeper DevTools Protocol access—critical for CI headless runs and custom filtering of noisy logs. (github.com, docs.cursor.com)

⸻

Implementation Checklist

0. Pre-flight
	•	Confirm Node ≥ 16 and npm are installed. (node -v, npm -v) (kento-yamazaki.medium.com)
	•	Verify Chrome/Chromium version ≥ 115 (stable CDP v1.3). (github.com)

1. Launch Chrome with Remote Debugging
	•	Mac / Linux:

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port=9222 --user-data-dir=/tmp/mcp-profile


	•	Windows:

"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

Rationale – Chrome Tools MCP connects via CDP at http://localhost:9222. Without this flag the server cannot attach. (github.com)

2. Install Chrome Tools MCP
	•	Add as dev dependency:

npm install -D @nicholmikey/chrome-tools

Alternately: npm i -g @nicholmikey/chrome-tools for global CLI use. (github.com)

3. Create mcp.json for Cursor
	•	Inside project root, create .cursor/mcp.json with:

{
  "mcpServers": {
    "chrome-tools": {
      "command": "node",
      "args": [
        "./node_modules/@nicholmikey/chrome-tools/dist/index.js"
      ],
      "env": {
        "CHROME_DEBUG_URL": "http://localhost:9222",
        "CHROME_CONNECTION_TYPE": "direct"
      },
      "enabled": true
    }
  }
}

For Windows CMD + npx variant see Appendix A. (reddit.com, forum.cursor.com)

4. Add NPM script for local runs
	•	In package.json:

{
  "scripts": {
    "mcp:chrome": "node ./node_modules/@nicholmikey/chrome-tools/dist/index.js"
  }
}

This lets devs run npm run mcp:chrome during non-Cursor sessions. (eekayonline.medium.com)

5. Verify Connectivity
	•	Start Chrome with flag (Step 1).
	•	Run npm run mcp:chrome (or let Cursor auto-spawn).
	•	Open DevTools ➜ Remote Target (chrome://inspect/#devices) – ensure port 9222 is exposed. (reddit.com)
	•	In Cursor, send: chrome-tools.list_tabs – should return active tab array. (github.com)

6. Capture Console Logs in Agent Flow
	•	From Cursor chat, invoke:

{
  "tool": "chrome-tools.capture_console",
  "args": { "tabId": <TAB_ID>, "duration": 10 }
}

Check that console.log lines appear in chat timeline. (github.com)

7. Noise-Reduction Filters (Optional)
	•	Set CHROME_CONSOLE_LEVEL env (error|warn|info|log).
	•	Implement custom regex ignore list in ENV.IGNORE_PATTERNS (supported since v0.3.4). (github.com)

8. Security Hardening
	•	Ensure secrets never hit console; if unavoidable set REDACT_PATTERNS env to auto-mask tokens. (github.com)
	•	Restrict CDP port to loopback or secure tunnel in CI (SSH / ngrok). (github.com)

9. Continuous Integration (Headless)
	•	Add a Docker service using chromedp/headless-shell exposing 9222. (github.com)
	•	Spawn MCP server in the same job; export CHROME_CONNECTION_TYPE=docker.
	•	Run test suite; parse screenshots in artifacts. (forum.cursor.com)

10. Documentation & Onboarding
	•	Link this file in CONTRIBUTING.md.
	•	Record 2-minute Loom demo; store in /docs/videos.
	•	PR reviewers must verify steps 1–6.

⸻

Appendix A – Windows npx Shortcut

{
  "mcpServers": {
    "chrome-tools": {
      "command": "cmd.exe",
      "args": [
        "/c",
        "npx",
        "-y",
        "@nicholmikey/chrome-tools"
      ],
      "enabled": true
    }
  }
}

(reddit.com)

⸻

Last updated: 2025-05-16