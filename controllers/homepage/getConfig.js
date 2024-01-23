const getConfig = async (req, res) => {
  try {
    let updatedRequired = false;
    const version = req?.params?.version;
    let queueTime = Math.floor(Math.random() * 10) + 10;

    // if (version) {
    //   queueTime = version === '27' ? 9999 : Math.floor(Math.random() * 10) + 10;
    // }

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
