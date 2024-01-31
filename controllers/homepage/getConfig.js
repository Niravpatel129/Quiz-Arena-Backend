const getConfig = async (req, res) => {
  try {
    let defaultQueueTime = Math.floor(Math.random() * 4) + 3;

    let updatedRequired = false;
    const version = req?.params?.version;
    let queueTime = defaultQueueTime;

    if (version) {
      queueTime = version === '37' ? 9999 : defaultQueueTime;
    }

    if (parseInt(version) < 24) {
      updatedRequired = true;
    }

    console.log('🚀  queueTime:', queueTime);
    const config = {
      queueTime: queueTime,
      updatedRequired: updatedRequired,
    };

    res.status(200).json(config);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getConfig;
