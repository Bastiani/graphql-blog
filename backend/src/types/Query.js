import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay';

import Post from './Post';
import PostModel from '../model/Post';
import { NodeField } from '../interface/Node';
import PostConnection from '../connection/PostConnection';

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query interface for our blog',
  fields: {
    node: NodeField,
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
      type: PostConnection.connectionType,
      description: 'Query to get all posts',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(PostModel.find(), args),
    },
  },
});

export default Query;
