const getConfig = async (req, res) => {
  try {
    const version = req?.params?.version;
    let queueTime = Math.floor(Math.random() * 10) + 10;
    console.log('🚀  queueTime:', queueTime);

    if (version) {
      queueTime = version === '10' ? 9999 : Math.floor(Math.random() * 10) + 10;
    }

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
