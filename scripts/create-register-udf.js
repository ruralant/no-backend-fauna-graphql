const faunadb = require('faunadb')
const { CreateFunction, Create, Query, Lambda, Var, Role, Collection } = faunadb.query

const registerLambda = Lambda(
  ['email', 'password'],
  Create(Collection('Account'), {
    credentials: { password: Var('password') },
    data: { email: Var('email') }
  })
)

const createRegisterUDF = CreateFunction({
  name: 'register',
  body: Query(registerLambda),
  role: Role('functionrole_register')
})

module.exports = { createRegisterUDF, registerLambda }
