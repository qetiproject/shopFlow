require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const axios = require('axios');

const SYSTEM_PROMPT = `
You are an ecommerce assistant.
Answer only using the provided product context.
If you don't know the answer, ask the user to leave their number and a manager will contact them.
`;

async function askAI(userMessage, context = {}) {
  let contextMessage = '';

  if (context.product) {
    contextMessage += 'Products:\n';
    const p = context.product;
    contextMessage += `- ${p.title}: $${p.price}, stock: ${p.stock}\n`;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'system', content: contextMessage },
      { role: 'user', content: userMessage },
    ],
  });

  return completion.choices[0].message.content;
}

// async function getProductQuery(userMessage) {
//   const stopPhrases = ['price', 'how much', 'cost', 'stock'];
//   const messageLower = userMessage.toLowerCase();

//   const matchedPhrase = stopPhrases.find((phrase) => messageLower.includes(phrase));

//   if (!matchedPhrase) {
//     return userMessage;
//   }

//   return matchedPhrase;
// }
function getProductQuery(userMessage) {
  const stopPhrases = ['price', 'how much', 'cost', 'stock'];
  let query = userMessage.toLowerCase();

  stopPhrases.forEach((phrase) => {
    query = query.replace(new RegExp(`\\b${phrase}\\b`, 'gi'), '');
  });

  return query.trim();
}

async function getProductByName(userMessage) {
  if (!userMessage) return null;

  try {
    const query = encodeURIComponent(getProductQuery(userMessage));

    const res = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    const products = res.data.products || [];

    return products[0] || null;
  } catch (err) {
    console.error('Error fetching product:', err.message);
    return null;
  }
}

module.exports = { askAI, getProductByName };
