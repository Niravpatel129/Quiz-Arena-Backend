const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAIResponse = async (prompt) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, prompt],
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
          content: `True or false: The question "${question.question}" is logically consistent and correctly formed.`,
        },
      },
      {
        type: 'Fact-Checking',
        prompt: {
          role: 'user',
          content: `True or false: The statement "${question.question}" is factually accurate.`,
        },
      },
      {
        type: 'Relevance Check',
        prompt: {
          role: 'user',
          content: `True or false: The question "${question.question}" is relevant to the topic "${question.category}" in the current year.`,
        },
      },
      {
        type: 'Correct Answer Validation',
        prompt: {
          role: 'user',
          content: `True or false: The correct answer "${
            question.correctAnswer
          }" accurately matches one of the provided options for the question "${
            question.question
          }". Options: ${question.answers.map((a) => a.optionText).join(', ')}.`,
        },
      },
    ];

    for (const check of validationChecks) {
      const response = await getAIResponse(check.prompt);
      // Check if the response starts with "True" considering additional explanation
      if (!response.trim().toLowerCase().startsWith('true')) {
        console.log(
          `Question ID: ${question._id} failed the ${check.type} check with response: ${response}`,
        );
        return false; // Stop validation if the response does not start with "true"
      } else {
        // Log or handle the successful validation
        console.log(
          `Question ID: ${question._id} passed the ${check.type} check with response: ${response}`,
        );
      }
    }

    // console.log(`Question ID: ${question._id} has passed all validation checks.`);
    return true;
  } catch (error) {
    console.error(`Error validating question ID: ${question._id}:`, error);
    return false; // Consider the question invalid if any API call fails
  }
};

module.exports = validateQuestionsUsingAPI;
