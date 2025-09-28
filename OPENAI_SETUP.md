# OpenAI Setup Instructions for EthioHeritage360

## 🤖 Why OpenAI Integration?

Your EthioHeritage360 platform includes powerful AI features:
- **Intelligent Chatbot**: Answers visitor questions about Ethiopian heritage
- **Artifact Descriptions**: Auto-generates detailed artifact descriptions
- **Educational Content**: Creates learning materials and cultural content
- **Multi-language Support**: Translates content to different languages
- **Tour Guide Content**: Generates personalized tour narratives

## 🔑 Getting Your OpenAI API Key

1. **Visit OpenAI Platform**: https://platform.openai.com/
2. **Sign up or log in** to your OpenAI account
3. **Go to API Keys**: https://platform.openai.com/api-keys
4. **Click "Create new secret key"**
5. **Copy the API key** (starts with `sk-`)

## 🛠️ Setting Up in Render

### Option 1: Environment Variables (Recommended)

1. **Go to your Render dashboard**: https://dashboard.render.com/
2. **Select your EthioHeritage360 service**
3. **Click "Environment"** in the left sidebar
4. **Add these environment variables**:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (sk-...)
   
5. **Click "Save Changes"**
6. **Redeploy your service**

### Option 2: Direct .env File Edit

Edit your `server/.env` file:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## 🧪 Testing the Integration

After adding your API key, test it with:

```bash
# Run the test script
node test-openai-integration.js

# Or use the built-in endpoint
curl -X GET "https://ethioheritage360-ethiopian-heritage.onrender.com/api/openai/status" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎯 Available AI Features

Once configured, these endpoints become active:

### Public Endpoints
- `POST /api/openai/chat` - AI chatbot for visitors
- `POST /api/chat/ask` - Enhanced chat with context

### Admin Endpoints (require authentication)
- `POST /api/openai/generate-artifact-description`
- `POST /api/openai/generate-educational-content`
- `POST /api/openai/translate`
- `GET /api/openai/test`
- `GET /api/openai/status`

## 💰 Cost Considerations

- **GPT-3.5-turbo**: ~$0.0015 per 1K tokens (very affordable)
- **Average chat response**: ~$0.002-0.005 per interaction
- **Artifact description**: ~$0.01-0.02 per generation

## 🔧 Configuration Options

Your `.env` file supports these settings:

```bash
OPENAI_API_KEY=sk-your-key-here          # Your API key
OPENAI_MODEL=gpt-3.5-turbo              # AI model to use
OPENAI_MAX_TOKENS=1000                  # Response length limit
OPENAI_TEMPERATURE=0.7                  # Creativity level (0-1)
OPENAI_TIMEOUT=30000                    # Request timeout (ms)
OPENAI_MAX_RETRIES=3                    # Retry failed requests
```

## 🚀 Benefits for Your Platform

1. **Enhanced User Experience**: Visitors get instant, intelligent responses
2. **Administrative Efficiency**: Auto-generate content descriptions
3. **Educational Value**: Create learning materials automatically
4. **Global Accessibility**: Multi-language support
5. **24/7 Availability**: AI assistant never sleeps

## 📞 Support

If you encounter issues:
1. Check the Render logs for error messages
2. Verify your API key is correctly formatted
3. Ensure you have OpenAI credits available
4. Test with the connectivity script: `npm run test:connectivity`

## ✨ Next Steps

1. Get your OpenAI API key
2. Add it to Render environment variables
3. Redeploy your service
4. Test the AI features
5. Enjoy enhanced visitor engagement!

Your platform is ready for AI-powered Ethiopian heritage experiences! 🇪🇹✨
