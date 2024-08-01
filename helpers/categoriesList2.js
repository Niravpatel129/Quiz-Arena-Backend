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
      // {
      //   name: 'logos 2',
      //   logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948892/quiz%20arena/bjw19wqus3abc5rywx0q.png',
      // },
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
      // {
      //   name: 'sports logos',
      //   logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948894/quiz%20arena/v7g7bc0ulyztwrcvg5hl.png',
      // },
      {
        name: 'prehistoric facts',
        logo: 'https://res.cloudinary.com/ddassnfo8/image/upload/v1713948892/quiz%20arena/z0rvwxzjkc7exac2s6e7.png',
      },
      // {
      //   name: "logos 2",
      //   logo: "https://res.cloudinary.com/ddassnfo8/image/upload/v1713948892/quiz%20arena/bjw19wqus3abc5rywx0q.png",
      // },
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
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Flogos-1.jpg?alt=media&token=e6c42c4b-4239-4904-aad4-672498dabb4e',
      },
      {
        name: 'flags',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fflags.jpg?alt=media&token=7bd84900-9699-4915-bd2b-73da403e60cd',
      },
      {
        name: 'capitals',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fcapital-citys.jpg?alt=media&token=adcfe900-2e7d-40cb-9085-c90d9c567fd3',
      },
      {
        name: 'landmarks',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Flandmarks.jpg?alt=media&token=dd57bb24-fa3a-47dd-8320-059903af8f78',
      },
      {
        name: 'general knowledge',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fgeneral-knowledge.jpg?alt=media&token=f504f732-f6ae-433a-ae70-4d6266a449e9',
      },
      // Added from the original list
      {
        name: 'us geography',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fus-geography.jpg?alt=media&token=5ce4b496-20ad-4301-b031-8209e899639a',
      },
      {
        name: 'world war 1',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fworld-war-1.jpg?alt=media&token=34fadb47-369f-4f38-ab57-910c7b38cf52',
      },
    ],
  },
  {
    parentCategory: 'Facts & Wonders',
    subCategories: [
      {
        name: 'size comparison',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fsize-comparison.jpg?alt=media&token=f16367e4-6bee-45c3-b7c8-5660cfd1ce8a',
      },
      {
        name: 'history of internet',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fhistory-of-internet.jpg?alt=media&token=9399ebd0-1428-4d15-84d4-049b22bc70c5',
      },
      {
        name: 'baby animals',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fbaby-animals.jpg?alt=media&token=c0a425a7-ae7e-4f92-bc51-f79bb3f16d9f',
      },
      {
        name: 'what happened first',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fwhat-happened-first.jpg?alt=media&token=72a5037b-a221-4d8e-89b8-7e2e1ecb86a9',
      },
    ],
  },
  {
    parentCategory: 'games',
    subCategories: [
      {
        name: 'valorant',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fvalorant.jpg?alt=media&token=3829c987-3c87-49ea-939c-a67c3273551d',
      },
      {
        name: 'league of legends',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fleague-of-legends.jpg?alt=media&token=da56cd80-aff8-4fe3-ae18-6449713f7c69',
      },
      {
        name: 'overwatch',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Foverwatch.jpg?alt=media&token=d4be0136-e079-4fe2-96df-e672de65d7a6',
      },
      {
        name: 'pokemon gen 1',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fpokemon-gen-1.jpg?alt=media&token=d828d002-5d7d-4597-bfcc-6f2b7d1a3619',
      },
    ],
  },
  {
    parentCategory: 'tv shows',
    subCategories: [
      {
        name: 'friends',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Ffriends-tv-show.jpg?alt=media&token=ce07a1f2-4381-4819-b0cd-cd7e51abc80c',
      },
      {
        name: 'the office',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fthe-office.jpg?alt=media&token=e54139ca-de6d-4fc8-b252-691297781e49',
      },
      {
        name: 'game of thrones',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fgame-of-thrones.jpg?alt=media&token=bcc66116-f351-489d-aa7b-9c1823585131',
      },
      // Added from the original list
      {
        name: 'british sitcoms',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fbritish-sitcoms.jpg?alt=media&token=79ab554b-154c-42dd-bcf9-a4809d665503',
      },
      {
        name: 'soap opera',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fsoap-opera.jpg?alt=media&token=469864ac-4549-4b8b-99b9-10642bf1b56c',
      },
      {
        name: 'The Simpsons',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fthe-simpsons.jpg?alt=media&token=683f58ef-cf1f-4b05-b608-64e2e32ea611',
      },
    ],
  },
  {
    parentCategory: 'anime',
    subCategories: [
      {
        name: 'naruto',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fnaruto.jpg?alt=media&token=4035291b-4ec5-43fd-8381-cf5a3cb93379',
      },
      {
        name: 'one piece',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fone-piece.jpg?alt=media&token=63b371d4-076e-4573-90a0-cbcefb451055',
      },
      {
        name: 'attack on titan',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fattack-on-titan.jpg?alt=media&token=888a5624-ff95-4c84-91a9-93911b840bbf',
      },
      {
        name: 'hunter x hunter',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fhunter-x-hunter.jpg?alt=media&token=74a1a94c-454d-4594-9f5e-4679222ce894',
      },
      {
        name: 'dragon ball series',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fdragon-ball-z.jpg?alt=media&token=6fad4f3f-8c90-4765-be75-8b0af20245e7',
      },
    ],
  },
  {
    parentCategory: 'Sports',
    subCategories: [
      {
        name: 'soccer',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fsoccer.jpg?alt=media&token=4125efa9-d19b-432f-9c12-b97382a1e8ae',
      },
      {
        name: 'tennis',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Ftennis.jpg?alt=media&token=28737701-b18f-4cff-a7c6-faa3c27680ea',
      },
      {
        name: 'cricket',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fcricket.jpg?alt=media&token=665e8b66-e931-4461-97a3-3a7d018f0ccb',
      },
      {
        name: 'basketball',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fbasketball.jpg?alt=media&token=46d97218-0d4b-4d52-a892-18888629f97f',
      },
      // Added from the original list
      {
        name: 'formula 1',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fformula-1.jpg?alt=media&token=d6f6e3d0-a9f4-4079-a228-c5309c208c18',
      },
      {
        name: 'golf',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fgolf.jpg?alt=media&token=83a6b87f-ce0f-4ac9-9f85-81c0a9fcbed6',
      },
      {
        name: 'horse racing',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fhorse-racing.jpg?alt=media&token=fca01de7-6b52-489d-9ecf-0f22a1a8058a',
      },
      {
        name: 'nascar',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fnascar.jpg?alt=media&token=141b4ca3-a941-4f82-bbee-3ee6ce1fd290',
      },
      {
        name: 'rugby league',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Frugby.jpg?alt=media&token=935b9837-6e64-449b-a226-cc62940efb2d',
      },
      {
        name: 'winter sports',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fwinter-sports.jpg?alt=media&token=b1d57ef7-e5df-417c-a373-5c3fe45a8af1',
      },
      {
        name: 'world cup',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Ffifa-world-cup.jpg?alt=media&token=24bc6d5e-2162-4f10-9afa-d9cf137bd10a',
      },
      {
        name: 'liverpool football club',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fliverpool.jpg?alt=media&token=1a50ec8e-7dd1-467f-8ffd-39191fa28a9a',
      },
      {
        name: 'golden state warriors',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fgolden-state-warriors.jpg?alt=media&token=f5416379-3fc8-4bd7-8d8f-108983d79d78',
      },
      {
        name: 'champions league',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fchampions-league.jpg?alt=media&token=3638ea7d-a530-4113-a286-fb86c16d6681',
      },
    ],
  },
  {
    parentCategory: 'science',
    subCategories: [
      {
        name: 'chemistry',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fchemistry.jpg?alt=media&token=9b0f49d5-0c1b-4a60-b5e6-488f4d869f9a',
      },
      {
        name: 'biology',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fbiology.jpg?alt=media&token=f2a83983-a1d8-49ee-9ad9-dc91a0921ca4',
      },
      {
        name: 'mathematics',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fmathematics.jpg?alt=media&token=ac0f5c80-307e-4da1-a9bc-e18ca0dc510d',
      },
      {
        name: 'physics',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fphysics.jpg?alt=media&token=85533331-5922-455c-be91-e6f4c9df6d11',
      },
      {
        name: 'scientists',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fscientists.jpg?alt=media&token=0bd8f393-b8e0-4459-ba31-f72c8399519b',
      },
      {
        name: 'psychology',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fpsychology.jpg?alt=media&token=d87f5ee8-93c4-4282-844f-0232b3acdfd1',
      },
      // Added from the original list
      {
        name: 'science general',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fscience-general.jpg?alt=media&token=eced1839-0d12-4de4-a925-1c4886cae64f',
      },
      {
        name: 'mental math',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fmental-math.jpg?alt=media&token=c67ccbea-61de-438f-8c02-9266b755e411',
      },
    ],
  },
  {
    parentCategory: 'nature & universe',
    subCategories: [
      {
        name: 'space',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fspace.jpg?alt=media&token=3d69b15d-777e-450c-bd11-a03ec57d6695',
      },
      // Added from the original list
      {
        name: 'solar system',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fsolar-system.jpg?alt=media&token=46569ad8-240a-4831-b1e6-37fac2f3e5e8',
      },
    ],
  },
  {
    parentCategory: 'movies',
    subCategories: [
      {
        name: 'harry potter',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fharry-potter.jpg?alt=media&token=8cc7a529-f611-4837-b1b2-627fd141f05d',
      },

      // Added from the original list
      {
        name: 'disney',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fdisney.jpg?alt=media&token=c156edfe-3eab-41a0-97ab-a03f32aeaea0',
      },
      {
        name: 'movies since 2010',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fmovies-since-2010.jpg?alt=media&token=c316023d-a20e-4760-81fa-95b1a6a0fc27',
      },
      {
        name: 'james bond',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fjames-bond.jpg?alt=media&token=dc4bfbd6-bf2c-48bc-9e73-b0f6aedd180c',
      },
      {
        name: 'movie quotes',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fmovie-quotes.jpg?alt=media&token=a3e04a70-1d72-465f-96ab-41ab3d979dc4',
      },
      {
        name: 'british films',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fbritish-film.jpg?alt=media&token=3745b178-30d5-4efb-b2e6-b4b7116f7c24',
      },
      {
        name: 'hunger games',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Fhunger-games.jpg?alt=media&token=064c3c66-1d4a-4957-9279-09be3ef89c4c',
      },
    ],
  },
  {
    parentCategory: 'indian tv shows',
    subCategories: [
      {
        name: 'taarak mehta ka ooltah chashmah',
        logo: 'https://firebasestorage.googleapis.com/v0/b/quiz-arena-e2415.appspot.com/o/home_page_imgs%2Ftkmkoc.jpg?alt=media&token=0c559ff9-97c4-4cea-83d2-8fc2c16efccd',
      },
    ],
  },
];

module.exports = categories;
