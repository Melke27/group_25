// Test login with the corrected credentials
const https = require('https');

async function testLogin(email, password) {
  return new Promise((resolve, reject) => {
    const loginData = { email, password };
    const postData = JSON.stringify(loginData);
    
    const options = {
      hostname: 'ethioheritage360-ethiopian-heritage.onrender.com',
      port: 443,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: { raw: data } });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function testAllLogins() {
  console.log('🔐 Testing ALL login credentials...');
  console.log('=====================================');
  
  const credentials = [
    { email: 'melkamuwako5@admin.com', password: 'melkamuwako5', role: 'Super Admin' },
    { email: 'abdurazakm343@admin.com', password: 'THpisvaHUbQNMsbX', role: 'Super Admin' },
    { email: 'student.pasegid@admin.com', password: 'Fs4HwlXCW4SJvkyN', role: 'Super Admin' },
    { email: 'naolaboma@admin.com', password: 'QR7ICwI5s6VMgAZD', role: 'Super Admin' },
    { email: 'museum.admin@ethioheritage360.com', password: 'museum123', role: 'Museum Admin' },
    { email: 'organizer@heritagetours.et', password: 'organizer123', role: 'Tour Organizer' },
    { email: 'tourguide@demo.com', password: 'tourguide123', role: 'Tour Guide' },
    { email: 'test@example.com', password: 'test123456', role: 'Test User' }
  ];
  
  const results = [];
  
  for (const cred of credentials) {
    try {
      console.log(`\n🔍 Testing: ${cred.email} (${cred.role})`);
      const result = await testLogin(cred.email, cred.password);
      
      if (result.status === 200 && result.data.success) {
        console.log(`✅ SUCCESS: ${cred.email} logged in successfully`);
        console.log(`   Role: ${result.data.user.role}`);
        console.log(`   Name: ${result.data.user.name}`);
        results.push({ ...cred, status: 'success', userRole: result.data.user.role });
      } else {
        console.log(`❌ FAILED: ${cred.email} - ${result.data.message || 'Unknown error'}`);
        results.push({ ...cred, status: 'failed', error: result.data.message });
      }
    } catch (error) {
      console.log(`❌ ERROR: ${cred.email} - ${error.message}`);
      results.push({ ...cred, status: 'error', error: error.message });
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('\n🎉 LOGIN TESTING COMPLETED!');
  console.log('===========================');
  
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status !== 'success');
  
  console.log(`✅ Successful logins: ${successful.length}`);
  console.log(`❌ Failed logins: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ WORKING LOGIN CREDENTIALS:');
    console.log('=============================');
    successful.forEach(user => {
      console.log(`✅ ${user.email} / ${user.password} (${user.userRole})`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ FAILED LOGINS:');
    console.log('=================');
    failed.forEach(user => {
      console.log(`❌ ${user.email}: ${user.error || 'Unknown error'}`);
    });
  }
  
  console.log('\n🚀 YOU CAN NOW LOG IN TO YOUR APP!');
  console.log('🔗 https://ethioheritage360-ethiopianheritagepf.netlify.app/');
}

testAllLogins().catch(console.error);
