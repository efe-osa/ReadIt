import express, { static } from 'express';
import { join } from 'path';

const app = express();
const port = process.env.PORT || 9090;

app.use(static(join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(join(__dirname, 'build', 'index.html'));
});

app.listen(port);
// Log to feedback that this is actually running
// eslint-disable-next-line
console.log(`Server started on port ${port}`);
