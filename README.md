# What it shows
This app shows how to set up a GraphQL endpoint in minutes and further goes into authentication with FaunaDB without a backend and implements some simple queries with pagination. 

## Setup the project
The app comes with a script that creates all the security roles, collections, indexes and user defined functions to make this work. 
Take a peek in the scripts/setup.js script to see how this is setup. To get started, create a database and an Admin token on https://dashboard.fauna.com/, copy the token (you'll need it soon)
and run: 

`npm run setup`

The script will ask for the admin token, do not use the admin token for anything else than the setup script. 
Admin tokens are powerful and meant to manipulate all aspects of the database (create/drop collections/indexes/roles)
The script will give you a new token instead (a login token).
Copy the token and place it in a .env.local file:
`
REACT_APP_BOOTSTRAP_FAUNADB_KEY=<YOUR FAUNA LOGIN KEY>
`

## Run the project
This project has been created with create-react-app and therefore has all the same commands such as 
`npm start`

# Security notes:
FaunaDB's security roles are extremely flexible, in combination with User Defined Function is is possible to 
bootstrap the security. Start off with a token that can only call two User Defined Functions (like stored procedures) functions (register, login).
Once the user logs in, the token is swapped with a 'login token' which has access to view profiles. 

# Steps run the app

## Create a database
Log in to the FaunaDB [dashboard](https://dashboard.fauna.com/) and create a new database by clicking on *New Database*
Give it a name and click *Save*

## Import the schema
Setting up a GraphQL endpoint in FaunaDB is all about importing the schema which you can find in this repository under src/
The schema looks a follows: 

```
type Account {
  email: String! @unique
}

type Profile {
  name: String!
  icon: String!
  account: Account! @relation
  skills: [ Skill ! ] @relation
  projects: [ Project! ] @relation
}

type Project {
  name: String!
  profile: [ Profile! ] @relation
}

type Skill {
  profiles: [ Profile! ] @relation
  name: String!
}

type Query {
  allProfiles: [Profile!]
  accountsByEmail(email: String!): [Account!]!
  skillsByName(name: String!): [Skill!]!
}

type Mutation {
  register(email: String!, password: String!): Account! @resolver
  login(email: String!, password: String!): String! @resolver
}
```

Go to the GraphQL tab in the FaunaDB [dashboard](https://dashboard.fauna.com/) and click import schema and select the schema.gql file. 
You now have a GraphQL endpoint and should get a playground to play around with it. 
