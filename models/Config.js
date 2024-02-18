const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  configName: {
    type: String,
    default: 'default',
  },
  royaleGameId: {
    type: String,
    required: true,
  },
});

const Config = mongoose.model('Config', ConfigSchema);

module.exports = Config;
