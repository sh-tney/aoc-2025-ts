FROM node

WORKDIR /aoc-2025-ts

RUN npm install -g typescript

# Keep container running for devcontainer
CMD ["sleep", "infinity"]
