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

Start creating new file in _model_ folder calling [Post.js](https://github.com/Bastiani/graphql-blog/blob/master/backend/src/model/Post.js)

Now create [Post.js](https://github.com/Bastiani/graphql-blog/blob/master/backend/src/types/Post.js) in a folder _types_

### 2.1 - Types

* Documentation for [Types and Schemas](http://graphql.org/learn/schema/)

* GraphQL-JS documentation for this implementation of types [Type API Reference](http://graphql.org/graphql-js/type/)

`const Post = new GraphQLObjectType` [GraphQLObjectType](http://graphql.org/graphql-js/type/#graphqlobjecttype)
