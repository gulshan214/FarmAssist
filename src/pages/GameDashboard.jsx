import { motion } from 'framer-motion'

function GameDashboard() {
  const achievements = [
    {
      id: 1,
      title: 'Early Bird',
      description: 'Complete 5 daily tasks before 9 AM',
      progress: 80,
      icon: '🌅'
    },
    {
      id: 2,
      title: 'Crop Master',
      description: 'Successfully grow 10 different types of crops',
      progress: 60,
      icon: '🌾'
    },
    {
      id: 3,
      title: 'Market Leader',
      description: 'Earn 1000 points from crop sales',
      progress: 45,
      icon: '💰'
    }
  ]

  const dailyTasks = [
    {
      id: 1,
      task: 'Check crop health',
      points: 10,
      completed: true
    },
    {
      id: 2,
      task: 'Water vegetables',
      points: 15,
      completed: false
    },
    {
      id: 3,
      task: 'Update finance tracker',
      points: 20,
      completed: false
    }
  ]

  const leaderboard = [
    { id: 1, name: 'John Smith', points: 2450, avatar: '👨‍🌾' },
    { id: 2, name: 'Sarah Johnson', points: 2380, avatar: '👩‍🌾' },
    { id: 3, name: 'Mike Brown', points: 2310, avatar: '👨‍🌾' },
    { id: 4, name: 'Emma Davis', points: 2240, avatar: '👩‍🌾' },
    { id: 5, name: 'You', points: 2180, avatar: '👨‍🌾', isUser: true }
  ]

  return (
    <div className="game-dashboard-container">
      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Game Dashboard</h1>
          <p>Track your progress and compete with other farmers</p>
        </motion.div>

        <div className="dashboard-grid">
          <motion.div 
            className="achievements-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Achievements</h2>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{achievement.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="daily-tasks-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Daily Tasks</h2>
            <div className="tasks-list">
              {dailyTasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                  <div className="task-checkbox">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="task-info">
                    <h3>{task.task}</h3>
                    <span className="task-points">+{task.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="leaderboard-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>Leaderboard</h2>
            <div className="leaderboard-list">
              {leaderboard.map((player, index) => (
                <div key={player.id} className={`leaderboard-item ${player.isUser ? 'current-user' : ''}`}>
                  <div className="rank">{index + 1}</div>
                  <div className="player-avatar">{player.avatar}</div>
                  <div className="player-info">
                    <h3>{player.name}</h3>
                    <span className="player-points">{player.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .game-dashboard-container {
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

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-4);
        }

        .achievements-section,
        .daily-tasks-section,
        .leaderboard-section {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          box-shadow: var(--shadow-md);
        }

        .achievements-section h2,
        .daily-tasks-section h2,
        .leaderboard-section h2 {
          font-size: 1.5rem;
          margin-bottom: var(--space-4);
          color: var(--color-gray-900);
        }

        .achievements-grid {
          display: grid;
          gap: var(--space-3);
        }

        .achievement-card {
          display: flex;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
        }

        .achievement-icon {
          font-size: 2rem;
        }

        .achievement-info h3 {
          font-size: 1.1rem;
          margin-bottom: var(--space-1);
          color: var(--color-gray-900);
        }

        .achievement-info p {
          font-size: 0.9rem;
          color: var(--color-gray-600);
          margin-bottom: var(--space-2);
        }

        .progress-bar {
          height: 8px;
          background: var(--color-gray-200);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-1);
        }

        .progress-fill {
          height: 100%;
          background: var(--color-primary);
          border-radius: var(--radius-full);
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          color: var(--color-gray-600);
        }

        .tasks-list {
          display: grid;
          gap: var(--space-2);
        }

        .task-card {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          transition: background-color var(--transition-fast);
        }

        .task-card.completed {
          background: var(--color-gray-100);
          opacity: 0.8;
        }

        .task-checkbox input {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .task-info h3 {
          font-size: 1.1rem;
          margin-bottom: var(--space-1);
          color: var(--color-gray-900);
        }

        .task-points {
          font-size: 0.9rem;
          color: var(--color-primary);
        }

        .leaderboard-list {
          display: grid;
          gap: var(--space-2);
        }

        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
        }

        .leaderboard-item.current-user {
          background: var(--color-primary-light);
          color: var(--color-white);
        }

        .rank {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--color-gray-500);
          min-width: 30px;
        }

        .current-user .rank {
          color: var(--color-white);
        }

        .player-avatar {
          font-size: 1.5rem;
        }

        .player-info h3 {
          font-size: 1.1rem;
          margin-bottom: var(--space-1);
        }

        .player-points {
          font-size: 0.9rem;
          color: var(--color-gray-600);
        }

        .current-user .player-points {
          color: var(--color-white);
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .page-header h1 {
            font-size: 2rem;
          }

          .achievement-card,
          .task-card,
          .leaderboard-item {
            padding: var(--space-2);
          }
        }
      `}</style>
    </div>
  )
}

export default GameDashboard