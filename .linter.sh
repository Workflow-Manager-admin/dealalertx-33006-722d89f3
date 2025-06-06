#!/bin/bash
cd /home/kavia/workspace/code-generation/dealalertx-33006-722d89f3/dealalertx
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

