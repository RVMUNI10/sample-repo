// controllers/promptController.js
const Prompt = require("../models/Prompt");
const { OpenAI } = require("openai");
const openai = new OpenAI();

exports.refinePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // Save to database
    const savedPrompt = await Prompt.create({ original: prompt });

    // Construct system prompt for missing info suggestion
    const analysisPrompt = `Analyze the following user prompt and suggest what is missing: "${prompt}".`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert prompt engineer." },
        { role: "user", content: analysisPrompt }
      ]
    });

    const suggestions = aiResponse.choices[0].message.content.trim();

    // Now generate the refined version
    const refinedPromptResp = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert at rewriting prompts for better AI performance." },
        { role: "user", content: `Refine this prompt to make it highly effective: "${prompt}"` }
      ]
    });

    const refined = refinedPromptResp.choices[0].message.content.trim();

    // Update database
    savedPrompt.suggestions = suggestions;
    savedPrompt.refined = refined;
    await savedPrompt.save();

    res.json({ suggestions, refined });
  } catch (error) {
    console.error("Refinement error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
