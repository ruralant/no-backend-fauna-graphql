const faunadb = require('faunadb')
const { CreateKey, Role } = faunadb.query

const createBootstrapKey = CreateKey({
  role: Role('keyrole_calludfs')
})

module.exports = { createBootstrapKey }
