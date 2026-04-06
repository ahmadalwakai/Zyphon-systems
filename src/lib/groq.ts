import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askGroq(prompt: string): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional business development assistant for Zyphon Systems, a software studio that builds mobile apps, admin panels, backend systems, and digital platforms. Help draft professional, helpful, and concise responses to client inquiries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    return chatCompletion.choices[0]?.message?.content || 'Unable to generate response.';
  } catch (error) {
    console.error('Groq API error:', error);
    throw new Error('Failed to generate AI response');
  }
}
