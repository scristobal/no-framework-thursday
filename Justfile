check:
    npx @biomejs/biome@1.8.3 check

fix:
    npx @biomejs/biome@1.8.3 check --write

serve:
    npx http-server@14.1.1 ./site  -o  -p 9999
