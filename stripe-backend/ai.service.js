const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askAI(userMessage) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
        შენ ხარ ecommerce assistant.
        უპასუხე მხოლოდ ecommerce კონტექსტში.
        თუ პასუხი არ იცი, სთხოვე მომხმარებელს ნომრის დატოვება.
        `,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { askAI };
