import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';

import Post from './Post';
import PostModel from '../model/Post';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query interface for our blog',
  fields: {
    post: {
      type: Post,
      description: 'Query to get a single post',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (_, args) => PostModel.findOne({ _id: args.id }),
    },
    posts: {
      type: new GraphQLList(Post),
      description: 'Query to get all posts',
      args: {},
      resolve: () => PostModel.find(),
    },
  },
});

export default Query;
