import { GraphQLObjectType, GraphQLString } from 'graphql';

import Post from './Post';
import PostModel from '../model/Post';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation interface for our blog',
  fields: {
    createPost: {
      type: Post,
      args: {
        title: {
          type: GraphQLString,
          description: 'Title of the post',
        },
        content: {
          type: GraphQLString,
          description: 'Content of the post',
        },
      },
      resolve: (_, args) => PostModel({ title: args.title, content: args.content }).save(),
    },
  },
});

export default Mutation;
