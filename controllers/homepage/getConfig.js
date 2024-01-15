const getConfig = async (req, res) => {
  try {
    const version = req?.params?.version;
    let queueTime = Math.floor(Math.random() * 15) + 15;

    if (version) {
      queueTime = version === '7' ? 99999 : Math.floor(Math.random() * 35) + 15;
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
