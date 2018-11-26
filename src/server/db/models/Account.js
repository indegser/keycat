import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  // name: 'string',
  // blockchain: 'string',
  pin: 'number',
  privateKey: 'string',
});

export default mongoose.model('Account', schema);
