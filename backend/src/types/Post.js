import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Post type definition',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the post',
      resolve: post => post.id,
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
});

export default Post;
