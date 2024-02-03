const Question = require('../../models/Question');
const UserAnswer = require('../../models/UserAnswer');

const getQuestions = async (req, res) => {
  try {
    const category = req.query?.category || 'general knowledge';
    const count = parseInt(req.query.count) || 10;
    const startOrder = parseInt(req.query.startOrder) || 0;

    let questions = await Question.find({
      category,
      order: { $gte: startOrder },
    })
      .sort('order')
      .limit(count)
      .lean();

    if (questions.length === 0) {
      return res.json([]);
    }

    const questionIds = questions.map((question) => question._id);

    const answersAggregation = await UserAnswer.aggregate([
      { $match: { question: { $in: questionIds } } },
      {
        $group: {
          _id: { question: '$question', answer: '$answer' },
          pickCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.question',
          answers: { $push: { answer: '$_id.answer', pickCount: '$pickCount' } },
          totalPicks: { $sum: '$pickCount' },
        },
      },
    ]);

    const answersStats = answersAggregation.reduce((acc, curr) => {
      acc[curr._id.toString()] = curr;
      return acc;
    }, {});

    questions.forEach((question) => {
      const stats = answersStats[question._id.toString()];
      if (stats) {
        question.answers.forEach((option) => {
          const optionStat = stats.answers.find((a) => a.answer === option.optionText);
          const pickCount = optionStat ? optionStat.pickCount : 0;
          const pickPercentage = stats.totalPicks > 0 ? (pickCount / stats.totalPicks) * 100 : 0;
          option.pickPercentage = pickPercentage.toFixed(2) + '%';
        });
      }
    });

    res.json(questions);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = getQuestions;
