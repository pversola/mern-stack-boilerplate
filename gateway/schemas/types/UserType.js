const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const getData = () => {
  axios({
    method: 'GET',
    url: 'http://localhost:8081/api/v1/users'
  }).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    role: { type: GraphQLString }
  },
  resolve: getData
});

module.exports = UserType;
