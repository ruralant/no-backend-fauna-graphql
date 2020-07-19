const faunadb = require('faunadb')
const { CreateCollection } = faunadb.query

const createAccounts = CreateCollection({ name: 'accounts' })
const createProfiles = CreateCollection({ name: 'profiles' })

module.exports = { createAccounts, createProfiles }
