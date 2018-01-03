import { GraphQLObjectType } from 'graphql';

import PostMutation from '../mutation/PostMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation interface for our blog',
  fields: {
    createPost: PostMutation,
  },
});
