import { app } from './app';
import 'dotenv/config';

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});
