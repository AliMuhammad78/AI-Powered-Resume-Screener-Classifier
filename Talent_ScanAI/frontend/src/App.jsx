 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, CheckCircle, Brain, Target, 
  AlertCircle, Briefcase, GraduationCap, 
  History, ArrowRight, MousePointer2, Plus, X,
  Swords, BarChart3, Award, Zap, ShieldAlert
} from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState('landing'); // 'landing' or 'dashboard'
  const [activeTab, setActiveTab] = useState('analysis'); // 'analysis' or 'battle'
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // Inputs & Classifiers
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedClassifier, setSelectedClassifier] = useState('Naive Bayes');
  const [manualSkill, setManualSkill] = useState('');
  const [extraSkills, setExtraSkills] = useState([]);
  const [metricsData, setMetricsData] = useState(null);
  const [bestModel, setBestModel] = useState({ name: '', f1: 0 });

  const roles = [
    "AI Engineer", "Android Developer", "Backend Developer", "Blockchain Developer",
    "Business Analyst", "Cloud Architect", "Cloud Engineer", "Content Strategist",
    "Cybersecurity Analyst", "Cybersecurity Specialist", "Data Analyst", "Data Engineer",
    "Data Scientist", "Database Administrator", "DevOps Engineer", "Digital Marketing Specialist",
    "Frontend Developer", "Full Stack Developer", "Game Developer", "Graphic Designer",
    "HR Manager", "IT Manager", "Machine Learning Engineer", "MERN Stack Developer",
    "Mobile App Developer", "Network Engineer", "Product Manager", "Project Manager",
    "QA Engineer", "React Developer", "Sales Manager", "SEO Specialist", "Software Engineer",
    "Software Tester", "System Administrator", "Technical Support Specialist", "UI/UX Designer",
    "Video Editor", "Web Designer", "Web Developer"
  ];

  const classifiers = [
    "Naive Bayes", "Logistic Regression", "Random Forest", 
    "Support Vector Machine", "K-Nearest Neighbors"
  ];

  // Fetch Model Evaluation Benchmark Data on initialization directly from Flask metrics cache
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/metrics');
        setMetricsData(response.data);
        
        // Dynamically compute the absolute best model based on F1-Score
        let topModel = '';
        let maxF1 = 0;
        Object.entries(response.data).forEach(([name, metrics]) => {
          if (metrics.f1_score > maxF1) {
            maxF1 = metrics.f1_score;
            topModel = name;
          }
        });
        setBestModel({ name: topModel, f1: maxF1 });
      } catch (error) {
        console.error("Could not load battle system metrics:", error);
      }
    };
    if (view === 'dashboard') fetchMetrics();
  }, [view]);

  const addSkill = () => {
    if (manualSkill && !extraSkills.includes(manualSkill)) {
      setExtraSkills([...extraSkills, manualSkill]);
      setManualSkill('');
    }
  };

  const removeSkill = (skill) => {
    setExtraSkills(extraSkills.filter(s => s !== skill));
  };

  // FIXED: Routing file compilation through Node bridge on Port 8000 for server-side character extraction
  const handleUpload = async () => {
    if (!file || !selectedRole) {
      alert("Please select a Job Role and upload a Resume!");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', selectedRole);
    formData.append('classifier', selectedClassifier);
    formData.append('additionalSkills', JSON.stringify(extraSkills));

    try {
      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Node bridge safely wraps Flask execution statistics under the "analysis" response key
      if (response.data.analysis) {
        setResult(response.data.analysis);
      } else {
        setResult(response.data);
      }

      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      alert("Analysis processing pipeline failed. Ensure both node server.js (Port 8000) and python app.py (Port 5000) are fully running.");
    } finally {
      setLoading(false);
    }
  };

  if (view === 'landing') {
    return (
      <div className="landing-page">
        <nav className="navbar">
          <div className="logo">TALENTSCAN.AI</div>
        </nav>
        <div className="hero-section">
          <div className="hero-badge">Multi-Classifier Evaluation Pipeline</div>
          <h1>Analyze Your Professional <span className="gradient-text">DNA</span></h1>
          <p>The next generation of resume screening. Compare 5 historical classification paradigms across structural accuracy metrics dynamically on a single dashboard grid.</p>
          <div className="hero-btns">
            <button className="btn-primary-hero" onClick={() => setView('dashboard')}>
              Analyze Resume <ArrowRight size={20} />
            </button>
            <button className="btn-secondary-hero">View Analytics</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fadeIn">
      <nav className="navbar">
        <div className="logo" onClick={() => setView('landing')} style={{cursor:'pointer'}}>TALENTSCAN.AI</div>
        
        {/* Navigation Tab Layout Bar */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'analysis' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            <Brain size={16} /> Resume Analysis
          </button>
          <button 
            className={`tab-btn ${activeTab === 'battle' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('battle')}
          >
            <Swords size={16} /> Model Battle Arena
          </button>
        </div>

        {/* <div className="nav-actions">
          <button className="skill-tag history-btn"><History size={16}/> History</button>
        </div> */}
      </nav>

      {activeTab === 'analysis' ? (
        <main className="main-card shadow-lg">
          <div className="input-section-grid">
            <div className="upload-section">
              <input 
                type="file" 
                id="fileInput" 
                hidden 
                onChange={(e) => setFile(e.target.files[0])} 
                accept=".pdf,.docx"
              />
              <label htmlFor="fileInput" className="upload-label">
                <Upload size={40} className="upload-icon" />
                <h3>{file ? file.name : "Choose Resume"}</h3>
                <p>PDF or DOCX (Max 10MB)</p>
              </label>
            </div>

            <div className="selection-area">
              <div className="input-group">
                <label><MousePointer2 size={14}/> Target Job Role</label>
                <select 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="custom-select"
                >
                  <option value="">Select a Role...</option>
                  {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>

              {/* Classifier Operational Switch Dropdown Container */}
              <div className="input-group">
                <label><Zap size={14}/> Core Processing Classifier Engine</label>
                <select 
                  value={selectedClassifier} 
                  onChange={(e) => setSelectedClassifier(e.target.value)}
                  className="custom-select classifier-select"
                >
                  {classifiers.map(clf => <option key={clf} value={clf}>{clf}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label><Plus size={14}/> Additional Skills (Optional)</label>
                <div className="skill-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="e.g. Docker, AWS..." 
                    value={manualSkill}
                    onChange={(e) => setManualSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button onClick={addSkill}><Plus size={18}/></button>
                </div>
                <div className="extra-skills-list">
                  {extraSkills.map(s => (
                    <span key={s} className="pill-skill">
                      {s} <X size={12} onClick={() => removeSkill(s)} style={{cursor:'pointer'}}/>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button 
            className="btn-primary btn-shine" 
            onClick={handleUpload} 
            disabled={!file || !selectedRole || loading}
          >
            {loading ? (
              <span className="loader-text">Invoking Engine [{selectedClassifier}]...</span>
            ) : `Execute Verification via ${selectedClassifier}`}
          </button>

          {result && (
            <div className="result-grid animate-slideUp">
              <div className="left-col">
                <div className="prediction-card result-card-border">
                  <div className="card-header">
                    <span className="status-badge">{selectedClassifier.toUpperCase()} RESPONSE</span>
                    <span className="match-percent">{result.confidence}% Match</span>
                  </div>  
                  <h2 className="prediction-title">{result.prediction}</h2>
                  <p className="detected-subtext">Detected Classification Group: <b>{result.ml_detected_role}</b></p>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <div className="skills-box">
                  <h4 className="section-title"><Brain size={18} color="#60a5fa"/> Skills Extracted</h4>
                  <div className="skills-container">
                    {(result.skills || []).map(skill => (
                      <span key={skill} className="skill-tag animate-pop">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="skills-box">
                  <h4 className="section-title text-red"><AlertCircle size={18}/> Requirements Gap Check</h4>
                  <div className="skills-container">
                    {(result.missing_skills || []).map(skill => (
                      <span key={skill} className="skill-tag missing-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="right-col">
                <div className="score-visualization">
                  <div className="circle-wrap" style={{ '--percent': result.confidence }}>
                    <div className="circle-inner">
                      <span className="big-num">{result.confidence}</span>
                      <span className="small-per">%</span>
                    </div>
                  </div>
                  <p className="score-text">Model Matching Precision</p>
                </div>

                <div className="summary-card">
                  <h4 className="summary-title">Engine Summary Metadata</h4>
                  <div className="summary-details">
                    <div className="sum-item">
                      <GraduationCap size={16} color="#3b82f6"/>
                      <span><b>Academic Profile:</b> {result.summary?.education}</span>
                    </div>
                    <div className="sum-item">
                      <Briefcase size={16} color="#3b82f6"/>
                      <span><b>Professional Scale:</b> {result.summary?.experience}</span>
                    </div>
                    <div className="sum-item">
                      <ShieldAlert size={16} color="#eab308"/>
                      <span><b>Active Model Anchor:</b> {selectedClassifier}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        /* Model Battle Arena Subsystem View Dashboard Layout */
        <div className="battle-arena shadow-lg main-card animate-fadeIn">
          {bestModel.name && (
            <div className="best-model-showcase animate-pop">
              <div className="showcase-icon-wrap"><Award size={36} color="#fbbf24" /></div>
              <div className="showcase-text">
                <span className="badge-gold">🏆 BEST PERFORMING MODEL CRITERION</span>
                <h2>{bestModel.name}</h2>
                <p>Achieved top architectural performance classification scaling with an average F1-Score value of <b>{bestModel.f1}%</b> on evaluation split arrays.</p>
              </div>
            </div>
          )}

          {/* Graphical Representation Grid Blocks */}
          <div className="metrics-dashboard-grid">
            <div className="chart-wrapper-card">
              <h3><BarChart3 size={18} /> Model Training Accuracy Spectrum</h3>
              <div className="bar-chart-container">
                {metricsData && Object.entries(metricsData).map(([name, val]) => (
                  <div key={name} className="chart-row">
                    <div className="chart-label">{name}</div>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill" style={{ width: `${val.accuracy}%` }}>
                        <span className="bar-value-text">{val.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Metrics Grid Table */}
            <div className="table-wrapper-card">
              <h3>📦 Multi-Classifier Matrix Leaderboard</h3>
              <div className="responsive-table-scroll">
                <table className="battle-table">
                  <thead>
                    <tr>
                      <th>Classifier Model</th>
                      <th>Accuracy</th>
                      <th>Precision</th>
                      <th>Recall</th>
                      <th>F1-Score</th>
                      <th>Inference Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metricsData && Object.entries(metricsData).map(([name, val]) => (
                      <tr key={name} className={bestModel.name === name ? 'highlight-row' : ''}>
                        <td className="model-cell-name">
                          {bestModel.name === name ? "🏆 " : ""}
                          {name}
                        </td>
                        <td><span className="metric-badge green">{val.accuracy}%</span></td>
                        <td>{val.precision}%</td>
                        <td>{val.recall}%</td>
                        <td><b>{val.f1_score}%</b></td>
                        <td className="speed-text">{val.prediction_speed}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;