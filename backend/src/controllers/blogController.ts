import { Request, Response } from 'express';
import Blog, { IBlog } from '../models/Blog';

export const saveDraft = async (req: Request, res: Response) => {
  try {
    const { id, title, content, tags } = req.body;
    
    if (id) {
      // Update existing draft
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: 'draft' },
        { new: true }
      );
      return res.json(updatedBlog);
    }

    // Create new draft
    const blog = new Blog({
      title,
      content,
      tags,
      status: 'draft'
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error saving draft' });
  }
};

export const publishBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { status: 'published' },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error publishing blog' });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const grouped = {
      drafts: blogs.filter(blog => blog.status === 'draft'),
      published: blogs.filter(blog => blog.status === 'published')
    };
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog' });
  }
};