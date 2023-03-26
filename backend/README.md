# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

## Initialize Database

Steps to initialize database:

1. If tables already exist, then they should be dropped before initializing
2. Run `npm initialize-database` to automotically create tables and load data from .csv files
3. This terminal will not end on it's own, and will need to be terminated with `Ctrl + C` when finished

### Table Doesn't Display on Frontend?

1. Verify that `backend/src/index.ts` origin (found at Line 36) is set to: 'http://localhost:3000'
2. If any change is needed, backend must be restarted for change to take place.