// // server/routes/promptRoutes.js
// const express = require('express');
// const router = express.Router();
// const { Configuration, OpenAI } = require('openai');
// const Prompt = require('../models/Prompt');

// require('dotenv').config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAI(configuration);

// // POST /api/refine — Receives prompt, analyzes, refines, and saves
// router.post('/refine', async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt || prompt.trim() === "") {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     // Step 1: Analyze for missing elements
//     const analysisResponse = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You're an AI that analyzes prompts to detect missing elements or improvements for better AI understanding.",
//         },
//         {
//           role: "user",
//           content: `Analyze this prompt and list what elements or context might be missing to make it more effective:\n\n${prompt}`,
//         },
//       ],
//       model: "gpt-4",
//     });

//     const analysisText = analysisResponse.choices[0].message.content.trim();

//     // Step 2: Use findings to create a refined version of the prompt
//     const refineResponse = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You're an expert prompt engineer. Rewrite prompts to make them clearer, more complete, and efficient for AI to respond to.",
//         },
//         {
//           role: "user",
//           content: `Original Prompt: ${prompt}\n\nBased on these issues: ${analysisText}\n\nGenerate a refined and complete version.`,
//         },
//       ],
//       model: "gpt-4",
//     });

//     const refinedPrompt = refineResponse.choices[0].message.content.trim();

//     // Save to MongoDB
//     const savedPrompt = new Prompt({
//       original: prompt,
//       suggestions: analysisText,
//       refined: refinedPrompt,
//     });

//     await savedPrompt.save();

//     res.status(200).json({
//       suggestions: analysisText,
//       refined: refinedPrompt,
//       id: savedPrompt._id,
//     });

//   } catch (error) {
//     console.error("Error refining prompt:", error.message);
//     res.status(500).json({ error: "Server error while refining prompt." });
//   }
// });

// module.exports = router;
// server/routes/promptRoutes.js
const express = require('express');
const router = express.Router();
const Prompt = require('../models/Prompt');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/refine', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Step 1: Generate suggestions
    const suggestionRes = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert in prompt engineering.' },
        { role: 'user', content: `Analyze the following prompt and list missing elements:\n\n"${prompt}"` },
      ],
      temperature: 0.5
    });
    const suggestions = suggestionRes.choices[0].message.content;

    // Step 2: Generate refined prompt
    const refineRes = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a professional prompt refiner.' },
        { role: 'user', content: `Given the original prompt:\n"${prompt}"\n\nAnd suggestions:\n"${suggestions}"\n\nRefine the prompt:` },
      ],
      temperature: 0.6
    });
    const refined = refineRes.choices[0].message.content;

    // Save to DB
    const newPrompt = new Prompt({ userPrompt: prompt, suggestions, refinedPrompt: refined });
    await newPrompt.save();

    res.status(200).json({ refined, suggestions });
  } catch (error) {
    console.error('Prompt refinement failed:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
