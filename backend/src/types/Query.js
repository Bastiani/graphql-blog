import { GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay';

import PostModel from '../model/Post';
import { NodeField } from '../interface/Node';
import PostConnection from '../connection/PostConnection';

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    allPosts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(PostModel.find(), args),
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
      args: {},
      resolve: () => 'viewer-fixed',
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query interface for our blog',
  fields: {
    node: NodeField,
    viewer: {
      name: 'Viewer',
      description: 'Viewer pattern implementation',
      type: new GraphQLNonNull(Viewer),
      resolve: () => ({}),
    },
  },
});

export default Query;
