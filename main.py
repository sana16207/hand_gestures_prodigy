import os
import cv2
import numpy as np
import mediapipe as mp
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt

# MediaPipe setup
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1)

DATASET_PATH = "dataset"

X = []
y = []

print("Loading dataset...")

# Extract hand landmarks
for label in os.listdir(DATASET_PATH):
    label_path = os.path.join(DATASET_PATH, label)

    if not os.path.isdir(label_path):
        continue

    for img_name in os.listdir(label_path):
        img_path = os.path.join(label_path, img_name)

        image = cv2.imread(img_path)
        if image is None:
            continue

        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        result = hands.process(image_rgb)

        if result.multi_hand_landmarks:
            landmarks = []

            for hand_landmarks in result.multi_hand_landmarks:
                for lm in hand_landmarks.landmark:
                    landmarks.append(lm.x)
                    landmarks.append(lm.y)

            X.append(landmarks)
            y.append(label)

print(f"Total samples loaded: {len(X)}")

X = np.array(X)
y = np.array(y)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Demo predictions
fig, axes = plt.subplots(2, 3, figsize=(10, 7))
axes = axes.flatten()

sample_images = []
sample_labels = []

for label in os.listdir(DATASET_PATH):
    label_path = os.path.join(DATASET_PATH, label)

    for img_name in os.listdir(label_path)[:1]:
        sample_images.append(os.path.join(label_path, img_name))
        sample_labels.append(label)

for i, img_path in enumerate(sample_images[:6]):
    image = cv2.imread(img_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    result = hands.process(image_rgb)

    prediction = "Unknown"

    if result.multi_hand_landmarks:
        landmarks = []

        for hand_landmarks in result.multi_hand_landmarks:
            for lm in hand_landmarks.landmark:
                landmarks.append(lm.x)
                landmarks.append(lm.y)

        prediction = model.predict([landmarks])[0]

    axes[i].imshow(image_rgb)
    axes[i].set_title(f"Predicted: {prediction}")
    axes[i].axis("off")

plt.tight_layout()
plt.savefig("gesture_predictions.png")
plt.show()