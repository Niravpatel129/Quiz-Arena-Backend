const getConfig = async (req, res) => {
  try {
    const config = {
      queueTime: 999999,
    };

    res.status(200).json(config);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getConfig;
