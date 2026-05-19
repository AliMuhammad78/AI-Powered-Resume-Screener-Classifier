 # 🤖 AI-Powered Resume Screener & Classifier

An intelligent, full-stack recruitment solution designed to automate candidate resume screening and categorization. By leveraging a structural Flask backend pipeline alongside a reactive user interface, the platform optimizes candidate evaluation through dynamic machine learning model switching and a specialized hybrid scoring engine.

---

## 🌟 Key Features

- **Switchable Classifier Interface:** Instantly toggle between multiple pre-trained ML models (e.g., SVM, Random Forest, Logistic Regression) at runtime via the client dashboard without triggering redundant training.

- **Hybrid Math Engine:** A specialized evaluation formula combining technical keywords, target career alignment, and natural language model predictions to eliminate keyword-stuffing exploits.

- **High-Fidelity Tracking Dashboard:** Provides crisp data visualizations tracking extraction precision and candidate match probabilities instantly.

- **Static Performance Monitoring:** Integrated storage system to serve training performance histories (`Accuracy`, `Precision`, `Recall`) directly from serialized training outputs.

---

# 📐 System Architecture & Workflow

```text
[Candidate Resume Upload] ──> [Frontend UI (Next.js)]
                                      │
                            (HTTP POST Request)
                                      ▼
                         [Backend Gateway API (Flask)]
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
      [Data Processing Pipeline]                    [Switchable ML Engine]
      • Text Cleansing                              • Active Reference Selector
      • TF-IDF Vectorizer (Local)                   • Predictive Probabilities
              │                                               │
              └───────────────────────┬───────────────────────┘
                                      ▼
                           [Hybrid Scoring Math]
                           • 40% Technical Skills Alignment
                           • 35% Historical Role Match Bonus
                           • 25% Pure Machine Learning Output
                                      │
                                      ▼
                         [Normalized Match % Output]
