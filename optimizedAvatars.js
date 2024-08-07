const freeAvatars = [
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551422544-5s77y8.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551423920-9wtkde.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551425108-635li.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551426136-fkkb8.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551427029-qduyfp.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551428016-d258zc.webp"
];

const lockedAvatars = [
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551429032-sdmnf9.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551430131-urjst4b.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551430979-wh985f.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551431937-kvcml.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551432940-a917l2.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551433868-5y9ba4.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551434819-zz0mek.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551435761-ycs9to.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551436808-xzxxs.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551437705-opc4lj.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551438685-pksalp.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551439706-av02li.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551440642-qkgv0j.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551441614-376py8.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551442665-zvr8gn.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551443789-l1edvvn.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551444843-xfumsg.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551445828-l6kas.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551446840-gvqnbd.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551447756-w9xo3b.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551448931-190gww.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551449986-chjij.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551451095-hn798d.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551452010-wuvsug.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551452916-s2x9t.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551454008-kmyqso.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551454874-s1eml.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551455808-2brca.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551456796-t76dpo.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551457823-quz4c8.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551458725-uidop.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551459657-c1jx3e.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551460736-snf7t.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551461706-86mp.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551462621-ik1or.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551463743-r0u5cy.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551464812-ddu6jq.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551465735-qqgnig.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551466671-d2ina.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551467490-jcah8o.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551468420-libjil.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551469314-pd17c.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551470242-77o4dn.webp",
  "https://storage.googleapis.com/quiz-arena-e2415.appspot.com/optimized-avatars/1722551471218-dfrsz.webp"
];

module.exports = { freeAvatars, lockedAvatars };