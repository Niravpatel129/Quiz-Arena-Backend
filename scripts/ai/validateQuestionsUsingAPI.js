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
  let feedback = []; // Initialize an array to hold detailed feedback
  let isValid = true; // Assume the question is valid until proven otherwise

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
    {
      type: 'Engagement Check',
      prompt: {
        role: 'user',
        content: `Rate the engagement level of the question "${question.question}" with the correct answer being: ${question.correctAnswer}, on a scale from 1 to 10, where 10 is highly engaging. (number only)`,
      },
    },
  ];

  for (const check of validationChecks) {
    const response = await getAIResponse(check.prompt);
    if (check.type === 'Engagement Check') {
      const engagementScore = parseInt(response.trim(), 10);
      if (isNaN(engagementScore) || engagementScore < 7) {
        feedback.push(
          `Failed Engagement Check: Score ${engagementScore}. Needs to be more engaging.`,
        );
        isValid = false;
      } else {
        feedback.push(`Passed Engagement Check: Score ${engagementScore}.`);
      }
    } else if (!response.trim().toLowerCase().startsWith('true')) {
      feedback.push(`Failed ${check.type}: ${response}`);
      isValid = false;
    } else {
      feedback.push(`Passed ${check.type}.`);
    }
  }

  return { isValid, feedback }; // Return both the validity flag and the feedback array
};

module.exports = validateQuestionsUsingAPI;
