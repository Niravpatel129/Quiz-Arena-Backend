const userIdsAllowedTriviaTuesday = ['6595bddf3871c3c0260be198', '456', '789'];

const getConfig = async (req, res) => {
  try {
    const userId = req?.userId;
    console.log('🚀  userId:', userId);

    let defaultQueueTime = Math.floor(Math.random() * 3) + 3;

    let updatedRequired = false;
    const version = req?.params?.version;
    let queueTime = defaultQueueTime;

    if (version) {
      queueTime = version === '54' ? 9999 : defaultQueueTime;
    }

    if (parseInt(version) < 24) {
      updatedRequired = true;
    }

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
