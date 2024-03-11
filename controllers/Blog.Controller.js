const Blog = require('../models/Blog')

const createBlog = async (req, res) => {
    try {
        // Check if the user making the request is an admin
        if (!req.user || req.user.userType !== 'admin') {
            return res.status(403).json({ error: 'Permission denied. Only admin can Create a Blog.' });
        }
        const { title, content } = req.body;
        const newBlog = new Blog({
            title, content,
            blogId: generateRandomString(), imageUrls: []
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const updatedProperties = req.body;

        // Check if the user making the request is an admin
        if (!req.user || req.user.userType !== 'admin') {
            return res.status(403).json({ error: 'Permission denied. Only admin can delete a blog.' });
        }

        // Find the blog by its ID
        const blog = await Blog.findOne({ blogId: blogId });

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Update the blog properties
        Object.assign(blog, updatedProperties);

        // Save the updated blog
        const updatedBlog = await blog.save();

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const getAllBlogs = async (req, res) => {
//     try {
//         const allBlogs = await Blog.find();
//         res.status(200).json(allBlogs);
//     } catch (error) {
//         console.error('Error fetching blog posts:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const getAllBlogsUser = async (req, res) => {
    try {
        const blog = await Blog.find();
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId;

        if (!blogId) {
            return res.status(400).json({ error: 'Blog post ID is required' });
        }

        // Check if the user making the request is an admin
        if (!req.user || req.user.userType !== 'admin') {
            return res.status(403).json({ error: 'Permission denied. Only admin can delete a blog.' });
        }


        const deletedBlog = await Blog.findOneAndDelete({ blogId: blogId });

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({ message: 'Blog post deleted successfully', deletedBlog });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function generateRandomString() {
    const characters = '0123456789';
    const length = 6;

    let randomString = 'b';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

module.exports = {
    createBlog,
    // getAllBlogs,
    getAllBlogsUser, updateBlogById, deleteBlogById
};
