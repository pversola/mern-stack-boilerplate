const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    salt: { type: GraphQLString }
  })
});

module.exports = UserType;
