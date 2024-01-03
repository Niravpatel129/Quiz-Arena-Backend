const getQuestionList = async (req, res) => {
  try {
    const categories = [
      {
        parentCategory: 'general knowledge',
        subCategories: ['logos', 'flags', 'capitals', 'general knowledge'],
      },
      {
        parentCategory: 'games',
        subCategories: ['valorant', 'league of legends', 'overwatch'],
      },

      {
        parentCategory: 'tv shows',
        subCategories: ['friends'],
      },

      {
        parentCategory: 'anime',
        subCategories: ['naruto'],
      },
      {
        parentCategory: 'movies',
        subCategories: ['star wars'],
      },
    ];

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getQuestionList;
