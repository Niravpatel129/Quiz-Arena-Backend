const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAIResponse = async (prompt) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [prompt],
    });
    return chatCompletion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error getting AI response: ', error);
    throw error; // Rethrow error to be handled by the caller
  }
};

const validateQuestionsUsingAPI = async (question) => {
  try {
    const validationChecks = [
      {
        type: 'Logical Consistency',
        prompt: {
          role: 'user',
          content: `Is this question logically consistent and correctly formed? "${question.content}" Provide a detailed explanation.`,
        },
      },
      {
        type: 'Fact-Checking',
        prompt: {
          role: 'user',
          content: `Fact-check this statement: "${question.content}" Provide evidence or sources if available.`,
        },
      },
      {
        type: 'Relevance Check',
        prompt: {
          role: 'user',
          content: `Is this question relevant to the topic "${question.topic}" in the current year? Provide reasoning.`,
        },
      },
    ];

    for (const check of validationChecks) {
      const response = await getAIResponse(check.prompt);

      if (response.includes('no') || response.includes('not')) {
        console.log(`Question ID: ${question._id} failed the ${check.type} check: ${response}`);
        return false; // Stop validation if any check fails
      }
    }

    console.log(`Question ID: ${question._id} has passed all validation checks.`);
    return true;
  } catch (error) {
    console.error(`Error validating question ID: ${question._id}:`, error);
    return false; // Consider the question invalid if any API call fails
  }
};

module.exports = validateQuestionsUsingAPI;
