'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=server.js.map