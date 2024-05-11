const categories = [
  {
    parentCategory: 'Recently Added',
    subCategories: [
      // {
      //   name: 'sports logos',
      //   logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948894/quiz%20arena/v7g7bc0ulyztwrcvg5hl.png',
      // },
      {
        name: 'prehistoric facts',
        logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948892/quiz%20arena/z0rvwxzjkc7exac2s6e7.png',
      },
      {
        name: 'logos 2',
        logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948892/quiz%20arena/bjw19wqus3abc5rywx0q.png',
      },
      {
        name: 'riddles',
        logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948888/quiz%20arena/jlxu7miwrqvuflarshcw.png',
      },
      {
        name: 'animals',
        logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948889/quiz%20arena/kbbs27xl0bvoihqnr0tq.png',
      },
      // {
      //   name: 'dogs',
      //   logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948888/quiz%20arena/xtgzg7lnfowuzrqtsrdk.png',
      // },
      {
        name: 'prehistoric animals',
        logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948895/quiz%20arena/mye1vsz0hefhcavf66nt.png',
      },
      {
        name: 'paintings',
        logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948888/quiz%20arena/hbinw3vffjhvgavrcgb5.webp',
      },
    ],
  },
  {
    parentCategory: 'general knowledge',
    subCategories: [
      {
        name: 'logos',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/logos_qh9zpj.png',
      },
      {
        name: 'flags',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185881/flags_gfi0cy.png',
      },
      {
        name: 'capitals',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185881/capitals_oniocz.jpg',
      },
      {
        name: 'landmarks',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/landmarks_jhdyyi.png',
      },
      {
        name: 'general knowledge',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/general_knowledge_jcc7vv.png',
      },
      // Added from the original list
      {
        name: 'us geography',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/us_geography_zdgypn.jpg',
      },
      {
        name: 'world war 1',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185886/world_war_1_pjbuxr.jpg',
      },
    ],
  },
  {
    parentCategory: 'Facts & Wonders',
    subCategories: [
      {
        name: 'size comparison',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/size_comparison_t1jjtx.png',
      },
      {
        name: 'history of internet',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709186836/history_of_internet_rvioue.jpg',
      },
      {
        name: 'baby animals',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185880/baby_animals_gfxuc3.webp',
      },
      {
        name: 'what happened first',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185886/what_happened_first_bh5uxo.webp',
      },
    ],
  },
  {
    parentCategory: 'games',
    subCategories: [
      {
        name: 'valorant',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185886/valorant_a0hkly.png',
      },
      {
        name: 'league of legends',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/league_of_legends_ann8e4.jpg',
      },
      {
        name: 'overwatch',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/overwatch_oawxt0.png',
      },
      {
        name: 'pokemon gen 1',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/pokemon_gen_1_n1zpjf.png',
      },
    ],
  },
  {
    parentCategory: 'tv shows',
    subCategories: [
      {
        name: 'friends',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/friends_th8rcz.png',
      },
      {
        name: 'the office',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/the_office_p6thrp.png',
      },
      {
        name: 'game of thrones',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/game_of_thrones_nuvypy.png',
      },
      // Added from the original list
      {
        name: 'british sitcoms',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185881/british_sitcoms_bo2quy.jpg',
      },
      {
        name: 'soap opera',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/soap_opera_ulgepq.jpg',
      },
      // {
      //   name: 'The Simpsons',
      //   logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819065280106577/the_simpsons.jpg?ex=65e84ece&is=65d5d9ce&hm=4d69535d8c6f87b4b057a2036cc0d5850b8be947926f1dbb5b65053809729138&',
      // },
    ],
  },
  {
    parentCategory: 'anime',
    subCategories: [
      {
        name: 'naruto',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/naruto_bja7hq.png',
      },
      {
        name: 'one piece',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/one_piece_trlxxu.png',
      },
      {
        name: 'attack on titan',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185880/attack_on_titan_tv9w4u.png',
      },
      {
        name: 'hunter x hunter',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/hunter_x_hunter_dqlo01.jpg',
      },
      {
        name: 'dragon ball series',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185881/dragon_ball_series_scs2cm.jpg',
      },
    ],
  },
  {
    parentCategory: 'Sports',
    subCategories: [
      {
        name: 'soccer',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/soccer_uwpfur.png',
      },
      {
        name: 'tennis',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709499691/sportive-woman-holding-tennis-racket-with-ball_i1kvyb.jpg',
      },
      {
        name: 'cricket',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185881/cricket_wypcmn.png',
      },
      {
        name: 'basketball',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185880/basketball_qxxbug.png',
      },
      // Added from the original list
      {
        name: 'formula 1',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/formula_1_szyqw9.png',
      },
      {
        name: 'golf',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/golf_akrvsh.jpg',
      },
      {
        name: 'horse racing',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/horse_racing_pyo0db.jpg',
      },
      {
        name: 'nascar',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/nascar_cmmiqe.jpg',
      },
      {
        name: 'rugby league',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/rugby_league_fcjh8u.jpg',
      },
      {
        name: 'winter sports',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185886/winter_sports_af3sem.jpg',
      },
      {
        name: 'world cup',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/soccer_uwpfur.png',
      },
      {
        name: 'liverpool football club',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/liverpool_football_club_fisxkv.jpg',
      },
      {
        name: 'golden state warriors',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/golden_state_warriors_i4gnyp.png',
      },
      {
        name: 'champions league',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709186269/champions_league_sntxow.jpg',
      },
    ],
  },
  {
    parentCategory: 'science',
    subCategories: [
      {
        name: 'chemistry',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185881/chemistry_iy1odv.png',
      },
      {
        name: 'biology',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185880/biology_z0udaj.png',
      },
      {
        name: 'mathematics',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/mathematics_zrhlci.png',
      },
      {
        name: 'physics',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/physics_mdqyzw.png',
      },
      {
        name: 'scientists',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/scientists_ha3ttu.png',
      },
      {
        name: 'psychology',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/psychology_fu6dle.jpg',
      },
      // Added from the original list
      {
        name: 'science general',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/mental_math_vexp07.jpg',
      },
      // {
      //   name: 'mental math',
      //   logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818995444813924/mental_math.jpg?ex=65e84ebd&is=65d5d9bd&hm=141caf86069ad68b1a6ca1649e9fb9c253d54096cda9477d5be9474992d1b31d&',
      // },
    ],
  },
  {
    parentCategory: 'nature & universe',
    subCategories: [
      {
        name: 'space',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/space_ljwrbk.png',
      },
      // Added from the original list
      {
        name: 'solar system',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185885/solar_system_lnxvkp.jpg',
      },
    ],
  },
  {
    parentCategory: 'movies',
    subCategories: [
      {
        name: 'harry potter',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/harry_potter_b9jiyu.png',
      },

      // Added from the original list
      {
        name: 'disney',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185881/disney_jn9fm2.jpg',
      },
      {
        name: 'movies since 2010',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185884/movies_since_2010_n3wpaa.jpg',
      },
      {
        name: 'james bond',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/james_bond_m0iuqf.jpg',
      },
      {
        name: 'movie quotes',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185883/movie_quotes_cgyiil.jpg',
      },
      {
        name: 'british films',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185880/british_films_oqffll.jpg',
      },
      {
        name: 'hunger games',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185882/hunger_games_gaivxp.jpg',
      },
    ],
  },
  {
    parentCategory: 'indian tv shows',
    subCategories: [
      {
        name: 'taarak mehta ka ooltah chashmah',
        logo: 'https://res.cloudinary.com/dwu4qop1o/image/upload/v1709185886/tmkoc_ltzfkl.jpg',
      },
    ],
  },
];

module.exports = categories;
