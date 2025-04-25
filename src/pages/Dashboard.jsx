import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

// Import Chart.js components
import { Chart, registerables } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

// Register Chart.js components
Chart.register(...registerables)

function Dashboard() {
  const { currentUser } = useAuth()
  const [weatherData, setWeatherData] = useState(null)
  const [cropHealth, setCropHealth] = useState(85)
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Apply fertilizer to corn field', completed: false, points: 10 },
    { id: 2, title: 'Check irrigation system', completed: true, points: 5 },
    { id: 3, title: 'Monitor wheat growth', completed: false, points: 8 },
    { id: 4, title: 'Update finance tracker', completed: false, points: 7 }
  ])

  // Mock data for charts
  const cropHealthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Crop Health Score',
        data: [65, 72, 78, 75, 82, 85],
        fill: true,
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        borderColor: 'rgba(46, 125, 50, 1)',
        tension: 0.4
      }
    ]
  }

  const financialData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        data: [4500, 2800, 1200],
        backgroundColor: [
          'rgba(25, 118, 210, 0.7)',
          'rgba(244, 67, 54, 0.7)',
          'rgba(76, 175, 80, 0.7)'
        ],
        borderColor: [
          'rgba(25, 118, 210, 1)',
          'rgba(244, 67, 54, 1)',
          'rgba(76, 175, 80, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  // Calculate completed tasks
  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  // Simulate weather data fetch
  useEffect(() => {
    setTimeout(() => {
      setWeatherData({
        temp: 28,
        humidity: 65,
        wind: 12,
        forecast: 'Sunny'
      })
    }, 1000)
  }, [])

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <h1>Welcome back, {currentUser.name}!</h1>
            <p className="dashboard-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="dashboard-actions">
            <Link to="/image-upload" className="btn btn-primary">
              Analyze Crop
            </Link>
          </div>
        </div>

        <div className="dashboard-stats-grid">
          {/* Weather Widget */}
          <motion.div 
            className="dashboard-card weather-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Weather Conditions</h3>
            {weatherData ? (
              <div className="weather-info">
                <div className="weather-icon">
                  {weatherData.forecast === 'Sunny' ? '☀️' : 
                    weatherData.forecast === 'Cloudy' ? '☁️' : 
                    weatherData.forecast === 'Rainy' ? '🌧️' : '❓'}
                </div>
                <div className="weather-details">
                  <p className="weather-temp">{weatherData.temp}°C</p>
                  <p>{weatherData.forecast}</p>
                  <div className="weather-metrics">
                    <span>💧 {weatherData.humidity}%</span>
                    <span>💨 {weatherData.wind} km/h</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="loading-spinner">Loading weather data...</div>
            )}
          </motion.div>

          {/* Points & Achievements */}
          <motion.div 
            className="dashboard-card points-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Points & Achievements</h3>
            <div className="points-info">
              <div className="points-total">
                <span className="points-icon">🏆</span>
                <span className="points-number">{currentUser.points}</span>
                <span className="points-label">Total Points</span>
              </div>
              <div className="rank-info">
                <p>Current Rank: <strong>Growing Farmer</strong></p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(currentUser.points / 200) * 100}%` }}
                  ></div>
                </div>
                <p className="next-rank">80 points to <strong>Master Farmer</strong></p>
              </div>
            </div>
            <Link to="/game" className="btn btn-secondary btn-sm">View All Achievements</Link>
          </motion.div>

          {/* Crop Health */}
          <motion.div 
            className="dashboard-card crop-health-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Crop Health Overview</h3>
            <div className="crop-health-chart">
              <Line data={cropHealthData} options={{ 
                plugins: { legend: { display: false } },
                scales: { y: { min: 0, max: 100 } }
              }} />
            </div>
            <div className="crop-health-score">
              <div className="circular-progress">
                <svg width="80" height="80">
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="5"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    fill="none"
                    stroke={cropHealth > 70 ? "var(--color-success)" : 
                           cropHealth > 40 ? "var(--color-warning)" : 
                           "var(--color-error)"}
                    strokeWidth="5"
                    strokeDasharray={`${2 * Math.PI * 35 * cropHealth / 100} ${2 * Math.PI * 35 * (1 - cropHealth / 100)}`}
                    strokeDashoffset={2 * Math.PI * 35 * 0.25}
                    transform="rotate(-90 40 40)"
                  />
                  <text x="40" y="45" textAnchor="middle" fontSize="16" fontWeight="bold" fill="var(--color-gray-800)">
                    {cropHealth}%
                  </text>
                </svg>
              </div>
              <div className="health-details">
                <p>Overall crop health is <strong>{cropHealth}%</strong></p>
                <p>Last updated: 2 hours ago</p>
              </div>
            </div>
          </motion.div>

          {/* Financial Summary */}
          <motion.div 
            className="dashboard-card finance-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>Financial Summary</h3>
            <div className="finance-chart">
              <Doughnut data={financialData} options={{ 
                plugins: { 
                  legend: { position: 'right' },
                  tooltip: { callbacks: { label: function(context) { return `$${context.raw}`; } } }
                },
                cutout: '70%',
              }} />
            </div>
            <div className="finance-summary">
              <div className="finance-item">
                <span className="finance-label">Total Income:</span>
                <span className="finance-value">$4,500</span>
              </div>
              <div className="finance-item">
                <span className="finance-label">Expenses:</span>
                <span className="finance-value">$2,800</span>
              </div>
              <div className="finance-item">
                <span className="finance-label">Net Profit:</span>
                <span className="finance-value positive">$1,700</span>
              </div>
            </div>
            <Link to="/finance" className="btn btn-secondary btn-sm">View Detailed Finances</Link>
          </motion.div>
        </div>

        <div className="dashboard-bottom-grid">
          {/* Daily Tasks */}
          <motion.div 
            className="dashboard-card tasks-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="card-header">
              <h3>Daily Tasks</h3>
              <div className="task-completion">
                <span>{completedTasks}/{totalTasks} completed</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <ul className="tasks-list">
              {tasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-checkbox-container">
                    <input
                      type="checkbox"
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label htmlFor={`task-${task.id}`} className="task-checkbox"></label>
                  </div>
                  <div className="task-content">
                    <span className="task-title">{task.title}</span>
                    <span className="task-points">+{task.points} points</span>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary btn-sm">View All Tasks</button>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            className="dashboard-card activity-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              <li className="activity-item">
                <div className="activity-icon green">🏆</div>
                <div className="activity-content">
                  <p className="activity-text">You earned <strong>15 points</strong> for completing daily tasks</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-icon blue">🌱</div>
                <div className="activity-content">
                  <p className="activity-text">Crop health improved by <strong>5%</strong> this week</p>
                  <span className="activity-time">1 day ago</span>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-icon orange">📊</div>
                <div className="activity-content">
                  <p className="activity-text">Added <strong>$500</strong> to your income tracker</p>
                  <span className="activity-time">2 days ago</span>
                </div>
              </li>
              <li className="activity-item">
                <div className="activity-icon purple">🏅</div>
                <div className="activity-content">
                  <p className="activity-text">Unlocked <strong>"Early Bird"</strong> achievement</p>
                  <span className="activity-time">3 days ago</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Community Highlights */}
          <motion.div 
            className="dashboard-card community-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>Community Highlights</h3>
            <div className="leaderboard-preview">
              <h4>Top Farmers This Week</h4>
              <ul className="leaderboard-list">
                <li className="leaderboard-item">
                  <div className="leaderboard-rank">1</div>
                  <div className="leaderboard-user">
                    <span className="user-avatar">👨‍🌾</span>
                    <span className="user-name">John Smith</span>
                  </div>
                  <div className="leaderboard-points">235 pts</div>
                </li>
                <li className="leaderboard-item">
                  <div className="leaderboard-rank">2</div>
                  <div className="leaderboard-user">
                    <span className="user-avatar">👩‍🌾</span>
                    <span className="user-name">Sarah Johnson</span>
                  </div>
                  <div className="leaderboard-points">212 pts</div>
                </li>
                <li className="leaderboard-item">
                  <div className="leaderboard-rank">3</div>
                  <div className="leaderboard-user">
                    <span className="user-avatar">👨‍🌾</span>
                    <span className="user-name">Michael Brown</span>
                  </div>
                  <div className="leaderboard-points">198 pts</div>
                </li>
                <li className="leaderboard-item you">
                  <div className="leaderboard-rank">8</div>
                  <div className="leaderboard-user">
                    <span className="user-avatar">👨‍🌾</span>
                    <span className="user-name">You</span>
                  </div>
                  <div className="leaderboard-points">{currentUser.points} pts</div>
                </li>
              </ul>
            </div>
            <Link to="/community" className="btn btn-secondary btn-sm">View Community</Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard