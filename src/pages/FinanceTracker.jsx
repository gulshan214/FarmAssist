import { useState } from 'react'
import { motion } from 'framer-motion'
import { Chart, registerables } from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

// Register Chart.js components
Chart.register(...registerables)

function FinanceTracker() {
  const [activeTab, setActiveTab] = useState('overview')
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', category: 'Sales', amount: 1500, date: '2025-02-15', source: 'Market' },
    { id: 2, type: 'expense', category: 'Fertilizer', amount: 250, date: '2025-02-10', source: 'AgriStore' },
    { id: 3, type: 'income', category: 'Subsidy', amount: 800, date: '2025-02-05', source: 'Government' },
    { id: 4, type: 'expense', category: 'Seeds', amount: 175, date: '2025-01-30', source: 'Seeds Co.' },
    { id: 5, type: 'expense', category: 'Equipment', amount: 450, date: '2025-01-25', source: 'Farm Supply' },
  ])
  
  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: 'New Tractor', target: 12000, current: 5500, deadline: '2025-12-31' },
    { id: 2, name: 'Irrigation System', target: 5000, current: 2000, deadline: '2025-08-15' }
  ])

  // Calculate financial summary
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const netProfit = totalIncome - totalExpenses

  // Chart data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [2200, 2500, 3000, 2800, 3200, 3500],
        borderColor: 'rgba(25, 118, 210, 1)',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: [1800, 1700, 2000, 1900, 2100, 2200],
        borderColor: 'rgba(244, 67, 54, 1)',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const expenseBreakdown = {
    labels: ['Seeds', 'Fertilizer', 'Equipment', 'Labor', 'Fuel', 'Other'],
    datasets: [
      {
        label: 'Expenses by Category',
        data: [175, 450, 650, 500, 320, 210],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  }

  const incomeBySource = {
    labels: ['Crop Sales', 'Livestock', 'Subsidies', 'Other'],
    datasets: [
      {
        data: [4500, 1200, 800, 300],
        backgroundColor: [
          'rgba(46, 125, 50, 0.7)',
          'rgba(25, 118, 210, 0.7)',
          'rgba(251, 140, 0, 0.7)',
          'rgba(156, 39, 176, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  }

  // Add new transaction
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    source: ''
  })

  const handleTransactionChange = (e) => {
    const { name, value } = e.target
    setNewTransaction(prev => ({
      ...prev,
      [name]: name === 'amount' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const addTransaction = (e) => {
    e.preventDefault()
    if (!newTransaction.category || !newTransaction.amount || !newTransaction.date || !newTransaction.source) {
      return
    }

    const transaction = {
      id: transactions.length + 1,
      ...newTransaction
    }

    setTransactions([transaction, ...transactions])
    setNewTransaction({
      type: 'income',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      source: ''
    })
  }

  // Add new savings goal
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    current: '',
    deadline: ''
  })

  const handleGoalChange = (e) => {
    const { name, value } = e.target
    setNewGoal(prev => ({
      ...prev,
      [name]: name === 'target' || name === 'current' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const addGoal = (e) => {
    e.preventDefault()
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      return
    }

    const goal = {
      id: savingsGoals.length + 1,
      ...newGoal,
      current: newGoal.current || 0
    }

    setSavingsGoals([...savingsGoals, goal])
    setNewGoal({
      name: '',
      target: '',
      current: '',
      deadline: ''
    })
  }

  return (
    <div className="finance-tracker-container">
      <div className="container">
        <div className="page-header">
          <h1>Finance Tracker</h1>
          <p>Track your farm's income, expenses, and savings goals</p>
        </div>

        <div className="finance-summary">
          <motion.div 
            className="summary-card income"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="summary-icon">💰</div>
            <div className="summary-content">
              <h3>Total Income</h3>
              <p className="summary-amount">${totalIncome.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div 
            className="summary-card expenses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="summary-icon">📉</div>
            <div className="summary-content">
              <h3>Total Expenses</h3>
              <p className="summary-amount">${totalExpenses.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div 
            className="summary-card profit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="summary-icon">📊</div>
            <div className="summary-content">
              <h3>Net Profit</h3>
              <p className={`summary-amount ${netProfit >= 0 ? 'positive' : 'negative'}`}>
                ${netProfit.toLocaleString()}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="finance-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={`tab-button ${activeTab === 'savings' ? 'active' : ''}`}
            onClick={() => setActiveTab('savings')}
          >
            Savings Goals
          </button>
          <button 
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="charts-grid">
                <div className="chart-card">
                  <h3>Monthly Income & Expenses</h3>
                  <div className="chart-container">
                    <Line data={monthlyData} />
                  </div>
                </div>

                <div className="chart-card">
                  <h3>Expense Breakdown</h3>
                  <div className="chart-container">
                    <Bar data={expenseBreakdown} />
                  </div>
                </div>

                <div className="chart-card">
                  <h3>Income by Source</h3>
                  <div className="chart-container">
                    <Doughnut data={incomeBySource} />
                  </div>
                </div>

                <div className="chart-card">
                  <h3>Financial Health</h3>
                  <div className="financial-health">
                    <div className="health-metric">
                      <h4>Profit Margin</h4>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(netProfit / totalIncome) * 100}%` }}></div>
                      </div>
                      <p>{Math.round((netProfit / totalIncome) * 100)}%</p>
                    </div>
                    <div className="health-metric">
                      <h4>Expense Ratio</h4>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(totalExpenses / totalIncome) * 100}%` }}></div>
                      </div>
                      <p>{Math.round((totalExpenses / totalIncome) * 100)}%</p>
                    </div>
                    <div className="health-metric">
                      <h4>Savings Rate</h4>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '25%' }}></div>
                      </div>
                      <p>25%</p>
                    </div>
                    <div className="health-tips">
                      <h4>Tips to Improve</h4>
                      <ul>
                        <li>Consider bulk purchases of fertilizer to reduce costs</li>
                        <li>Explore government subsidies for sustainable farming</li>
                        <li>Track market prices to optimize selling times</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="transactions-tab">
              <div className="add-transaction-form">
                <h3>Add New Transaction</h3>
                <form onSubmit={addTransaction}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="type">Type</label>
                      <select 
                        id="type" 
                        name="type" 
                        value={newTransaction.type}
                        onChange={handleTransactionChange}
                        required
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        placeholder={newTransaction.type === 'income' ? 'e.g., Crop Sales' : 'e.g., Fertilizer'}
                        value={newTransaction.category}
                        onChange={handleTransactionChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="amount">Amount ($)</label>
                      <input 
                        type="number" 
                        id="amount" 
                        name="amount" 
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={newTransaction.amount}
                        onChange={handleTransactionChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={newTransaction.date}
                        onChange={handleTransactionChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="source">Source/Vendor</label>
                      <input 
                        type="text" 
                        id="source" 
                        name="source" 
                        placeholder={newTransaction.type === 'income' ? 'e.g., Farmers Market' : 'e.g., Farm Supply Store'}
                        value={newTransaction.source}
                        onChange={handleTransactionChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">Add Transaction</button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="transactions-list">
                <h3>Recent Transactions</h3>
                <div className="transactions-filters">
                  <select defaultValue="all">
                    <option value="all">All Transactions</option>
                    <option value="income">Income Only</option>
                    <option value="expense">Expenses Only</option>
                  </select>
                  <input type="month" />
                </div>
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Source/Vendor</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(transaction => (
                      <tr key={transaction.id} className={transaction.type}>
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td className="transaction-type">
                          <span className={`type-badge ${transaction.type}`}>
                            {transaction.type === 'income' ? 'Income' : 'Expense'}
                          </span>
                        </td>
                        <td>{transaction.category}</td>
                        <td>{transaction.source}</td>
                        <td className="amount">
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'savings' && (
            <div className="savings-tab">
              <div className="savings-container">
                <div className="add-goal-form">
                  <h3>Add New Savings Goal</h3>
                  <form onSubmit={addGoal}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Goal Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          placeholder="e.g., New Tractor"
                          value={newGoal.name}
                          onChange={handleGoalChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="target">Target Amount ($)</label>
                        <input 
                          type="number" 
                          id="target" 
                          name="target" 
                          min="1"
                          placeholder="0.00"
                          value={newGoal.target}
                          onChange={handleGoalChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="current">Current Savings ($)</label>
                        <input 
                          type="number" 
                          id="current" 
                          name="current" 
                          min="0"
                          placeholder="0.00"
                          value={newGoal.current}
                          onChange={handleGoalChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="deadline">Target Date</label>
                        <input 
                          type="date" 
                          id="deadline" 
                          name="deadline" 
                          value={newGoal.deadline}
                          onChange={handleGoalChange}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Goal</button>
                  </form>
                </div>

                <div className="savings-goals-list">
                  <h3>Your Savings Goals</h3>
                  <div className="goals-grid">
                    {savingsGoals.map(goal => {
                      const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100))
                      const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
                      
                      return (
                        <div key={goal.id} className="goal-card">
                          <div className="goal-header">
                            <h4>{goal.name}</h4>
                            <div className="days-left">
                              {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                            </div>
                          </div>
                          <div className="goal-amounts">
                            <div className="saved-amount">${goal.current.toLocaleString()}</div>
                            <div className="target-amount">of ${goal.target.toLocaleString()}</div>
                          </div>
                          <div className="goal-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="progress-percentage">{percentage}%</div>
                          </div>
                          <div className="goal-actions">
                            <button className="btn btn-secondary btn-sm">Update Progress</button>
                            <button className="btn btn-outline btn-sm">Edit</button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="savings-tips">
                <h3>Savings Tips</h3>
                <div className="tips-grid">
                  <div className="tip-card">
                    <div className="tip-icon">💡</div>
                    <h4>Set Aside Revenue</h4>
                    <p>Automatically save 10-15% of each sale to build your emergency fund and savings goals.</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">📊</div>
                    <h4>Track Market Prices</h4>
                    <p>Monitor price trends to sell crops at peak prices, maximizing your income potential.</p>
                  </div>
                  <div className="tip-card">
                    <div className="tip-icon">🧮</div>
                    <h4>Bulk Purchasing</h4>
                    <p>Coordinate with nearby farmers to make bulk purchases of supplies at discounted rates.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="reports-tab">
              <div className="reports-header">
                <h3>Financial Reports</h3>
                <div className="report-period-select">
                  <select defaultValue="2025">
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                  <select defaultValue="all">
                    <option value="all">All Months</option>
                    <option value="q1">Q1 (Jan-Mar)</option>
                    <option value="q2">Q2 (Apr-Jun)</option>
                    <option value="q3">Q3 (Jul-Sep)</option>
                    <option value="q4">Q4 (Oct-Dec)</option>
                  </select>
                </div>
              </div>

              <div className="reports-grid">
                <div className="report-card">
                  <h4>Income Statement</h4>
                  <div className="report-preview">
                    <table className="report-table">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="section-header">
                          <td colSpan="2">Income</td>
                        </tr>
                        <tr>
                          <td>Crop Sales</td>
                          <td>$4,500</td>
                        </tr>
                        <tr>
                          <td>Livestock</td>
                          <td>$1,200</td>
                        </tr>
                        <tr>
                          <td>Subsidies</td>
                          <td>$800</td>
                        </tr>
                        <tr>
                          <td>Other Income</td>
                          <td>$300</td>
                        </tr>
                        <tr className="total-row">
                          <td>Total Income</td>
                          <td>$6,800</td>
                        </tr>
                        <tr className="section-header">
                          <td colSpan="2">Expenses</td>
                        </tr>
                        <tr>
                          <td>Seeds</td>
                          <td>$175</td>
                        </tr>
                        <tr>
                          <td>Fertilizer</td>
                          <td>$450</td>
                        </tr>
                        <tr>
                          <td>Equipment</td>
                          <td>$650</td>
                        </tr>
                        <tr>
                          <td>Labor</td>
                          <td>$500</td>
                        </tr>
                        <tr>
                          <td>Fuel</td>
                          <td>$320</td>
                        </tr>
                        <tr>
                          <td>Other Expenses</td>
                          <td>$210</td>
                        </tr>
                        <tr className="total-row">
                          <td>Total Expenses</td>
                          <td>$2,305</td>
                        </tr>
                        <tr className="net-profit">
                          <td>Net Profit</td>
                          <td>$4,495</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="report-actions">
                    <button className="btn btn-primary btn-sm">Download PDF</button>
                    <button className="btn btn-secondary btn-sm">Export CSV</button>
                  </div>
                </div>

                <div className="report-card">
                  <h4>Cash Flow</h4>
                  <div className="report-preview">
                    <div className="chart-container">
                      <Bar 
                        data={{
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                          datasets: [
                            {
                              label: 'Cash Flow',
                              data: [400, 800, 1000, 900, 1100, 1300],
                              backgroundColor: 'rgba(46, 125, 50, 0.7)',
                            }
                          ]
                        }}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="report-summary">
                    <div className="summary-item">
                      <span>Starting Balance:</span>
                      <span>$2,500</span>
                    </div>
                    <div className="summary-item">
                      <span>Ending Balance:</span>
                      <span>$5,500</span>
                    </div>
                    <div className="summary-item positive">
                      <span>Net Change:</span>
                      <span>+$3,000</span>
                    </div>
                  </div>
                </div>

                <div className="report-card">
                  <h4>Tax Summary</h4>
                  <div className="report-preview">
                    <div className="tax-summary">
                      <div className="tax-category">
                        <h5>Total Taxable Income</h5>
                        <p>$6,800</p>
                      </div>
                      <div className="tax-category">
                        <h5>Deductible Expenses</h5>
                        <p>$2,305</p>
                      </div>
                      <div className="tax-category">
                        <h5>Estimated Tax Liability</h5>
                        <p>$900</p>
                      </div>
                      <div className="tax-category">
                        <h5>Available Tax Credits</h5>
                        <p>$250</p>
                      </div>
                    </div>
                    <div className="tax-notes">
                      <p><strong>Note:</strong> This is an estimate. Consult with a tax professional for accurate tax planning.</p>
                    </div>
                  </div>
                  <div className="report-actions">
                    <button className="btn btn-primary btn-sm">Download Tax Report</button>
                  </div>
                </div>

                <div className="report-card">
                  <h4>Financial Ratios</h4>
                  <div className="report-preview">
                    <div className="ratios-list">
                      <div className="ratio-item">
                        <div className="ratio-info">
                          <h5>Profit Margin</h5>
                          <p>Net Profit / Total Income</p>
                        </div>
                        <div className="ratio-value positive">66%</div>
                      </div>
                      <div className="ratio-item">
                        <div className="ratio-info">
                          <h5>Return on Investment</h5>
                          <p>Net Profit / Total Investment</p>
                        </div>
                        <div className="ratio-value positive">34%</div>
                      </div>
                      <div className="ratio-item">
                        <div className="ratio-info">
                          <h5>Debt-to-Income</h5>
                          <p>Total Debt / Annual Income</p>
                        </div>
                        <div className="ratio-value warning">45%</div>
                      </div>
                      <div className="ratio-item">
                        <div className="ratio-info">
                          <h5>Current Ratio</h5>
                          <p>Current Assets / Current Liabilities</p>
                        </div>
                        <div className="ratio-value positive">2.3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FinanceTracker