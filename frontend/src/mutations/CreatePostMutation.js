// https://facebook.github.io/relay/docs/en/mutations.html#using-updater-and-optimisticupdater

import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        title
        content
      }
    }
  }
`;

function sharedUpdater(store, user, newEdge) {
  // Get the current user record from the store
  const userProxy = store.get(user.id);

  // Get the user's Post List using ConnectionHandler helper
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'ListPage_allPosts', // This is the connection identifier, defined here: https://github.com/relayjs/relay-examples/blob/master/todo/js/components/PostList.js#L68
  );

  // Insert the new post into the Post List connection
  if (conn) {
    ConnectionHandler.insertEdgeAfter(conn, newEdge);
  }
}

let tempID = 0;

export default (environment, title, content, user, callback) =>
  commitMutation(environment, {
    mutation,
    variables: {
      input: {
        title,
        content,
        // eslint-disable-next-line
        clientMutationId: tempID++,
      },
    },
    updater: (store) => {
      // Get the payload returned from the server
      const payload = store.getRootField('createPost');

      // Get the edge of the newly created todo item
      const newEdge = payload.getLinkedRecord('post');

      // Add it to the user's todo list
      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      // Create a Post Item record in our store with a tempory ID
      // eslint-disable-next-line
      const id = `client:newPost:${tempID++}`;
      const node = store.create(id, 'Post');
      node.setValue(id, 'id');
      node.setValue(title, 'title');
      node.setValue(content, 'content');

      // Create a new edge that contains the newly created Post Item
      // eslint-disable-next-line
      const newEdge = store.create(`client:newEdge:${tempID++}`, 'PostEdge');
      newEdge.setLinkedRecord(node, 'node');

      // Add it to the user's todo list
      sharedUpdater(store, user, newEdge);

      // Given that we don't have a server response here,
      // we also need to update the todo item count on the user
      const userRecord = store.get(user.id);
      userRecord.setValue(userRecord.getValue('totalCount') + 1, 'totalCount');
    },
    onCompleted: () => {
      callback();
    },
    onError: err => console.error(err),
  });
