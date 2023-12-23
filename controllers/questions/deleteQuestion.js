const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await QuestionModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.error('deleteQuestion', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = deleteQuestion;
