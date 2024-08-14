import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dskcvks89',
    api_key: '341414854685832',
    api_secret: 'ZYu7TTgBbrjk_LFUpthDoTuPDHA',
});

// Cloudinary storage configuration for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Optional: folder where images will be stored
        // Remove 'allowed_formats' to accept all formats
    },
});

const upload = multer({ storage: storage });

export { upload };
