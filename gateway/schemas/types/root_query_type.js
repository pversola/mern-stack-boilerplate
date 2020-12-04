const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLList } = graphql;

const UserType = require('../types/UserType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return axios
          .get(`${process.env.API_URI}/api/v1/users`)
          .then((resp) => resp.data);
      }
    }
  }
});

module.exports = RootQueryType;
