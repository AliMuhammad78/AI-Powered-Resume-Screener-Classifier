import pandas as pd
import joblib
import os
import json
import time
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from preprocess import clean_resume 

# --- IMPORTING THE 5 CLASSIFIERS ---
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

def train():
    print(" Starting Multi-Model Training Process for TalentScan Leaderboard...")

    file_path = 'resume_data.csv'
    if not os.path.exists(file_path):
        print(f" Error: {file_path} not found!")
        return

    # Load with utf-8-sig to handle hidden characters
    df = pd.read_csv(file_path, encoding='utf-8-sig')

    # --- AUTO-DETECT TARGET COLUMN ---
    actual_target_col = None
    for col in df.columns:
        if 'job_position_name' in col:
            actual_target_col = col
            break
    
    if not actual_target_col:
        print(f" Error: Could not find job_position_name column. Available columns are: {list(df.columns)}")
        return
    
    print(f"🎯 Found target column: '{actual_target_col}'")

    feature_cols = [
        'skills', 
        'degree_names', 
        'major_field_of_studies', 
        'responsibilities', 
        'career_objective'
    ]
    
    # Ensure all feature columns exist in the CSV
    existing_features = [c for c in feature_cols if c in df.columns]
    
    print(" Combining relevant columns...")
    df[existing_features] = df[existing_features].fillna('')
    df['combined_text'] = df[existing_features].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)

    print("🧹 Cleaning text data...")
    df['combined_text'] = df['combined_text'].apply(clean_resume)

    X = df['combined_text']
    y = df[actual_target_col]

    print("🔢 Converting text to TF-IDF vectors...")
    tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    X_train_tfidf = tfidf.fit_transform(X_train)
    X_test_tfidf = tfidf.transform(X_test)

    # --- DEFINING THE 5 MODELS ---
    classifiers = {
        "Naive Bayes": MultinomialNB(),
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "Support Vector Machine": SVC(kernel='linear', probability=True, random_state=42),
        "K-Nearest Neighbors": KNeighborsClassifier(n_neighbors=5)
    }

    os.makedirs('model', exist_ok=True)
    
    # Save the shared vectorizer first
    joblib.dump(tfidf, 'model/vectorizer.pkl')
    print("💾 Shared Vectorizer saved in 'model/' folder.")

    # Dictionary to collect performance data for the Frontend JSON
    battle_metrics = {}

    print("\n Entering the Model Battle Ring... Training Classifiers:")
    print("-" * 65)

    for name, clf in classifiers.items():
        print(f"🧠 Training {name}...")
        
        # Track training time
        start_time = time.time()
        clf.fit(X_train_tfidf, y_train)
        training_time = round(time.time() - start_time, 4)

        # Track inference prediction speed
        start_pred = time.time()
        y_pred = clf.predict(X_test_tfidf)
        prediction_time = round(time.time() - start_pred, 4)

        # Calculate standard classification metrics
        # macro average handles multi-class classification cleanly
        acc = accuracy_score(y_test, y_pred)
        precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred, average='macro', zero_division=0)

        # Print results locally in terminal
        print(f"   📊 Accuracy  : {acc * 100:.2f}%")
        print(f"   📊 F1-Score  : {f1 * 100:.2f}%")
        print(f"   ⏱️ Train Time : {training_time}s")
        print("-" * 65)

        # Format name for file systems (e.g., "Support Vector Machine" -> "svm")
        file_safe_name = name.lower().replace(" ", "_")
        
        # Save each model binary explicitly
        joblib.dump(clf, f'model/model_{file_safe_name}.pkl')

        # Store metrics data to build out the frontend visualization cards
        battle_metrics[name] = {
            "accuracy": round(acc * 100, 2),
            "precision": round(precision * 100, 2),
            "recall": round(recall * 100, 2),
            "f1_score": round(f1 * 100, 2),
            "training_time": training_time,
            "prediction_speed": prediction_time
        }

    # Save the metrics to a structured JSON file so the UI can draw charts and render tables
    metrics_path = 'model/model_metrics.json'
    with open(metrics_path, 'w') as json_file:
        json.dump(battle_metrics, json_file, indent=4)
        
    print(f"🏆 Model Battle Analytics exported successfully to '{metrics_path}'!")
    print("✅ All 5 Classifiers are armed and ready for evaluation.")

if __name__ == "__main__":
    train()