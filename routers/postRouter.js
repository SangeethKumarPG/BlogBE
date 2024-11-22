const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

const jwtMiddleWare = require('../middlewares/jwtMiddleWare');
const multerMiddleware = require('../middlewares/multerMiddleWare');

router.post('/create', jwtMiddleWare, multerMiddleware.single('image'), postController.createPost);
router.get('/all', jwtMiddleWare, postController.getPosts);
router.put('/update/:id', jwtMiddleWare, multerMiddleware.single('image'), postController.editPost);
router.delete('/delete/:id', jwtMiddleWare, postController.deletePost);

module.exports = router;