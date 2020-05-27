#!/bin/bash

cp -r ./resources/css ./public && \
cp -r ./resources/js ./public && \
deno run \
  --allow-read \
  --allow-net \
  --allow-write \
  --allow-plugin \
  --unstable \
  ./app.ts