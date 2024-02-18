const Config = require('../../../../models/Config');

const getRoomId = async () => {
  const config = await Config.findOne({ configName: 'default' });

  return config.royaleGameId;
};

module.exports = getRoomId;
