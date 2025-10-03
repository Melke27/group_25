// Create users with exact credentials from seed.js
const https = require('https');

console.log('🔧 Creating users with EXACT credentials from seed.js...');
console.log('======================================================');

// Function to create a user via registration API
async function createUser(userData) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(userData);
    
    const options = {
      hostname: 'ethioheritage360-ethiopian-heritage.onrender.com',
      port: 443,
      path: '/api/auth/register',
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

// Users from seed.js - EXACT credentials
const users = [
  {
    name: 'Melkamu Wako',
    email: 'melkamuwako5@admin.com',
    password: 'melkamuwako5',
    role: 'super_admin'
  },
  {
    name: 'Abdurazak M',
    email: 'abdurazakm343@admin.com',
    password: 'THpisvaHUbQNMsbX',
    role: 'super_admin'
  },
  {
    name: 'Student Pasegid',
    email: 'student.pasegid@admin.com',
    password: 'Fs4HwlXCW4SJvkyN',
    role: 'super_admin'
  },
  {
    name: 'Naol Aboma',
    email: 'naolaboma@admin.com',
    password: 'QR7ICwI5s6VMgAZD',
    role: 'super_admin'
  },
  {
    name: 'National Museum Admin',
    email: 'museum.admin@ethioheritage360.com',
    password: 'museum123',
    role: 'admin'
  },
  {
    name: 'Heritage Tours Ethiopia',
    email: 'organizer@heritagetours.et',
    password: 'organizer123',
    role: 'tour_organizer'
  },
  {
    name: 'Tour Guide Demo',
    email: 'tourguide@demo.com',
    password: 'tourguide123',
    role: 'visitor'
  },
  {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123456',
    role: 'visitor'
  }
];

async function seedAllUsers() {
  console.log(`\n🚀 Creating ${users.length} users...`);
  console.log('================================');
  
  const results = [];
  
  for (const user of users) {
    try {
      console.log(`\n📧 Creating: ${user.email}`);
      const result = await createUser(user);
      
      if (result.status === 201) {
        console.log(`✅ SUCCESS: ${user.email} created`);
        results.push({ ...user, status: 'created', success: true });
      } else if (result.status === 400 && result.data.message?.includes('already exists')) {
        console.log(`ℹ️  EXISTS: ${user.email} already exists`);
        results.push({ ...user, status: 'exists', success: true });
      } else {
        console.log(`❌ FAILED: ${user.email} - ${result.data.message || 'Unknown error'}`);
        results.push({ ...user, status: 'failed', success: false, error: result.data.message });
      }
    } catch (error) {
      console.log(`❌ ERROR: ${user.email} - ${error.message}`);
      results.push({ ...user, status: 'error', success: false, error: error.message });
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n🎉 SEEDING COMPLETED!');
  console.log('===================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed users:');
    failed.forEach(user => {
      console.log(`  - ${user.email}: ${user.error || 'Unknown error'}`);
    });
  }
  
  console.log('\n🔑 CORRECTED LOGIN CREDENTIALS:');
  console.log('='.repeat(50));
  console.log('\n🔥 Super Admins:');
  console.log('1. melkamuwako5@admin.com / melkamuwako5');
  console.log('2. abdurazakm343@admin.com / THpisvaHUbQNMsbX');
  console.log('3. student.pasegid@admin.com / Fs4HwlXCW4SJvkyN');
  console.log('4. naolaboma@admin.com / QR7ICwI5s6VMgAZD');
  console.log('\n🏛️ Museum Admin:');
  console.log('5. museum.admin@ethioheritage360.com / museum123');
  console.log('\n🗺️ Tour Organizers:');
  console.log('6. organizer@heritagetours.et / organizer123');
  console.log('7. tourguide@demo.com / tourguide123');
  console.log('\n🧪 Test User:');
  console.log('8. test@example.com / test123456');
  console.log('='.repeat(50));
  
  console.log('\n🚀 Try logging in with any of these credentials!');
  console.log('🔗 https://ethioheritage360-ethiopianheritagepf.netlify.app/');
}

seedAllUsers().catch(console.error);
