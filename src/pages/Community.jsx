import { motion } from 'framer-motion'

function Community() {
  const posts = [
    {
      id: 1,
      author: 'John Smith',
      avatar: '👨‍🌾',
      content: 'Just implemented crop rotation and seeing great results! Anyone else tried this?',
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      avatar: '👩‍🌾',
      content: 'Looking for advice on organic pest control methods. What works best for you?',
      likes: 15,
      comments: 12,
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      author: 'Mike Brown',
      avatar: '👨‍🌾',
      content: 'Check out my latest harvest! Using the new techniques from last month\'s workshop.',
      likes: 32,
      comments: 6,
      timeAgo: '6 hours ago'
    }
  ]

  return (
    <div className="community-container">
      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Farmer Community</h1>
          <p>Connect, share, and learn from fellow farmers</p>
        </motion.div>

        <div className="community-layout">
          <main className="main-content">
            <div className="create-post">
              <div className="post-input">
                <div className="user-avatar">👨‍🌾</div>
                <input 
                  type="text" 
                  placeholder="Share your farming experience..."
                  className="post-text-input"
                />
              </div>
              <div className="post-actions">
                <button className="btn btn-secondary">Add Photo</button>
                <button className="btn btn-primary">Post</button>
              </div>
            </div>

            <div className="posts-feed">
              {posts.map(post => (
                <motion.div 
                  key={post.id}
                  className="post-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="post-header">
                    <div className="post-author">
                      <div className="author-avatar">{post.avatar}</div>
                      <div className="author-info">
                        <h3>{post.author}</h3>
                        <span className="post-time">{post.timeAgo}</span>
                      </div>
                    </div>
                    <button className="post-menu">•••</button>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>
                  
                  <div className="post-footer">
                    <button className="post-action">
                      <span>👍</span> {post.likes}
                    </button>
                    <button className="post-action">
                      <span>💬</span> {post.comments}
                    </button>
                    <button className="post-action">
                      <span>↗️</span> Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>

          <aside className="sidebar">
            <div className="community-stats">
              <h2>Community Stats</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">1,234</div>
                  <div className="stat-label">Members</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">456</div>
                  <div className="stat-label">Posts Today</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">89</div>
                  <div className="stat-label">Active Now</div>
                </div>
              </div>
            </div>

            <div className="trending-topics">
              <h2>Trending Topics</h2>
              <ul className="topics-list">
                <li>#OrganicFarming</li>
                <li>#CropRotation</li>
                <li>#SustainableAg</li>
                <li>#FarmTech</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .community-container {
          padding: var(--space-4) 0;
          min-height: 100vh;
          background-color: var(--color-gray-100);
        }

        .page-header {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .page-header h1 {
          font-size: 2.5rem;
          color: var(--color-gray-900);
          margin-bottom: var(--space-2);
        }

        .page-header p {
          color: var(--color-gray-600);
          font-size: 1.1rem;
        }

        .community-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--space-4);
        }

        .create-post {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
          box-shadow: var(--shadow-md);
        }

        .post-input {
          display: flex;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .user-avatar {
          font-size: 2rem;
        }

        .post-text-input {
          flex: 1;
          padding: var(--space-2) var(--space-3);
          border: 1px solid var(--color-gray-300);
          border-radius: var(--radius-md);
          font-size: 1rem;
        }

        .post-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-2);
        }

        .post-card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
          box-shadow: var(--shadow-md);
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
        }

        .post-author {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .author-avatar {
          font-size: 2rem;
        }

        .author-info h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--color-gray-900);
        }

        .post-time {
          font-size: 0.9rem;
          color: var(--color-gray-500);
        }

        .post-menu {
          background: none;
          border: none;
          color: var(--color-gray-500);
          cursor: pointer;
        }

        .post-content {
          margin-bottom: var(--space-3);
          color: var(--color-gray-800);
        }

        .post-footer {
          display: flex;
          gap: var(--space-4);
          padding-top: var(--space-3);
          border-top: 1px solid var(--color-gray-200);
        }

        .post-action {
          background: none;
          border: none;
          color: var(--color-gray-600);
          display: flex;
          align-items: center;
          gap: var(--space-1);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .post-action:hover {
          color: var(--color-primary);
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .community-stats, .trending-topics {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          box-shadow: var(--shadow-md);
        }

        .community-stats h2, .trending-topics h2 {
          font-size: 1.25rem;
          margin-bottom: var(--space-3);
          color: var(--color-gray-900);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-2);
        }

        .stat-card {
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--color-gray-600);
        }

        .topics-list {
          list-style: none;
          padding: 0;
        }

        .topics-list li {
          padding: var(--space-2);
          color: var(--color-primary);
          cursor: pointer;
          transition: background-color var(--transition-fast);
          border-radius: var(--radius-md);
        }

        .topics-list li:hover {
          background-color: var(--color-gray-100);
        }

        @media (max-width: 1024px) {
          .community-layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            order: -1;
            margin-bottom: var(--space-4);
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .post-input {
            flex-direction: column;
          }

          .post-actions {
            flex-direction: column;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: var(--space-3);
          }
        }
      `}</style>
    </div>
  )
}

export default Community