import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Hỗ trợ cả CLOUDINARY_URL (format: cloudinary://api_key:api_secret@cloud_name)
// hoặc 3 biến riêng: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

if (process.env.CLOUDINARY_URL) {
    // Cloudinary SDK tự động đọc CLOUDINARY_URL từ process.env khi gọi config()
    // Parse URL để extract thông tin cho logging
    try {
        const url = process.env.CLOUDINARY_URL;
        const match = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
        
        if (match) {
            const [, api_key, , cloud_name] = match;
            cloudinary.config();
            console.log('✅ Cloudinary configured using CLOUDINARY_URL');
            console.log('   Cloud name:', cloud_name);
            console.log('   API key:', api_key.substring(0, 4) + '***');
        } else {
            // Fallback: để Cloudinary tự động đọc từ env
            cloudinary.config();
            console.log('✅ Cloudinary configured (auto-detect from CLOUDINARY_URL)');
        }
    } catch (error) {
        // Fallback: để Cloudinary tự động đọc từ env
        cloudinary.config();
        console.log('✅ Cloudinary configured (auto-detect from CLOUDINARY_URL)');
    }
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    // Sử dụng 3 biến riêng nếu có
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('✅ Cloudinary configured using individual variables');
    console.log('   Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
    console.warn('⚠️ Cloudinary config not found!');
    console.warn('   Please set either:');
    console.warn('   - CLOUDINARY_URL (format: cloudinary://api_key:api_secret@cloud_name)');
    console.warn('   - OR CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}

export default cloudinary;
