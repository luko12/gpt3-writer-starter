import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Provide specific questions to renewable energy developers seeking to understand utility and state policies in new geographies. 
\n Question: What is the REC value for a 1.2MW commercial rooftop solar project in ComEd IL?
\n Answer: $47.63
\n Question: What's the project size limit for the Small Distributed Generation (Small DG) category?
\n Answer: Small Distributed Generation refers to projects up to 25 kW in size. This category will comprise at least 20% of the Adjustable Block Program (ABP) capacity.
\n Question: `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;