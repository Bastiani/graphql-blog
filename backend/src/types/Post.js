import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { NodeInterface } from '../interface/Node';

export default new GraphQLObjectType({
  name: 'Post',
  description: 'Post type definition',
  fields: {
    id: globalIdField('Post'),
    _id: {
      type: GraphQLString,
      // eslint-disable-next-line
      resolve: post => post._id,
    },
    title: {
      type: GraphQLString,
      description: 'Title of the post',
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      description: 'Content of the post',
      resolve: post => post.content,
    },
  },
  interfaces: () => [NodeInterface],
});
