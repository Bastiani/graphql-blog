# graphql-blog

[REST APIs are REST-in-Peace APIs. Long Live GraphQL](https://medium.freecodecamp.org/rest-apis-are-rest-in-peace-apis-long-live-graphql-d412e559d8e4)

This project uses GraphQL, Relay, Koa and Mongoose.

**I use this for learning and document all process.**

**Note: While I was doing this project the documentation of the relay changed, soon the links may be outdated, please open issue case if something is wrong**

The _frontend_ is created with create-react-app and _backend_ with my [boilerplate](https://github.com/Bastiani/nodejs-boilerplate) but change express to koa.

Ok let's go!

## 1 - _backend_ steps:

I change dependencies from my boilerplate to:

```
"dependencies": {
  "koa": "^2.4.1",
  "koa-graphql": "^0.7.3",
  "koa-router": "^7.3.0",
  "mongoose": "^5.0.0-rc0"
}
```

Now install `npm i graphql`

Create these folders in src:

```
|-- /src/
    |-- /types/
    |-- /model/
```

Start creating new file in _model_ folder calling [Post.js](https://github.com/Bastiani/graphql-blog/commit/bfd2fce196de37e8cd40db1f44786d1e749635e1#diff-c03e3499a8803603a49b494808cdebfc)

Now create [Post.js](https://github.com/Bastiani/graphql-blog/commit/bfd2fce196de37e8cd40db1f44786d1e749635e1#diff-58aca297af800fe781e3fdb3b142c5e7) in a folder _types_

### 1.1 - Types

* Documentation for [Types and Schemas](http://graphql.org/learn/schema/)

* GraphQL-JS documentation for this implementation of types [Type API Reference](http://graphql.org/graphql-js/type/)

`const Post = new GraphQLObjectType` [GraphQLObjectType](http://graphql.org/graphql-js/type/#graphqlobjecttype)

Create [Query.js](https://github.com/Bastiani/graphql-blog/commit/c0e9f643d713ec3fbfe070279df4e5ce1386d8f2#diff-49f7a27537317722592284f11a359c93), query definition is similar to Post type, but the difference is that fields contains all queries and receive args.

The same for [Mutation.js](https://github.com/Bastiani/graphql-blog/commit/c0e9f643d713ec3fbfe070279df4e5ce1386d8f2#diff-7243d2b3f50d4a6d0dc47097f7fddddd)

At this point you now start the server `npm start nodemon` on folder _backend_ and test mutation and query in `http://localhost:5000/graphql`

```
mutation createPostMutation {
  createPost(title: "Post Title 1", content: "Post Content 1") {
    id
    title
    content
  }
}
```

```
query Query {
  posts {
    id
    title
    content
  }
}
```

### 1.2 - [Relay](https://github.com/graphql/graphql-relay-js)

> A basic understanding of [GraphQL](http://graphql.org/learn/) and of the [GraphQL.js](https://github.com/graphql/graphql-js) implementation is needed to provide context for this library.

[Understading cursor-based pagination in GraphQL](http://graphql.org/learn/pagination/)

[Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm#)

[Node Interface](https://facebook.github.io/relay/graphql/objectidentification.htm)

`npm i graphql-relay`

Create _interface_, _connection_ and _mutation_ folder:

```
|-- /src/
    |-- /mutation/
    |-- /connection/
    |-- /interface/
    |-- /types/
    |-- /model/
```

Create [_Node.js_](https://github.com/Bastiani/graphql-blog/commit/2a19140be5dc1c46f75c8bf45927e8cd32683771#diff-be755561d175ec24fcc98d6920a243c6) file in _interface_ folder.

[Explanation of nodeDefinitions](https://stackoverflow.com/questions/42576581/what-is-nodeinterface-nodefield-and-nodedefinitions-in-relay)

Create [_PostConnection.js_](https://github.com/Bastiani/graphql-blog/commit/2a19140be5dc1c46f75c8bf45927e8cd32683771#diff-c3e45187de3deca2b1cf20119a682ab7) file in _connection_ folder.

Create [_PostMutation.js_](https://github.com/Bastiani/graphql-blog/commit/2a19140be5dc1c46f75c8bf45927e8cd32683771#diff-0e986dc1894e8d7e1a52003e736d02bc) file in _mutation_ folder.

[Explanation of mutation](https://github.com/graphql/graphql-relay-js#mutations)

Alter [_Post.js_](https://github.com/Bastiani/graphql-blog/commit/2a19140be5dc1c46f75c8bf45927e8cd32683771#diff-58aca297af800fe781e3fdb3b142c5e7) type, [_Mutation.js_](https://github.com/Bastiani/graphql-blog/commit/2a19140be5dc1c46f75c8bf45927e8cd32683771#diff-7243d2b3f50d4a6d0dc47097f7fddddd) and [_Query.js_](https://github.com/Bastiani/graphql-blog/commit/2a19140be5dc1c46f75c8bf45927e8cd32683771#diff-49f7a27537317722592284f11a359c93) for adaptation to Relay

Test your new GraphQL, Relay server `http://localhost:5000/graphql`

```
mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      id
      title
    }
  }
}
```

Query variables for createPost:

```
{
  "input": {
    "title": "New post with Relay!",
    "content": "New post with Relay, content!"
  }
}
```

```
query allPosts {
  posts {
    edges {
      node {
        id
        title
        content
      }
    }
  }
}
```

Changes to the frontend Relay Modern:

* _Query.js_

## 2 - _frontend_ steps:

**Note 1: For not eject this project I chose follow this tutorial** [I use option 3](https://hackernoon.com/using-create-react-app-with-relay-modern-989c078fa892)

**Note 2: For that option to work properly I needed to use yarn in place of npm, I do not know why, but it worked.**

install:

* `yarn add relay-runtime react-relay react-modal react-router-dom`
* `yarn add relay-compiler babel-plugin-relay --dev`
* `yarn global add get-graphql-schema`

Create file `.babelrc` and insert:

```
{
  "plugins": [
    "relay"
  ]
}
```

Run this command in frontend folder with backend running `get-graphql-schema http://localhost:5000/graphql > src/schema.graphql`

Alter _index.js_:

* [More about React Router v4](https://medium.com/@bastiani/react-router-4-e6c608deb88c)
* [BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter)
* [Switch](https://reacttraining.com/react-router/web/api/Switch)

Alter _App.js_:

* [query-renderer](https://facebook.github.io/relay/docs/en/query-renderer.html)

Create _Environment.js_:

* [relay-environment](https://facebook.github.io/relay/docs/en/relay-environment.html)
* [network-layer](https://facebook.github.io/relay/docs/en/network-layer.html)

Create folders:

```
|-- /src/
    |-- /mutations/
    |-- /components/
```

In _mutations_ folder, create file _CreatePostMutation.js_:

* [mutations, updater and optimisticUpdater](https://facebook.github.io/relay/docs/en/mutations.html#using-updater-and-optimisticupdater)

In _components_ folder, create:

* _Post.js_
  [fragment-container](https://facebook.github.io/relay/docs/en/fragment-container.html)
* _ListPage.js_
* _CreatePost.js_

Run this in frontend folder `./node_modules/.bin/relay-compiler --src ./src/ --schema ./src/schema.graphql`

Run `yarn start` and test!
