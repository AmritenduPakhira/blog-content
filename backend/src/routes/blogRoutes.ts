import express from 'express';
import {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById
} from '../controllers/blogController';

const router = express.Router();

router.post('/save-draft', saveDraft);
router.post('/publish/:id', publishBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

export default router;