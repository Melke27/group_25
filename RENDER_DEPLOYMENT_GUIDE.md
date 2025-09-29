# EthioHeritage360 - Render Deployment Guide

## 🚀 Complete Deployment Instructions

### Step 1: Push Code to GitHub
Your code is ready for deployment. Make sure all changes are pushed to GitHub.

### Step 2: Create Render Web Service

1. **Go to Render Dashboard**: https://render.com
2. **Click "New +"** → **Web Service**
3. **Connect GitHub Repository**: `https://github.com/Melke27/group_25`
4. **Configure Service**:
   - **Name**: `ethioheritage360-backend`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Instance Type**: `Free` (for testing)

### Step 3: Set Environment Variables

In Render Dashboard, go to **Environment** tab and add these variables:

#### Required Variables:
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://melkamuwako5_db_user:YFweyhElTJBj5sXp@cluster0.x3jfm8p.mongodb.net/ethioheritage360?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=ethioheritage360_production_jwt_secret_2024_very_long_and_secure_key_abcdef123456
FRONTEND_URL=https://ethioheritage360-ethiopianheritagepf.netlify.app
RENDER_EXTERNAL_URL=https://ethioheritage360-ethiopian-heritage.onrender.com
```

#### OpenAI Configuration (FOR CHATBOT):
```bash
OPENAI_API_KEY=your_actual_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=800
OPENAI_TEMPERATURE=0.7
```

**⚠️ IMPORTANT**: Replace `your_actual_openai_api_key_here` with your real OpenAI API key!

### Step 4: Deploy

1. **Click "Create Web Service"**
2. **Wait for deployment** (takes 5-10 minutes)
3. **Your backend will be available at**: `https://ethioheritage360-ethiopian-heritage.onrender.com`

### Step 5: Test Your Deployment

After deployment, test these endpoints:

#### Health Check:
```
GET https://ethioheritage360-ethiopian-heritage.onrender.com/api/health
```

#### Login Test:
```
POST https://ethioheritage360-ethiopian-heritage.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "melkamuwako5.new@admin.com",
  "password": "melkamuwako5"
}
```

#### Chatbot Test (requires OpenAI API key):
```
POST https://ethioheritage360-ethiopian-heritage.onrender.com/api/chat
Content-Type: application/json

{
  "message": "Hello, tell me about Ethiopian heritage",
  "context": "general"
}
```

### Step 6: Connect Frontend

Update your Netlify frontend to use the new backend URL:
`https://ethioheritage360-ethiopian-heritage.onrender.com`

## 🔧 Troubleshooting

### If Login Fails:
- Check if default users were created
- Your working credentials: `melkamuwako5.new@admin.com` / `melkamuwako5`

### If Chatbot Fails:
- Verify `OPENAI_API_KEY` is set correctly in Render environment variables
- Check Render logs for OpenAI-related errors

### If Database Connection Fails:
- Verify MongoDB Atlas allows connections from `0.0.0.0/0` (all IPs)
- Check MongoDB URI in environment variables

## 📝 Environment Variables Checklist

- ✅ NODE_ENV=production
- ✅ PORT=10000  
- ✅ MONGODB_URI (your actual MongoDB connection)
- ✅ JWT_SECRET (strong secret key)
- ✅ FRONTEND_URL (your Netlify URL)
- ✅ RENDER_EXTERNAL_URL (your Render service URL)
- ⚠️ OPENAI_API_KEY (REQUIRED for chatbot - set your real key)

## 🎯 Final Steps

1. **Deploy on Render** ✅
2. **Set environment variables** ⚠️ (Don't forget OpenAI API key!)
3. **Test all endpoints** 
4. **Update frontend configuration**
5. **Test login and chatbot functionality**

Your EthioHeritage360 platform will be fully deployed and functional! 🚀

This guide covers deploying your Node.js/Express backend to Render with MongoDB Atlas as the database.

## 🚀 Why Render for Backend?

- **Free Tier**: 750 hours/month free hosting
- **Easy Deployment**: Git-based deployment with automatic builds
- **MongoDB Compatible**: Perfect for Express + MongoDB applications
- **Environment Variables**: Secure secret management
- **Health Checks**: Built-in monitoring and auto-restart
- **Custom Domains**: Free SSL certificates
- **Container Support**: Docker and native Node.js support

## 📋 Prerequisites

- Render account (free at [render.com](https://render.com))
- MongoDB Atlas account and cluster
- Git repository with your code
- Environment variables ready

## 🎯 Deployment Architecture

```
Frontend (Netlify) ←→ Backend API (Render) ←→ MongoDB Atlas
```

- **Frontend**: React app on Netlify
- **Backend**: Node.js API on Render
- **Database**: MongoDB Atlas (cloud)
- **Files**: Cloudinary (recommended)

## 📝 Step-by-Step Deployment

### Step 1: Prepare Your Backend

1. **Verify your project structure**:
```
server/
├── package.json
├── server.js
├── config/
│   ├── database.js
│   └── database.render.js    # Render-optimized config
├── routes/
├── models/
├── middleware/
└── Dockerfile.render         # Optional Docker config
```

2. **Test locally** (optional):
```bash
cd server
npm install
npm start
```

### Step 2: Set Up MongoDB Atlas

If you haven't already, follow the [DATABASE_SETUP.md](./DATABASE_SETUP.md) guide to:
- Create MongoDB Atlas cluster
- Set up database user and network access
- Get your connection string

### Step 3: Create Render Account and Service

1. **Sign up** at [render.com](https://render.com)

2. **Create a new Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub/GitLab repository
   - Choose your repository and branch (usually `main`)

3. **Configure Build Settings**:
```
Name: ethioheritage360-api
Region: Ohio (or closest to your users)
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

4. **Set Instance Type**:
   - Plan: Free (for development/testing)
   - Or Starter ($7/month) for production

### Step 4: Configure Environment Variables

In Render Dashboard → Your Service → Environment:

#### Required Variables:
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ethioheritage360?retryWrites=true&w=majority
DB_NAME=ethioheritage360
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
JWT_REFRESH_SECRET=your-super-secure-refresh-token-secret
BCRYPT_SALT_ROUNDS=12
```

#### Optional but Recommended:
```bash
# File Upload
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# External Services
MAPBOX_ACCESS_TOKEN=your-mapbox-token
GOOGLE_MAPS_API_KEY=your-google-maps-key

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# CORS (Update with your frontend URL)
ALLOWED_ORIGINS=https://your-netlify-app.netlify.app,https://your-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
```

### Step 5: Deploy Your Service

1. **Click "Create Web Service"**
2. **Wait for deployment** (first deploy takes 5-10 minutes)
3. **Check logs** for any errors
4. **Test health endpoint**: `https://your-service.onrender.com/api/health`

### Step 6: Configure Your Frontend

Update your frontend (Netlify) to use the Render backend:

#### In your React app's environment variables:
```bash
# Netlify Environment Variables
VITE_API_BASE_URL=https://your-render-service.onrender.com/api
VITE_SOCKET_URL=https://your-render-service.onrender.com
```

#### Update CORS in backend:
Make sure your `ALLOWED_ORIGINS` environment variable includes your Netlify URL.

## 🔧 Advanced Configuration

### Custom Domains

1. **In Render Dashboard**:
   - Go to Settings → Custom Domains
   - Add your domain (e.g., `api.ethioheritage360.com`)
   - Update DNS records as instructed

2. **Update CORS settings** to include your custom domain

### Health Checks

Render automatically monitors your `/api/health` endpoint. Ensure it returns:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": { "connected": true }
}
```

### Auto-Deploy

Render automatically deploys when you push to your connected branch:
```bash
git add .
git commit -m "Update backend"
git push origin main  # Triggers automatic deployment
```

### Scaling

1. **Vertical Scaling**: Upgrade to higher plans for more resources
2. **Horizontal Scaling**: Available on paid plans
3. **Load Balancing**: Automatic on Render

## 📊 Monitoring and Maintenance

### Render Dashboard Features

1. **Logs**: Real-time application logs
2. **Metrics**: CPU, Memory, Response time
3. **Events**: Deployment history
4. **Settings**: Environment variables, domains

### Health Monitoring

Your app includes built-in health checks:
- Database connectivity
- Memory usage
- Response time monitoring
- Automatic restart on failure

### Performance Optimization

1. **Connection Pooling**: Optimized MongoDB connections
2. **Caching**: Implement Redis if needed
3. **Compression**: Enabled by default
4. **Keep-Alive**: HTTP connection reuse

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check logs in Render dashboard
# Common fixes:
cd server
npm install
npm run build
```

#### 2. Database Connection Issues
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Render)
- Check connection string format
- Ensure environment variables are set correctly

#### 3. Port Issues
- Render uses PORT environment variable (usually 10000)
- Don't hardcode ports in your application
```javascript
const PORT = process.env.PORT || 3000;
```

#### 4. CORS Errors
- Update `ALLOWED_ORIGINS` environment variable
- Include both HTTP and HTTPS versions if testing locally

#### 5. Memory Issues
- Monitor memory usage in Render dashboard
- Consider upgrading to a paid plan for more resources
- Optimize database queries and connections

### Debug Commands

```bash
# Check if service is running
curl https://your-service.onrender.com/api/health

# Check specific endpoints
curl https://your-service.onrender.com/api/auth/health

# View logs in Render dashboard or CLI
render logs your-service-name
```

## 💰 Cost Optimization

### Free Tier Limits
- **750 hours/month**: ~31 days of runtime
- **Sleeps after 15 minutes**: Automatic wake-up on requests
- **512MB RAM**: Sufficient for small to medium applications
- **Limited bandwidth**: 100GB/month

### Upgrade Considerations
- **Starter Plan ($7/month)**: Always-on, more resources
- **Standard Plan ($25/month)**: Better performance, scaling options
- **Pro Plan ($85/month)**: Advanced features, priority support

### Cost-Saving Tips
1. **Optimize startup time**: Faster cold starts
2. **Use caching**: Reduce database queries
3. **Implement health checks**: Prevent unnecessary restarts
4. **Monitor usage**: Track resource consumption

## 🔄 CI/CD Pipeline

### GitHub Actions Integration

```yaml
# .github/workflows/deploy-render.yml
name: Deploy to Render

on:
  push:
    branches: [main]
    paths: ['server/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: cd server && npm ci
        
      - name: Run tests
        run: cd server && npm test
        
      - name: Deploy to Render
        uses: render-deploy/render-deploy-action@v1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Automatic Deployments
- **Push to main**: Triggers automatic deployment
- **Pull Request**: Preview deployments (paid plans)
- **Manual Deploy**: From Render dashboard

## 🔐 Security Best Practices

### Environment Variables
- Never commit secrets to Git
- Use Render's secure environment variable storage
- Regularly rotate JWT secrets and API keys

### Database Security
- Use MongoDB Atlas IP whitelisting
- Enable database authentication
- Regular security updates

### Application Security
- Keep dependencies updated
- Use security middleware (helmet, CORS)
- Implement proper error handling
- Enable HTTPS (automatic with Render)

## 📈 Scaling Your Application

### Performance Monitoring
1. **Response Times**: Monitor API endpoint performance
2. **Database Performance**: Watch MongoDB Atlas metrics
3. **Error Rates**: Track and fix application errors
4. **Resource Usage**: CPU and memory consumption

### Scaling Strategy
1. **Database**: Upgrade MongoDB Atlas cluster
2. **Backend**: Upgrade Render plan or add instances
3. **Caching**: Implement Redis for session/data caching
4. **CDN**: Use Cloudinary for file serving

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster configured
- [ ] Render account created and service set up
- [ ] Environment variables configured
- [ ] Build and start commands working
- [ ] Health check endpoint responding
- [ ] Database connection established
- [ ] CORS configured for frontend
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)
- [ ] Monitoring and alerts set up
- [ ] Backup procedures in place

## 🎉 Success!

Your EthioHeritage360 backend is now running on Render! 

**Your API will be available at**: `https://your-service-name.onrender.com`

**Test your deployment**:
- Health Check: `GET /api/health`
- Authentication: `POST /api/auth/login`
- Database Status: Check logs for MongoDB connection

## 📞 Support Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [Express.js Guide](https://expressjs.com/en/guide/)

---

**Next Steps**: Configure your frontend to use the Render backend URL and enjoy your full-stack application running in the cloud! 🚀
