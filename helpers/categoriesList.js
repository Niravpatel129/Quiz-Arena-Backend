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
          'https://cdn.discordapp.com/attachments/587141454850424842/1192241998996967586/cropped_uploaded_flags_quiz_game_icon.png?ex=65a85ce3&is=6595e7e3&hm=d2106fe6f60b8ef09e35d458bf7144c98ecb6c0cd8c520033224380dbf3c8bec&',
      },
      {
        name: 'capitals',
        image:
          'https://cdn.discordapp.com/attachments/587141454850424842/1192241751793090672/cropped_uploaded_capitals_quiz_game_icon.png?ex=65a85ca8&is=6595e7a8&hm=c4baa5a443ff1911cfb46e348e7b8f395a2dca079e32194bb7dd68862d396282&',
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
      {
        name: 'pokemon gen 1',
        image:
          'https://cdn.discordapp.com/attachments/1085326974353952898/1197539162140721272/image.png?ex=65bba241&is=65a92d41&hm=78d464317f41b0e80ead5b7b4137f0d333c222f11ca06995666fc9b30e942b3d&',
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
      {
        name: 'the office',
        image:
          'https://cdn.discordapp.com/attachments/1085326974353952898/1197541908747124826/image.png?ex=65bba4d0&is=65a92fd0&hm=8f64291e599853f92947564571133a4c4d6a11fd7e72377cc5de5bd6d89d060a&',
      },
      {
        name: 'game of thrones',
        image:
          'https://cdn.discordapp.com/attachments/1085326974353952898/1197540183860584478/image.png?ex=65bba335&is=65a92e35&hm=b111d88515cfebb001d6031f8fa42853deb30eab007bdc248c4ef69d4734315f&',
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
      {
        name: 'one piece',
        image:
          'https://cdn.discordapp.com/attachments/1085326974353952898/1197541648188584017/image.png?ex=65bba492&is=65a92f92&hm=703a024ea075c2ce3e640352dbf1f86e33c3775708ddde2e9c95620ceb53ed61&',
      },
      {
        name: 'attack on titan',
        image:
          'https://cdn.discordapp.com/attachments/1085326974353952898/1197540466804146186/image.png?ex=65bba378&is=65a92e78&hm=2b10385f4d45807b9bfd42964a0a11b2a158bda0ecbd0d80016ff3af9c11c620&',
      },
    ],
  },
  {
    parentCategory: 'Sports',
    subCategories: [
      {
        name: 'Soccer',
        image:
          'https://cdn.discordapp.com/attachments/1085326974353952898/1197541291500773376/image.png?ex=65bba43d&is=65a92f3d&hm=b2b75cc6dd304393d9ffc156bb011601b00cfbc701a976f044190e4d51a136e4&',
      },
    ],
  },
  {
    parentCategory: 'science',
    subCategories: [
      {
        name: 'chemistry',
        image:
          'https://cdn.discordapp.com/attachments/587141454850424842/1193790325177729055/cropped_chemistry_icon.png?ex=65adfee1&is=659b89e1&hm=cee70804da547d0a26e1e9f305e3e94df01cdc6f8d4ff6c3915c590e0150b887&',
      },
    ],
  },
  {
    parentCategory: 'indian tv shows',
    subCategories: [
      {
        name: 'taarak mehta ka ooltah chashmah',
        image:
          'https://cdn.discordapp.com/attachments/1085326974353952898/1197541428100861972/image.png?ex=65bba45d&is=65a92f5d&hm=6e709d0e51688bacd4a60854b706453f03e4877d3b5155ba2038174271edbd03&',
      },
    ],
  },
];

module.exports = categories;
