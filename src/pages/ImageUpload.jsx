import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      processFile(droppedFile)
    } else {
      setError('Please drop an image file')
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      processFile(selectedFile)
    } else {
      setError('Please select an image file')
      setTimeout(() => setError(null), 3000)
    }
  }

  const processFile = (file) => {
    setFile(file)
    setError(null)
    setResult(null)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = () => {
    if (!file) return
    
    setAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock results - in a real app this would come from your ML model
      const mockResults = {
        isDisease: Math.random() > 0.5,
        diseaseName: 'Leaf Blight',
        confidence: 87,
        recommendations: [
          'Apply fungicide treatment within 3 days',
          'Ensure proper spacing between plants for better airflow',
          'Consider drip irrigation to avoid leaf wetness'
        ],
        fertilizerRecommendations: [
          'Balanced NPK (10-10-10) fertilizer',
          'Foliar spray with micronutrients'
        ]
      }
      
      setResult(mockResults)
      setAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="image-upload-container">
      <div className="container">
        <div className="page-header">
          <h1>Crop Disease Detection</h1>
          <p>Upload an image of your crop to detect diseases and get treatment recommendations</p>
        </div>

        <div className="upload-section">
          {!preview ? (
            <motion.div 
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📷</div>
              <h3>Drag & Drop Image Here</h3>
              <p>or</p>
              <label className="file-input-label">
                Browse Files
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileSelect} 
                  className="file-input" 
                />
              </label>
              <p className="upload-note">Supported formats: JPG, PNG, WEBP</p>
              {error && <p className="upload-error">{error}</p>}
            </motion.div>
          ) : (
            <div className="analysis-section">
              <div className="preview-container">
                <img src={preview} alt="Crop preview" className="image-preview" />
                <div className="preview-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      setFile(null)
                      setPreview(null)
                      setResult(null)
                    }}
                  >
                    Remove
                  </button>
                  {!analyzing && !result && (
                    <button 
                      className="btn btn-primary"
                      onClick={analyzeImage}
                    >
                      Analyze Image
                    </button>
                  )}
                </div>
              </div>

              {analyzing && (
                <div className="analyzing-indicator">
                  <div className="analyzing-spinner"></div>
                  <p>Analyzing your crop image...</p>
                </div>
              )}

              {result && (
                <motion.div 
                  className="analysis-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`result-header ${result.isDisease ? 'disease' : 'healthy'}`}>
                    <h3>
                      {result.isDisease 
                        ? `Disease Detected: ${result.diseaseName}` 
                        : 'No Disease Detected'
                      }
                    </h3>
                    {result.isDisease && (
                      <div className="confidence-badge">
                        {result.confidence}% Confidence
                      </div>
                    )}
                  </div>

                  {result.isDisease ? (
                    <div className="recommendations">
                      <h4>Treatment Recommendations</h4>
                      <ul className="recommendations-list">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="recommendation-item">
                            <div className="recommendation-icon">💡</div>
                            <p>{rec}</p>
                          </li>
                        ))}
                      </ul>

                      <h4>Fertilizer Recommendations</h4>
                      <ul className="recommendations-list">
                        {result.fertilizerRecommendations.map((rec, index) => (
                          <li key={index} className="recommendation-item">
                            <div className="recommendation-icon">🌱</div>
                            <p>{rec}</p>
                          </li>
                        ))}
                      </ul>

                      <div className="recommendation-actions">
                        <button className="btn btn-primary">
                          Save to My Crops
                        </button>
                        <button className="btn btn-secondary">
                          Download Report
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="healthy-crop">
                      <p>Your crop appears to be healthy! Here are some suggestions to maintain crop health:</p>
                      <ul className="recommendations-list">
                        <li className="recommendation-item">
                          <div className="recommendation-icon">💧</div>
                          <p>Maintain regular watering schedule</p>
                        </li>
                        <li className="recommendation-item">
                          <div className="recommendation-icon">☀️</div>
                          <p>Ensure adequate sunlight exposure</p>
                        </li>
                        <li className="recommendation-item">
                          <div className="recommendation-icon">🌱</div>
                          <p>Continue with balanced fertilizer application</p>
                        </li>
                      </ul>

                      <div className="market-price-section">
                        <h4>Current Market Price</h4>
                        <div className="market-price-card">
                          <div className="market-price-header">
                            <span className="market-crop-name">Generic Crop</span>
                            <span className="market-price-trend positive">+2.5% ↑</span>
                          </div>
                          <div className="market-price-value">$5.75 / kg</div>
                          <div className="market-price-footer">
                            <span>Updated today at 10:45 AM</span>
                          </div>
                        </div>
                        <Link to="#" className="btn btn-secondary">View Market Dashboard</Link>
                      </div>
                    </div>
                  )}
                  
                  <div className="points-earned">
                    <div className="points-icon">🏆</div>
                    <div className="points-content">
                      <p><strong>+10 points</strong> earned for crop analysis!</p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '65%' }}></div>
                      </div>
                      <p className="next-achievement">35 points until next achievement</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        <div className="upload-history">
          <h3>Recent Uploads</h3>
          <div className="history-grid">
            <div className="history-item">
              <div className="history-image">
                <img src="https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg" alt="Corn crop" />
                <div className="history-badge healthy">Healthy</div>
              </div>
              <div className="history-details">
                <h4>Corn Field</h4>
                <p>Uploaded 2 days ago</p>
              </div>
            </div>

            <div className="history-item">
              <div className="history-image">
                <img src="https://images.pexels.com/photos/5560867/pexels-photo-5560867.jpeg" alt="Tomato plant" />
                <div className="history-badge disease">Leaf Blight</div>
              </div>
              <div className="history-details">
                <h4>Tomato Plants</h4>
                <p>Uploaded 5 days ago</p>
              </div>
            </div>

            <div className="history-item">
              <div className="history-image">
                <img src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg" alt="Wheat field" />
                <div className="history-badge healthy">Healthy</div>
              </div>
              <div className="history-details">
                <h4>Wheat Field</h4>
                <p>Uploaded 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload