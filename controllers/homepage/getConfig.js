const userIdsAllowedTriviaTuesday = [
  '6595bddf3871c3c0260be198',
  '65977a0767ddfcc07f94fae4',
  '65a281db0a28fced58f6e06d',
];

const getConfig = async (req, res) => {
  try {
    const userId = req?.userId;

    let defaultQueueTime = Math.floor(Math.random() * 3) + 3;

    let updatedRequired = false;
    const version = req?.params?.version;
    let queueTime = defaultQueueTime;

    if (version) {
      queueTime = version === '67' ? 9999 : defaultQueueTime;
    }

    // if (parseInt(version) <= 64) {
    //   updatedRequired = true;
    // }

    console.log('🚀  queueTime:', queueTime);
    const config = {
      queueTime: queueTime,
      updatedRequired: updatedRequired,
      triviaTuesdayEnabled: userIdsAllowedTriviaTuesday.includes(userId),
    };

    res.status(200).json(config);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getConfig;
