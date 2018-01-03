import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import PostModel from '../model/Post';
import Post from '../types/Post';

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Post') {
      return PostModel.findOne({ _id: id });
    }
    return null;
  },
  (object) => {
    if (object.title) {
      console.log(typeof object);
      return Post;
    }
    return null;
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
