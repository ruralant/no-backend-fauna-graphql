const faunadb = require('faunadb')
const { CreateIndex, Collection } = faunadb.query

const createIndexAccountsByEmail = CreateIndex({
  name: 'accounts_by_email',
  source: Collection('Account'),
  terms: [
    {
      field: ['data', 'email']
    }
  ],
  values: [],
  unique: true
})

const createDefaultProfilesIndex = CreateIndex({
  name: 'all_profiles',
  source: Collection('profiles'),
  terms: [],
  values: []
})

module.exports = { createIndexAccountsByEmail, createDefaultProfilesIndex }
