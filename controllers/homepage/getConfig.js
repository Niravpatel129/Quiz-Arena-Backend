const getConfig = async (req, res) => {
  try {
    const version = req?.params?.version;
    let queueTime = Math.floor(Math.random() * 10) + 10;

    if (version) {
      queueTime = version === '8' ? 15 : Math.floor(Math.random() * 10) + 10;
    }

    console.log('🚀  config.queueTime:', config.queueTime);
    const config = {
      queueTime: queueTime,
    };

    res.status(200).json(config);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getConfig;
