require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./DB/connection');
const userRouter = require('./routers/userRoutes');
const postRouter = require('./routers/postRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);

app.use('/uploads',express.static('./uploads'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
