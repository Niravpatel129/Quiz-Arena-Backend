const getQuestionList = async (req, res) => {
  try {
    const categories = [
      {
        parentCategory: 'games',
        subCategories: ['valorant', 'league of legends', 'overwatch'],
      },
      {
        parentCategory: 'movies',
        subCategories: ['star wars'],
      },
      {
        parentCategory: 'anime',
        subCategories: ['naruto'],
      },
      {
        parentCategory: 'general knowledge',
        subCategories: ['logos', 'flags', 'capitals', 'general knowledge'],
      },
      {
        parentCategory: 'tv shows',
        subCategories: ['friends'],
      },
    ];

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getQuestionList;
