# jwt-user-authentication

This project is a user authentication system using JSON Web Tokens (JWT).

## Project Structure

The project structure is organized as follows:

```bash
├── package.json
└── src
  ├── index.js
  ├── controllers
  │  ├── *.controller.js
  ├── services
  │  └── db.ts
  │  └── sequelize.ts
  ├── models
  │  ├── *.model.ts
  └── routes
  │  ├── *.routes.js
  └── middlewares
  └── helpers
  └── constants
```

## Technologies

- [Node.js](https://nodejs.org/) Javascript runtime using the [Chrome V8 engine](https://v8.dev/)
- [Express](https://www.npmjs.com/package/express) web framework for node
- [Sequelize](https://sequelize.org/) TypeScript and Node.js Object-relational mapping (ORM) for Postgres, MySQL, MariaDB, SQLite and SQL Server
- [PostgreSQL](https://www.postgresql.org/) object-relational database

## Setup

- Assuming you have Docker and Yarn installed
- `docker-compose up` to run PostgreSQL database.
- `yarn install` to install dependencies
- Create `.env` and add database credentials - see `.example.env`
- `yarn dev` runs app in the development mode with auto-restart.
