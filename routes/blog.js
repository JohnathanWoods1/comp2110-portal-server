const express = require('express');
const post = require('../controllers/post.js');

const router = express.Router();


router.get('/', post.getPosts );
router.get('/:id', post.getPost);
router.post('/', post.createPost);

module.exports = router;

import { LitElement, html } from 'lit';

class BlogPostList extends LitElement {
  static get properties() {
    return {
      posts: { type: Array },
    };
  }

  constructor() {
    super();
    this.posts = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    try {
      const response = await fetch('/blog');
      if (!response.ok) {
        throw new Error('Error fetching blog posts');
      }
      const data = await response.json();
      this.posts = data.posts;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return html`
      <h2>Recent Blog Posts</h2>
      <ul>
        ${this.posts.map(
          (post) => html`
            <li>
              <h3>${post.title}</h3>
              <p>${post.content}</p>
              <small>By ${post.name} on ${new Date(post.timestamp).toLocaleDateString()}</small>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('blog-post-list', BlogPostList);