// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// dotenv.config();

// const port = process.env.PORT || 5001;

// const commentRoutes = require('./src/routes/commentRoutes');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DB_URL);
//         console.log('✅ Kết nối MongoDB thành công');
//     } catch (error) {
//         console.error('❌ Lỗi kết nối MongoDB:', error.message);
//     }
// };
// connectDB();

// const app = express();

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cookieParser());
// app.use(cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:5173',
//     credentials: true, 
// }));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/comments', commentRoutes);
// app.get('/', (req, res) => {
//     res.send('✅ API đang chạy');
// });

// app.listen(port, () => {
//     console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
// });


