const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./types/UserType');
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signin: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return 'AuthService.login({ email, password, req })';
      }
    }
  }
});

module.exports = mutation;
