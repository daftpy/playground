import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import matter from 'gray-matter';
import cors from 'cors';
import { load } from 'cheerio';
import dotenv from 'dotenv';

// Web server settings
const App = express();
const PORT = process.env.PORT || 5000;

// File path variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
App.use(cors());
App.use('/assets', express.static(path.join(__dirname, 'assets')));


const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`)});

// Load local .env file if it exists
if (fs.existsSync(path.resolve(__dirname, `.env.${env}.local`))) {
  dotenv.config({ path: path.resolve(__dirname, `.env.${env}.local`) });
}

// In-memory cache
let postsCache = [];
let lastModified = null;

// Function to load and cache blog posts
async function loadAndCachePosts() {
  // Get the path to the blog posts
  const postDir = path.join(__dirname, "assets", 'blog_posts');
  const currentLastModified = fs.statSync(postDir).mtime;

  // Check the cache.
  if (!lastModified || currentLastModified > lastModified) {
    lastModified = currentLastModified;
    const files = fs.readdirSync(postDir);

    // Loop through the markdown files and parse them.
    postsCache = files.map((file) => {
      const filePath = path.join(postDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content: markdown } = matter(fileContent);
      const content = marked(markdown);
      const updatedContent = updateImageUrl(content, process.env.SERVER_URL);
      if (data.image) {
        data.image = updateImageUrl(`<img src="${data.image}">`, process.env.SERVER_URL).match(/src="([^"]+)"/)[1];
      }
      return { ...data, content: updatedContent };
    });
  }
}

// Blog posts api
App.get(process.env.API_URL, (req, res) => {
  res.json(postsCache);
});

App.get(`${process.env.API_URL}/:postId`, (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const post = postsCache.find((post) => post.id === postId);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : undefined;

App.listen(PORT, host, () => {
  console.log(`Server running on port ${PORT}`);
  loadAndCachePosts(); // Call the function to load and cache blog posts during server startup
  console.log('Posts loaded and cached');
});

function updateImageUrl(html, serverUrl) {
  const cheerioInstance = load(html);
  cheerioInstance('img').each((_, img) => {
    const updatedImg = cheerioInstance(img);
    const src = updatedImg.attr('src');
    if (src.startsWith('../images/')) {
      updatedImg.attr('src', `${serverUrl}${process.env.ASSETS_URL}${src.substring(2)}`)
    }
  });
  return cheerioInstance.html();
}
