# How to run

First of all, this project uses docker to run its local db, so make sure you have it installed and running.

1. Install dependencies using pnpm ([installation link](https://pnpm.io/installation)): in the root folder run `pnpm i`
2. In the **apps/api** folder, change the name of the **.env.example file to just .env**
3. In the **apps/web** folder, change the name of the **.env.example file to .env.local**
4. In the root of the project run `pnpm prepare:app` (it will generate prisma client, migrate the db and seed it with)
5. Now run `pnpm dev` to start the development servers
