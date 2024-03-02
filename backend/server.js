const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
