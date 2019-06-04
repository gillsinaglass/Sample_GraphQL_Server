const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

//Seed Data
const customers = [
  {id: '1', name: 'Ryan Gill', email: 'ryangill@hello.com', age: 35},
  {id: '2', name: 'Sarah Gill', email: 'Sarahgill@hello.com', age: 43},
  {id: '3', name: 'Mike Ill', email: 'Mikeill@hello.com', age: 54},
]

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields:() => ({
    id: {type:GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer:{
      type:CustomerType,
      args: {
        id:{type:GraphQLString}
      },
      resolve(parentValue, args){
        for(let i = 0; i < customers.length;i++){
          if(customers[i].id == args.id){
            return customers[i];
          }
        }
      }
    }
  }});

module.exports = new GraphQLSchema({
  query: RootQuery
})
