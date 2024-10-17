import { PORT } from './config.js';
import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
