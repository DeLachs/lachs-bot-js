#!/bin/sh
#!/bin/bash
node /app/deploy-commands.js && node /app/dbInit.js && node /app/index.js
