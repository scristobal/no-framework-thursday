check:
    npx @biomejs/biome@1.8.3 check

fix:
    npx @biomejs/biome@1.8.3 check --write

serve:
    npx live-server --mount=/:./site --port=9999
