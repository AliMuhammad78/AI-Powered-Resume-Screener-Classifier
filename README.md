# 🤖 Talent_ScanAI | AI-Powered Resume Screener & Classifier

<div align="center">
    
  **An Intelligent Resume Screening, Classification & Ranking System**

  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/ML%20Service-Flask%20%7C%20Python-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Machine%20Learning-Scikit--Learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white" />

  <br/>

  <img src="https://img.shields.io/badge/Status-Completed-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Architecture-3--Tier-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Language-Python%20%7C%20JavaScript-yellow?style=flat-square" />

</div>

---

## 📌 Overview

**Talent_ScanAI** is an AI-powered resume screening and ranking system designed to simplify the recruitment process by automatically analyzing resumes and evaluating candidate suitability against specific job requirements.

The system extracts and processes resume information, identifies relevant technical skills, evaluates professional role alignment, and uses Machine Learning classifiers to predict candidate suitability.

Unlike traditional keyword-based screening systems, Talent_ScanAI combines rule-based evaluation with Machine Learning predictions through a **Hybrid Scoring Engine**, providing a more balanced approach to candidate evaluation.

The platform follows a modular **3-tier architecture**, integrating a React-based frontend, a Node.js API gateway, and an independent Flask-based Machine Learning service.

## ✨ Key Features

- **📄 Intelligent Resume Screening:** Processes candidate resumes, extracts relevant information, and evaluates them against job descriptions.

- **🧠 Multiple Machine Learning Models:** Supports Logistic Regression, Random Forest, and Support Vector Machine (SVM) classifiers.

- **🔄 Dynamic Model Switching:** Allows users to switch between available ML classifiers directly from the frontend without retraining models for every prediction.

- **⚖️ Hybrid Scoring Engine:** Combines technical skill matching, professional role alignment, and Machine Learning confidence to calculate the final candidate score.

- **🎯 Job Role Alignment:** Evaluates candidate experience, previous job titles, and profile information against the targeted recruitment role.

- **📊 Interactive Dashboard:** Presents candidate match percentages, screening results, and relevant evaluation information through a visual interface.

- **⚡ Optimized Model Loading:** Uses Python Pickle (`.pkl`) serialization to save trained models and preprocessing components for faster runtime execution.

- **🔗 Three-Tier Integration:** Separates frontend presentation, backend API communication, and Machine Learning processing for better modularity and maintenance.

---

## 🏗️ System Architecture

Talent_ScanAI follows a three-tier architecture in which each layer performs a separate responsibility.

### Architecture Workflow

```text
             ┌──────────────────────────────┐
             │       USER INTERFACE         │
             │                              │
             │       React + Vite           │
             │                              │
             │  Resume Upload & Dashboard   │
             └──────────────┬───────────────┘
                            │
                       HTTP Request
                            │
                            ▼
             ┌──────────────────────────────┐
             │       BACKEND GATEWAY        │
             │                              │
             │       Node.js + Express      │
             │                              │
             │    API Routing & Requests   │
             └──────────────┬───────────────┘
                            │
                     Internal API Call
                            │
                            ▼
             ┌──────────────────────────────┐
             │       ML MICROSERVICE        │
             │                              │
             │        Flask + Python        │
             │                              │
             │  ┌────────────────────────┐  │
             │  │  Resume Preprocessing  │  │
             │  │                        │  │
             │  │  • Text Extraction     │  │
             │  │  • Text Cleaning       │  │
             │  │  • TF-IDF Vectorizer   │  │
             │  └───────────┬────────────┘  │
             │              │               │
             │              ▼               │
             │  ┌────────────────────────┐  │
             │  │   Machine Learning     │  │
             │  │                        │  │
             │  │  • Logistic Regression │  │
             │  │  • Random Forest       │  │
             │  │  • SVM                 │  │
             │  └───────────┬────────────┘  │
             │              │               │
             │              ▼               │
             │  ┌────────────────────────┐  │
             │  │  Hybrid Scoring Engine │  │
             │  │                        │  │
             │  │  • 40% Skill Score     │  │
             │  │  • 35% Role Match      │  │
             │  │  • 25% ML Confidence   │  │
             │  └───────────┬────────────┘  │
             └──────────────┼───────────────┘
                            │
                     Prediction Result
                            │
                            ▼
             ┌──────────────────────────────┐
             │       FINAL OUTPUT           │
             │                              │
             │   Normalized Match Score     │
             │   Candidate Evaluation       │
             └──────────────────────────────┘
```

### Responsibilities of Each Layer

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React + Vite | User interface, resume upload, and dashboard |
| Backend | Node.js + Express | API gateway and communication |
| ML Service | Flask + Python | Resume processing, model execution, and scoring |

---

## 🧠 Machine Learning Pipeline

The Machine Learning service handles resume preprocessing, feature extraction, model selection, and candidate prediction.

### 1. Resume Preprocessing

Raw resume text is processed through a dedicated preprocessing module.

The preprocessing pipeline performs:

- Text extraction and cleaning.
- Metadata processing.
- Text standardization.
- Preparation of text for feature extraction.

### 2. Feature Extraction Using TF-IDF

The processed resume text is converted into numerical features using the **Term Frequency-Inverse Document Frequency (TF-IDF)** vectorization technique.

The TF-IDF vectorizer transforms text into numerical representations while considering the importance of words within the document.

The trained vectorizer is saved as:

`vectorizer.pkl`

### 3. Machine Learning Classification

The system supports multiple pre-trained classification algorithms:

| Algorithm | Purpose |
|---|---|
| Logistic Regression | Classification based on learned relationships |
| Random Forest | Prediction using multiple decision trees |
| Support Vector Machine (SVM) | Classification by identifying decision boundaries |

Users can dynamically select the active classifier through the frontend.

The Flask service loads the corresponding trained model and generates predictions without repeating the training process.

---

## ⚖️ Hybrid Scoring Engine

One of the main components of Talent_ScanAI is its **Hybrid Scoring Engine**.

Instead of depending entirely on Machine Learning predictions or simple keyword matching, the system combines three evaluation components to calculate the final candidate confidence score.

### Scoring Formula

\[
\begin{aligned}
\text{Final Confidence} =\;&
(\text{Skill Score} \times 0.40)\\
&+ \text{Role Match Bonus}\\
&+ (\text{ML Confidence} \times 0.25)
\end{aligned}
\]

### Scoring Components

**1. Technical Skill Score — 40%**

Evaluates the technical skills and keywords present in the candidate's resume against the requirements mentioned in the job description.

**2. Role Match Bonus — 35%**

Provides an additional score when the candidate's previous job titles or profile information directly match the targeted professional role.

**3. Machine Learning Confidence — 25%**

Uses the prediction probability generated by the currently selected Machine Learning classifier to capture contextual patterns in the resume.

The final result is represented as a normalized percentage, allowing recruiters to understand how closely a candidate matches the targeted job requirements.

---

## 🛠️ Technology Stack

### Frontend Development

| Technology | Purpose |
|---|---|
| React.js | Component-based user interface |
| Vite | Frontend development and build tool |
| Tailwind CSS | Interface styling |

### Backend Development

| Technology | Purpose |
|---|---|
| Node.js | Backend JavaScript runtime |
| Express.js | API gateway and request handling |

### Machine Learning & Data Processing

| Technology | Purpose |
|---|---|
| Python | Machine Learning development |
| Flask | ML service API |
| Scikit-Learn | Classification algorithms |
| Pandas | Dataset processing |
| NumPy | Numerical operations |
| TF-IDF | Text feature extraction |
| Pickle | Model and vectorizer serialization |

---

## 📂 Project Components

The project is divided into three independent components:

**Frontend:** Handles user interaction, resume uploads, classifier selection, and dashboard presentation.

**Backend:** Manages API routing and communication between the frontend and the Machine Learning service.

**ML Service:** Handles text preprocessing, feature extraction, model loading, classification, and hybrid scoring.

---

## 🚀 Installation & Setup

Follow these steps to run Talent_ScanAI locally.

### Prerequisites

Make sure you have installed:

- Python 3.x
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/AliMuhammad78/AI-Powered-Resume-Screener-Classifier.git

cd AI-Powered-Resume-Screener-Classifier
```

### 2. Configure the Machine Learning Service

Open **Terminal 1**:

```bash
cd ml-service

# Install Python dependencies
pip install -r requirements.txt

# Generate trained models and vectorizer
python train_model.py

# Start Flask service
python app.py
```

**Important:** Pre-trained `.pkl` files are excluded from the repository. Run `train_model.py` to generate the required Machine Learning artifacts locally before starting the application.

### 3. Start the Node.js Backend

Open **Terminal 2**:

```bash
cd backend

# Install Node.js dependencies
npm install

# Start backend server
npm start
```

### 4. Start the React Frontend

Open **Terminal 3**:

```bash
cd frontend

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

### 5. Access the Application

After starting all three services, open the local URL provided by Vite in your browser.

You can now interact with the application and explore its resume screening and classification features.

---

## 🔐 Version Control & Model Management

The project follows a clean version-control approach to keep the repository lightweight and maintainable.

The following generated files and environment-specific directories are excluded from Git:

- `node_modules/`
- `__pycache__/`
- `*.pyc`
- `*.pkl`
- `.venv/`
- `env/`

Machine Learning models and vectorizers are generated locally through the training pipeline rather than being stored in the repository.

---

## 🎯 Project Objectives

Talent_ScanAI aims to:

- Reduce manual effort in the initial resume screening process.
- Automate the evaluation of candidate skills and professional backgrounds.
- Integrate Machine Learning into recruitment workflows.
- Provide multiple classification options.
- Combine traditional skill matching with Machine Learning predictions.
- Deliver a modular and maintainable full-stack application.

---

## 👨‍💻 Developer

**Muhammad Ali Saagar**

Computer Science Student  
Department of Computer Science  
University of Gujrat, Pakistan

**Roll Number:** 23021519-095

---

<div align="center">

### 🚀 Talent_ScanAI

**Smarter Resume Screening Through Machine Learning**

*Built with React, Node.js, Flask & Python.*

</div>
