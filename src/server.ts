import env from './config/env';
import app from './app';

app.listen(env.port, () => {
  console.log(`NexaLab API listening on http://localhost:${env.port}`);
});
