# graphql-blog

This project uses GraphQL, Relay, Koa and Mongoose.
I use this for learning and document all process.

The _frontend_ is created with create-react-app and _backend_ with my [boilerplate](https://github.com/Bastiani/nodejs-boilerplate) but change express to koa.

Ok let's go!

## 1 - _frontend_ steps:

install:

* `npm i react-relay`
* `npm i --save-dev babel-plugin-relay relay-compiler`

Create file `.babelrc` and insert:

```
{
  "plugins": [
    "relay"
  ]
}
```

## 2 - _backend_ steps:

i change dependencies from my boilerplate to:

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

### 2.1 - Types

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

### 2.2 - [Relay](https://github.com/graphql/graphql-relay-js)

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

Create _Node.js_ file in _interface_ folder.

[Explanation of nodeDefinitions](https://stackoverflow.com/questions/42576581/what-is-nodeinterface-nodefield-and-nodedefinitions-in-relay)

Create _PostConnection.js_ file in _connection_ folder.
Create _PostMutation.js_ file in _mutation_ folder.

[Explanation of mutation](https://github.com/graphql/graphql-relay-js#mutations)

Alter _Post.js_ type, _Mutation.js_ and _Query.js_ for adaptating to Relay
