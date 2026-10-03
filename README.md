# Stroke Prediction

Модель машинного обучения для прогнозирования риска инсульта на основе медицинских и демографических признаков.

## О проекте

Задача — бинарная классификация с сильным дисбалансом классов.
Основная метрика — **PR-AUC**, дополнительно оцениваются Precision, Recall, F1 и ROC-AUC.

В проекте выполнены:

* исследовательский анализ данных;
* обработка пропусков и категориальных признаков;
* сравнение ML-моделей;
* Cross-Validation;
* оптимизация Logistic Regression с помощью Optuna;
* подбор порога классификации;
* интерпретация модели через коэффициенты и Odds Ratio.

## Модели

Протестированы Logistic Regression, Random Forest, XGBoost, LightGBM, CatBoost, Decision Tree и Gradient Boosting.

Лучший средний PR-AUC на Cross-Validation показала Logistic Regression.

| Model               | Mean PR-AUC |
| ------------------- | ----------: |
| Logistic Regression |   **0.224** |
| LightGBM            |       0.209 |
| XGBoost             |       0.192 |
| CatBoost            |       0.179 |
| Random Forest       |       0.165 |

После оптимизации с Optuna Mean PR-AUC составил около **0.226**.

Для классификации выбран threshold `0.08`, позволяющий получить Recall около `0.70` на validation-выборке.

## Данные

Используется [Stroke Prediction Dataset](https://www.kaggle.com/datasets/fedesoriano/stroke-prediction-dataset) с Kaggle.

Основные признаки:

* возраст;
* гипертония;
* сердечные заболевания;
* уровень глюкозы;
* BMI;
* тип занятости;
* статус курения;
* пол;
* тип места проживания.

## Model

Итоговая Logistic Regression сохранена в `model/model.joblib`.

Модель получает данные пациента и возвращает вероятность инсульта. Для бинарного предсказания используется threshold `0.08`.

## Backend

Backend реализован на **FastAPI**.

Основной endpoint:

```text
POST /predict
```

Возвращает:

```json
{
  "probability": 0.084,
  "prediction": 1
}
```

### Запуск

```bash
cd stroke-prediction
source .venv/bin/activate
cd backend
python -m uvicorn main:app --reload --port 8000
```

API: `http://localhost:8000`
Swagger: `http://localhost:8000/docs`

## Frontend

Frontend реализован на **React + TypeScript + Vite**.

Позволяет ввести данные пациента и получить prediction и probability от ML-модели.

### Запуск

В отдельном терминале:

```bash
cd stroke-prediction/frontend
npm install
npm run dev
```

Приложение: `http://localhost:5173`

## Стек

`Python` · `Pandas` · `NumPy` · `Scikit-learn` · `XGBoost` · `LightGBM` · `CatBoost` · `Optuna` · `Joblib` · `FastAPI` · `React` · `TypeScript` · `Vite`

## Структура

```text
stroke-prediction/
├── backend/
│   └── main.py
├── frontend/
│   ├── src/
│   └── package.json
├── model/
│   └── model.joblib
├── data/
├── notebooks/
│   └── stroke_prediction.ipynb
├── README.md
└── requirements.txt
```

## Дисклеймер

Проект предназначен для учебных и демонстрационных целей. Модель не является медицинским диагностическим инструментом.
