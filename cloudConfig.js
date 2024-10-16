const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ // ref- cloudinary doc & here will create a connection of cloudinary with backend
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'wanderlust',
      allowedFormats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

module.exports = { cloudinary, storage }