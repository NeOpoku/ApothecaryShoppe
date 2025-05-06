import express from 'express';
import mongoose from 'mongoose';
import herbRoutes from './routes/herbs';


const app = express();

app.use(express.json());


mongoose.connect('mongodb://localhost/apothecary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);


app.use('/api/herbs', herbRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});