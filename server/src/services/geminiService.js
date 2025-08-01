const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateTrip = async (destination, days, budget) => {
  try {
    // Add API key validation
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    console.log(`🤖 Generating trip for ${destination}...`);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Create an AMAZING ${days}-day travel guide for ${destination} (${budget} budget).

🎯 **TRIP OVERVIEW**
Write 2-3 exciting sentences about what makes ${destination} special.

🏛️ **TOP ATTRACTIONS** (5-6 places)
For each place:
- ✨ Name & why it's amazing
- ⏰ Best time to visit  
- 💰 Cost estimate
- 🎯 Pro tip

📅 **DAILY ITINERARY**
${Array.from({length: days}, (_, i) => `
**Day ${i + 1}:**
- 🌅 Morning: [activity]
- ☀️ Afternoon: [activity] 
- 🌆 Evening: [activity]`).join('')}

🎒 **TRAVEL ESSENTIALS**
- 🚌 Transportation options
- 🏨 Where to stay (${budget} budget)
- 🍜 Must-try foods
- 👕 What to pack
- ⚠️ Safety tips

💰 **BUDGET BREAKDOWN**
- Accommodation: $X per night
- Food: $X per day
- Activities: $X total
- **Total: $X for ${days} days**

Make it fun with emojis and detailed recommendations!`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log('✅ Trip generated successfully');
    return { success: true, data: response };
    
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    return { 
      success: false, 
      message: `Gemini API failed: ${error.message}`,
      details: error.stack
    };
  }
};

module.exports = { generateTrip };
