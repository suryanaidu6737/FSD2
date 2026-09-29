import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score, classification_report


# -----------------------------------
# 1. Generate Student Dataset
# -----------------------------------

np.random.seed(42)

n = 1000

hours_studied = np.random.randint(1, 11, n)
attendance = np.random.randint(50, 101, n)
previous_score = np.random.randint(40, 101, n)
sleep_hours = np.round(np.random.uniform(4, 9, n), 1)
assignments_completed = np.random.randint(0, 11, n)

# Calculate a score used to generate the target
performance_score = (
    hours_studied * 5
    + attendance * 0.3
    + previous_score * 0.4
    + sleep_hours * 2
    + assignments_completed * 3
)

# Create Pass/Fail target
result = np.where(performance_score >= 75, "Pass", "Fail")


# -----------------------------------
# 2. Create DataFrame
# -----------------------------------

data = pd.DataFrame({
    "hours_studied": hours_studied,
    "attendance": attendance,
    "previous_score": previous_score,
    "sleep_hours": sleep_hours,
    "assignments_completed": assignments_completed,
    "result": result
})


# -----------------------------------
# 3. Save Dataset
# -----------------------------------

data.to_csv("data/students.csv", index=False)

print("Dataset created successfully!")
print("Number of records:", len(data))


# -----------------------------------
# 4. Prepare Features and Target
# -----------------------------------

X = data.drop("result", axis=1)
y = data["result"]


# -----------------------------------
# 5. Train/Test Split
# -----------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# -----------------------------------
# 6. Create Models
# -----------------------------------

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(
        random_state=42,
        max_depth=5
    ),
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
}


# -----------------------------------
# 7. Train and Compare Models
# -----------------------------------

results = {}

for name, model in models.items():

    print("\nTraining:", name)

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    results[name] = accuracy

    print("Accuracy:", round(accuracy, 4))

    print("\nClassification Report:")
    print(classification_report(y_test, predictions))


# -----------------------------------
# 8. Find Best Model
# -----------------------------------

best_model_name = max(results, key=results.get)

best_model = models[best_model_name]

print("\n==============================")
print("MODEL COMPARISON")
print("==============================")

for name, accuracy in results.items():
    print(f"{name}: {accuracy:.4f}")


print("\nBest Model:", best_model_name)


# -----------------------------------
# 9. Save Best Model
# -----------------------------------

joblib.dump(
    best_model,
    "models/student_model.pkl"
)

print("\nBest model saved to:")
print("models/student_model.pkl")
