const getQuestionList = async (req, res) => {
  try {
    const categories = [
      {
        parentCategory: 'general knowledge',
        subCategories: [
          {
            name: 'logos',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/logos.png',
          },
          {
            name: 'flags',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/flags.png',
          },
          {
            name: 'capitals',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/capitals.png',
          },
          {
            name: 'general knowledge',
            image:
              'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/general-knowledge.png',
          },
        ],
      },
      {
        parentCategory: 'games',
        subCategories: [
          {
            name: 'valorant',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/valorant.png',
          },
          {
            name: 'league of legends',
            image:
              'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/league-of-legends.png',
          },
          {
            name: 'overwatch',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/overwatch.png',
          },
        ],
      },

      {
        parentCategory: 'tv shows',
        subCategories: [
          {
            name: 'friends',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/friends.png',
          },
        ],
      },

      {
        parentCategory: 'anime',
        subCategories: [
          {
            name: 'naruto',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/naruto.png',
          },
        ],
      },
      {
        parentCategory: 'movies',
        subCategories: [
          {
            name: 'star wars',
            image: 'https://res.cloudinary.com/dh41vh9dx/image/upload/v1616909917/star-wars.png',
          },
        ],
      },
    ];

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getQuestionList;
