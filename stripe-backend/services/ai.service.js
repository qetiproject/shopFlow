require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `
You are an ecommerce assistant.
Answer only in ecommerce context.
If you don't know the answer, ask the user to leave their number and a manager will contact them.
`;

async function askAI(userMessage) {
  if (!userMessage) throw new Error('Message is required');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { askAI };
