import { connectionDefinitions } from 'graphql-relay';

import Post from '../types/Post';

// connectionDefinitions returns a connectionType and its associated edgeType, given a node type.
export default connectionDefinitions({
  name: 'Post',
  nodeType: Post,
});
