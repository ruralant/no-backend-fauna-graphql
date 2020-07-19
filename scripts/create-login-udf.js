const faunadb = require('faunadb')
const { CreateFunction, Query, Lambda, Login, Match, Index, Var, Get, Select, Role, Let } = faunadb.query

const loginLambda = Lambda(
  ['email', 'password'],
  Select(
    ['secret'],
    Login(Match(Index('accountsByEmail'), Var('email')), { password: Var('password') })
  )
)

const createLoginUDF = CreateFunction({
  name: 'login',
  body: Query(loginLambda),
  role: Role('functionrole_login')
})

module.exports = { createLoginUDF, loginLambda }
