const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    this.model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    this.maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS) || 1000;
  }

  /**
   * Generate artifact description using AI
   */
  async generateArtifactDescription(artifactName, category, historicalPeriod) {
    try {
      const prompt = `Generate a detailed and engaging description for an Ethiopian cultural artifact called "${artifactName}" from the ${category} category, dating from the ${historicalPeriod} period. Include historical context, cultural significance, and interesting facts about Ethiopian heritage. Keep it educational but accessible, around 150-200 words.`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert in Ethiopian culture, history, and museum curation. Provide accurate, respectful, and engaging descriptions of Ethiopian cultural artifacts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.7,
      });

      return {
        success: true,
        description: completion.choices[0].message.content.trim()
      };
    } catch (error) {
      console.error('OpenAI artifact description generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate museum tour guide content
   */
  async generateTourGuide(museumName, exhibits, targetAudience = 'general') {
    try {
      const prompt = `Create an engaging tour guide script for ${museumName} featuring these exhibits: ${exhibits.join(', ')}. Target audience: ${targetAudience}. Include interesting stories, historical context, and interactive questions. Make it culturally sensitive and educational about Ethiopian heritage.`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a professional museum tour guide specializing in Ethiopian heritage and culture. Create engaging, informative, and respectful content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens * 2,
        temperature: 0.8,
      });

      return {
        success: true,
        tourGuide: completion.choices[0].message.content.trim()
      };
    } catch (error) {
      console.error('OpenAI tour guide generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate educational content for heritage learning
   */
  async generateEducationalContent(topic, difficulty = 'intermediate', contentType = 'lesson') {
    try {
      let prompt = '';
      
      switch (contentType) {
        case 'lesson':
          prompt = `Create a ${difficulty}-level educational lesson about ${topic} in Ethiopian heritage. Include learning objectives, key concepts, historical context, and discussion questions.`;
          break;
        case 'quiz':
          prompt = `Create a ${difficulty}-level quiz with 10 multiple-choice questions about ${topic} in Ethiopian heritage. Include correct answers and explanations.`;
          break;
        case 'summary':
          prompt = `Write a comprehensive but accessible summary about ${topic} in Ethiopian heritage, suitable for ${difficulty}-level learners.`;
          break;
        default:
          prompt = `Create educational content about ${topic} in Ethiopian heritage for ${difficulty}-level learners.`;
      }

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert educator specializing in Ethiopian heritage, history, and culture. Create accurate, engaging, and culturally respectful educational content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens * 1.5,
        temperature: 0.7,
      });

      return {
        success: true,
        content: completion.choices[0].message.content.trim(),
        topic,
        difficulty,
        contentType
      };
    } catch (error) {
      console.error('OpenAI educational content generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate chatbot responses for visitor questions
   */
  async generateChatResponse(userMessage, context = '') {
    try {
      const systemPrompt = `You are a helpful AI assistant for EthioHeritage360, an Ethiopian cultural heritage platform. You help visitors with questions about Ethiopian museums, artifacts, culture, history, and heritage sites. Be informative, friendly, and culturally respectful. If you don't know something specific, suggest they contact the museum directly.

Context: ${context}`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.8,
      });

      return {
        success: true,
        response: completion.choices[0].message.content.trim()
      };
    } catch (error) {
      console.error('OpenAI chat response generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate personalized recommendations
   */
  async generateRecommendations(userPreferences, visitHistory = []) {
    try {
      const prompt = `Based on a user's preferences: ${JSON.stringify(userPreferences)} and their visit history: ${visitHistory.join(', ')}, recommend 5 Ethiopian heritage sites, museums, or cultural experiences. Explain why each recommendation matches their interests.`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a cultural heritage recommendation expert specializing in Ethiopian museums, sites, and experiences. Provide personalized, relevant recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.8,
      });

      return {
        success: true,
        recommendations: completion.choices[0].message.content.trim()
      };
    } catch (error) {
      console.error('OpenAI recommendations generation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Translate content to different languages
   */
  async translateContent(content, targetLanguage) {
    try {
      const prompt = `Translate the following content about Ethiopian heritage to ${targetLanguage}. Maintain cultural context and respectful tone:\n\n${content}`;

      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a professional translator specializing in cultural and heritage content. Maintain accuracy while preserving cultural nuances.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: this.maxTokens,
        temperature: 0.3,
      });

      return {
        success: true,
        translatedContent: completion.choices[0].message.content.trim(),
        originalLanguage: 'English',
        targetLanguage
      };
    } catch (error) {
      console.error('OpenAI translation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Check if OpenAI is properly configured
   */
  isConfigured() {
    return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-');
  }

  /**
   * Test OpenAI connection
   */
  async testConnection() {
    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: 'Say "OpenAI connection test successful for EthioHeritage360!"'
          }
        ],
        max_tokens: 50,
        temperature: 0,
      });

      return {
        success: true,
        message: completion.choices[0].message.content.trim(),
        model: this.model
      };
    } catch (error) {
      console.error('OpenAI connection test error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new OpenAIService();
