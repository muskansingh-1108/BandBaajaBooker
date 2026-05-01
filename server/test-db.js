const mongoose = require('mongoose');
require('dotenv').config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');
        
        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
        const users = await User.find().select('-password');
        
        console.log('\n👥 USERS IN DATABASE:');
        console.table(users.map(u => ({ 
            id: u._id.toString(), 
            email: u.email, 
            role: u.role || 'user' 
        })));
        
        if (users.length === 0) {
            console.log('❌ NO USERS FOUND - Create one first!');
        }
        
        mongoose.connection.close();
    } catch (error) {
        console.error('❌ MongoDB Error:', error.message);
    }
}

checkUsers();
