const faunadb = require('faunadb')
const { CreateRole, Collection, Index } = faunadb.query

const createFnRoleRegister = CreateRole({
  name: 'functionrole_register',
  privileges: [
    {
      resource: Collection('Account'),
      actions: { create: true } 
    }
  ]
})

const createFnRoleLogin = CreateRole({
  name: 'functionrole_login',
  privileges: [
    {
      resource: Index('accountsByEmail'),
      actions: { read: true }
    },
    {
      resource: Collection('Account'),
      actions: { read: true }
    }
  ]
})

const createBootstrapRole = CreateRole({
  name: 'keyrole_calludfs',
  privileges: [
    {
      resource: faunadb.query.Function('login'),
      actions: {
        call: true
      }
    },
    {
      resource: faunadb.query.Function('register'),
      actions: {
        call: true
      }
    }
  ]
})

const createLoggedInRole = CreateRole({
  name: 'membershiprole_loggedin',
  privileges: [
    {
      resource: Collection('Profile'),
      actions: { read: true }
    },
    {
      resource: Collection('Project'),
      actions: { read: true }
    },
    {
      resource: Collection('Skill'),
      actions: { read: true }
    },
    {
      resource: Collection('profile_projects'),
      actions: { read: true }
    },
    {
      resource: Collection('profile_skills'),
      actions: { read: true }
    },
    {
      resource: Index('allProfiles'),
      actions: { read: true }
    },
    {
      resource: Index('profile_projects_by_profile'),
      actions: { read: true }
    },
    {
      resource: Index('profile_projects_by_profile_and_project'),
      actions: { read: true }
    },
    {
      resource: Index('profile_projects_by_project'),
      actions: { read: true }
    },
    {
      resource: Index('profile_skills_by_profile'),
      actions: { read: true }
    },
    {
      resource: Index('profile_skills_by_profile_and_skill'),
      actions: { read: true }
    },
    {
      resource: Index('profile_skills_by_skill'),
      actions: { read: true }
    },
    {
      resource: Index('skillsByName'),
      actions: { read: true }
    },
    {
      resource: Index('unique_Account_email'),
      actions: { read: true }
    }
  ],
  membership: [{ resource: Collection('Account') }]
})

module.exports = { createFnRoleRegister, createFnRoleLogin, createBootstrapRole, createLoggedInRole }
