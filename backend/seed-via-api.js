// Seed users via the existing API endpoint on your live server
const https = require('https');

const seedData = {
  secretKey: 'ethioheritage360-setup-secret-2024'
};

console.log('🌱 Seeding users via production API...');
console.log('===========================================');

const options = {
  hostname: 'ethioheritage360-ethiopian-heritage.onrender.com',
  port: 443,
  path: '/api/admin/seed-users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(seedData))
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('\n🎉 API Response:');
      console.log('================');
      console.log(JSON.stringify(response, null, 2));
      
      if (response.success) {
        console.log('\n✅ USERS SEEDED SUCCESSFULLY!');
        console.log('\n🔑 LOGIN CREDENTIALS:');
        console.log('====================');
        
        if (response.credentials) {
          Object.entries(response.credentials).forEach(([role, cred]) => {
            console.log(`${role}: ${cred}`);
          });
        }
        
        console.log('\n🚀 Try logging in now!');
        console.log('🔗 Login URL: https://ethioheritage360-ethiopianheritagepf.netlify.app/');
      } else {
        console.log('\n❌ Seeding failed:', response.message);
      }
    } catch (error) {
      console.log('\n📄 Raw Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
});

req.write(JSON.stringify(seedData));
req.end();
