import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import Post from '../types/Post';
import PostModel from '../model/Post';

export default mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    post: {
      type: Post,
      resolve: ({ post }) => post,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
  mutateAndGetPayload: async ({ title, content }) => {
    try {
      const post = await PostModel({ title, content }).save();
      return { post };
    } catch (error) {
      return { error };
    }
  },
});
