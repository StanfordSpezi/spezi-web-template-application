#
# This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
#
# SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

FROM node:latest AS build

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM nginx:stable-alpine

RUN mkdir -p /var/www
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# https://github.com/garronej/vite-envs
# enable env var configuration
ENTRYPOINT ["sh", "-c", "/usr/share/nginx/html/vite-envs.sh && nginx -g 'daemon off;'"]
