 ```markdown
# 🤖 AI-Powered Resume Screener & Classifier

An intelligent, full-stack recruitment solution designed to automate candidate resume screening and categorization. By leveraging a structural Flask backend pipeline alongside a reactive user interface, the platform optimizes candidate evaluation through dynamic machine learning model switching and a specialized hybrid scoring engine.

---

## 🌟 Key Features

* **Switchable Classifier Interface:** Instantly toggle between multiple pre-trained ML models (e.g., SVM, Random Forest, Logistic Regression) at runtime via the client dashboard without triggering redundant training.
* **Hybrid Math Engine:** A specialized evaluation formula combining technical keywords, target career alignment, and natural language model predictions to eliminate keyword-stuffing exploits.
* **High-Fidelity Tracking Dashboard:** Provides crisp data visualizations tracking extraction precision and candidate match probabilities instantly.
* **Static Performance Monitoring:** Integrated storage system to serve training performance histories (`Accuracy`, `Precision`, `Recall`) directly from serialized training outputs.

---

## 📐 System Architecture & Workflow


```

[Candidate Resume Upload] ──> [Frontend UI (Next.js)]
│
(HTTP POST Request)
▼
[Backend Gateway API (Flask)]
│
┌─────────────────┴─────────────────┐
▼                                   ▼
[Data Processing Pipeline]         [Switchable ML Engine]
• Text Cleansing                   • Active Reference Selector
• TF-IDF Vectorizer (Local)        • Predictive Probabilities
│                                   │
└─────────────────┬─────────────────┘
▼
[Hybrid Scoring Math]
• 40% Technical Skills Alignment
• 35% Historical Role Match Bonus
• 25% Pure Machine Learning Output
│
▼
[Normalized Match % Output]

```

---

##  📊 The Scoring Logic: Hybrid Math Engine

To provide an objective metric rather than relying blindly on black-box ML predictions, the system computes candidate suitability using a rigid hybrid matrix:

$$\text{Final Confidence} = (\text{Skill Score} \times 0.40) + \text{Role Match Bonus} + (\text{ML Confidence} \times 0.25)$$

### Component Breakdown
1. **Technical Skill Score (40%):** Measures exact vocabulary intersection against job descriptions, identifying necessary technical stacks.
2. **Role Match Bonus (35%):** An algorithmic multiplier awarded when historical job titles or profile headers structurally match target recruitment needs.
3. **Pure ML Confidence Probability (25%):** The predictive probability output by the currently selected classifier model, identifying latent resume patterns.

---

## 🛠️ Tech Stack & Dependencies

### Frontend Core
* **Framework:** React / Next.js
* **Styling:** Tailwind CSS

### Machine Learning & Backend (ml-service)
* **API Engine:** Flask (Python)
* **Data Processing:** Pandas, NumPy
* **Machine Learning:** Scikit-Learn

---

## 🚀 Directory Structure & Setup

```text
├── backend/                  # Flask Web API Gateway
│   ├── app.py                # Main runtime router & prediction pipeline
│   └── ...
├── ml-service/               # Machine Learning & Training Layer
│   ├── train_model.py        # Core model training execution script
│   ├── dataset/              # Core source dataset (Kept for training integrity)
│   └── metrics.json          # Static performance records (Accuracy, Recall)
└── frontend/                 # Reactive Client Dashboard Application

```

### Installation & Launch

1. **Clone the repository:**
```bash
git clone [https://github.com/YOUR_USERNAME/AI-Powered-Resume-Screener-Classifier.git](https://github.com/YOUR_USERNAME/AI-Powered-Resume-Screener-Classifier.git)
cd AI-Powered-Resume-Screener-Classifier

```


2. **Initialize the ML Service & Generate Models Locally:**
> ⚠️ **Important Note:** Pre-trained `.pkl` files (like `vectorizer.pkl` and the models directory) are excluded from this repository to remain lightweight and bypass browser upload limits. Because the dataset is completely intact, you can recreate them instantly by running the training script before launching the server:


```bash
cd ml-service
# Install required dependencies
pip install -r requirements.txt

# Run the training script to generate the .pkl models locally
python train_model.py

```


3. **Start the Flask API Gateway:**
```bash
cd ../backend
python app.py

```


4. **Initialize the Frontend Interface:**
```bash
cd ../frontend
npm install
npm run dev

```



---

## 🔒 Git Management Note

This repository includes a strict configuration targeting systemic cleanliness. Temporary environment configurations, large dependency folders (`node_modules/`, `env/`, `.venv/`), compiled Python bytecodes (`__pycache__/`, `*.pyc`), and local binary outputs (`*.pkl`) are structurally ignored to guarantee code-first version control and runtime flexibility.

---

## 👨‍💻 Author

* **Muhammad Ali Saagar** - Computer Science Student, University of Gujrat

```

```
