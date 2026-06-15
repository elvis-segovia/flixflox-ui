#!/bin/sh
set -e

# Generate the runtime config consumed by the SPA (see src/env.ts) from the
# container's environment variables. This lets a single built image be
# configured per deployment instead of baking values in at build time.
#
# Installed into the nginx image's /docker-entrypoint.d/, which runs every
# *.sh here before nginx starts; nginx itself is launched afterwards by the
# image's own entrypoint, so this script must not exec.
CONFIG_FILE=/usr/share/nginx/html/config.js

cat > "$CONFIG_FILE" <<EOF
window._env_ = {
  VITE_STREAMAPI_URL: "${VITE_STREAMAPI_URL}",
  VITE_STREAMAPI_PREFIX: "${VITE_STREAMAPI_PREFIX}",
  VITE_STREAMAPI_PREFIX_ADMIN: "${VITE_STREAMAPI_PREFIX_ADMIN}",
  VITE_DEFAULT_NEXT_EPISODE_OFFSET: "${VITE_DEFAULT_NEXT_EPISODE_OFFSET}"
};
EOF

echo "[runtime-config] generated $CONFIG_FILE:"
cat "$CONFIG_FILE"
