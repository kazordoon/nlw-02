# Proffy - Backend

## Getting Started

### Prerequisites

- Node.js
- NPM / Yarn
- A relational database as `MariaDB, Postgres, SQLite...`

### Installing

- Clone the repository: `git clone https://github.com/kazordoon/nlw-02.git`
- Get in the project directory: `cd nlw-02/server`
- Install the dependencies:
  - NPM: `npm i` | Remove `yarn.lock` file before installing with NPM
  - Yarn: `yarn`

### Setting environment variables

Copy the `.env.example` file to the `.env`, then you will need to set the variable values into the `.env` file according to your environment.

### Preparing the server
- Install the database engine driver following the instructions on this link: [https://preview.adonisjs.com/guides/database/setup](https://preview.adonisjs.com/guides/database/setup)
- Build the application:
  - NPM: `npm run build`
  - Yarn: `yarn build`
- Run the migrations: `node ace migration:run`

### Running the server

- NPM: `npm run start`
- Yarn: `yarn start`

### Running the tests
**OBS:** You will need to start the server before running the tests

- NPM: `npm test`
- Yarn: `yarn test`

### API endpoints

#### Classes
Action | Path | Query Params | Body | Method
------ | ---- | ------------ | ---- | ------
Get the classes by filtering | /classes | [?week_day=&subjet=&time=](#class-query-params) | - | GET
Create a new class | /classes | - | A JSON with [these fields](#class-body-params) | POST

#### Connections
Action | Path | Query Params | Body | Method
------ | ---- | ------------ | ---- | ------
Get the total connections | /connections | - | - | GET
Create a new connection | /connections | - | A JSON with [these fields](#connection-body-params) | POST

### Input data validation

#### class-query-params

- **week_day**: *number*
- **subject**: *string*
- **time**: *string*

#### class-body-params

- **name**: *string*
- **avatar**: *string*
- **whatsapp**: *string*
- **bio**: *string*
- **subject**: *string*
- **cost**: *number*
- **schedule**:
  - **week_day**: *number*
  - **from**: *string*
  - **to**: *string*

#### connection-body-params

- **user_id**: *number*

## Examples

See the [EXAMPLES.md](EXAMPLES.md).

## Built With

- [Node.js](https://nodejs.org) - JavaScript runtime environment that executes JavaScript code server-side.
- [Adonis.js](https://preview.adonisjs.com) - The Node.js Framework highly focused on building efficient, reliable and scalable server-side applications. 

## Authors

- **Felipe Barros** - *Initial work* - [kazordoon](https://github.com/kazordoon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

