#!/bin/bash

sed -i '' '/^VITE_GIT_COMMIT_HASH=/d' .env.local
sed -i '' '/^VITE_GIT_COMMIT_MSG=/d' .env.local

echo "VITE_GIT_COMMIT_HASH=$(git rev-parse --short HEAD)" >> .env.local
echo "VITE_GIT_COMMIT_MSG=$(git log -1 --pretty=%B)" >> .env.local
