const getQuestionList = async (req, res) => {
  try {
    const categories = [
      {
        parentCategory: 'general knowledge',
        subCategories: [
          {
            name: 'logos',
            image:
              'https://cdn.discordapp.com/attachments/587141454850424842/1192237145465831484/cropped_logos_quiz_game_icon.png?ex=65a8585e&is=6595e35e&hm=c91398b322488841ebf3c1a8b324cad5732bf381fefda7356d2ea5911e680fe9&',
          },
          {
            name: 'flags',
            image:
              'https://cdn.dribbble.com/userupload/9424324/file/original-6e071eda3550f1a2c8fe70792dc31d7e.png?resize=400x0',
          },
          {
            name: 'capitals',
            image:
              'https://cdn.dribbble.com/userupload/9424324/file/original-6e071eda3550f1a2c8fe70792dc31d7e.png?resize=400x0',
          },
          {
            name: 'general knowledge',
            image:
              'https://cdn.discordapp.com/attachments/587141454850424842/1192241394820075550/cropped_general_knowledge_quiz_game_icon.png?ex=65a85c53&is=6595e753&hm=ca891e595bf7e50066fd4ec43e501048fbc10be15ffe61439200541e52c49561&',
          },
        ],
      },
      {
        parentCategory: 'games',
        subCategories: [
          {
            name: 'valorant',
            image:
              'https://cdn.discordapp.com/attachments/587141454850424842/1192237320095678604/cropped_fps_game_quiz_game_icon.png?ex=65a85887&is=6595e387&hm=23ec5735fef62edec5690f8aa04e6c1a27c14ff1fe003a4c27273b7082317399&',
          },
          {
            name: 'league of legends',
            image:
              'https://cdn.discordapp.com/attachments/587141454850424842/1192238873535848468/cropped_uploaded_league_quiz_game_icon.png?ex=65a859fa&is=6595e4fa&hm=c4f26cbbb3fcf673bbe1825065b4ba61873f69f4f1dbf74dd9b18cca4528d536&',
          },
          {
            name: 'overwatch',
            image:
              'https://cdn.discordapp.com/attachments/587141454850424842/1192237997270249634/cropped_moba_game_quiz_game_icon.png?ex=65a85929&is=6595e429&hm=ea642370f3af75cb92c48a81c6cffd0ec0cb2e2661022441c4d3c1810284e97d&',
          },
        ],
      },

      {
        parentCategory: 'tv shows',
        subCategories: [
          {
            name: 'friends',
            image:
              'https://cdn.discordapp.com/attachments/587141454850424842/1192237717585678519/cropped_tv_show_quiz_game_icon.png?ex=65a858e6&is=6595e3e6&hm=cedd0a196de5088b855872ccb1cb00897038068b702caa861bc4bbc9fec7cbe4&',
          },
        ],
      },

      {
        parentCategory: 'anime',
        subCategories: [
          {
            name: 'naruto',
            image:
              'https://cdn.discordapp.com/attachments/587141454850424842/1192236779743494236/cropped_quiz_game_icon.png?ex=65a85806&is=6595e306&hm=65622e402d1c1ea48b0f164216a8f29d010877049409a7fc9e128fb39070d043&',
          },
        ],
      },
      {
        parentCategory: 'movies',
        subCategories: [
          {
            name: 'star wars',
            image:
              'https://cdn.dribbble.com/userupload/9424324/file/original-6e071eda3550f1a2c8fe70792dc31d7e.png?resize=400x0',
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
