import { useState } from 'react'
import './App.css'

type PredictionResult = {
    probability: number
    prediction: number
}

export default function App() {
    const [result, setResult] = useState<PredictionResult | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const data = {
            age: Number(formData.get('age')),
            hypertension: Number(formData.get('hypertension')),
            heart_disease: Number(formData.get('heart_disease')),
            avg_glucose_level: Number(formData.get('avg_glucose_level')),
            bmi: Number(formData.get('bmi')),

            gender: formData.get('gender'),
            ever_married: formData.get('ever_married'),
            work_type: formData.get('work_type'),
            Residence_type: formData.get('Residence_type'),
            smoking_status: formData.get('smoking_status'),

            is_male: formData.get('gender') === 'Male' ? 1 : 0,
            is_urban: formData.get('Residence_type') === 'Urban' ? 1 : 0,
        }

        try {
            setLoading(true)

            const response = await fetch(
                'http://localhost:8000/predict',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            const result = await response.json()

            setResult({
                probability: result.probability,
                prediction: result.prediction,
            })
        } catch (error) {
            console.error('Prediction error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="page">
            <div className="container">
                <header className="header">
                    <div className="logo">ML</div>

                    <div>
                        <h1>Stroke Risk Prediction</h1>
                        <p>
                            Machine learning model for estimating stroke risk
                        </p>
                    </div>
                </header>

                <form className="card" onSubmit={handleSubmit}>
                    <section className="section">
                        <h2>Personal information</h2>

                        <div className="grid">
                            <div className="field">
                                <label htmlFor="age">Age</label>
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    min="0"
                                    max="120"
                                    placeholder="e.g. 45"
                                    required
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" name="gender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="ever_married">
                                    Ever married
                                </label>
                                <select
                                    id="ever_married"
                                    name="ever_married"
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="work_type">
                                    Work type
                                </label>
                                <select id="work_type" name="work_type">
                                    <option value="Private">Private</option>
                                    <option value="Self-employed">
                                        Self-employed
                                    </option>
                                    <option value="Govt_job">
                                        Government job
                                    </option>
                                    <option value="children">
                                        Children
                                    </option>
                                    <option value="Never_worked">
                                        Never worked
                                    </option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="Residence_type">
                                    Residence type
                                </label>
                                <select
                                    id="Residence_type"
                                    name="Residence_type"
                                >
                                    <option value="Urban">Urban</option>
                                    <option value="Rural">Rural</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="smoking_status">
                                    Smoking status
                                </label>
                                <select
                                    id="smoking_status"
                                    name="smoking_status"
                                >
                                    <option value="never smoked">
                                        Never smoked
                                    </option>
                                    <option value="formerly smoked">
                                        Formerly smoked
                                    </option>
                                    <option value="smokes">
                                        Smokes
                                    </option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <h2>Health information</h2>

                        <div className="grid">
                            <div className="field">
                                <label htmlFor="avg_glucose_level">
                                    Average glucose level
                                </label>
                                <input
                                    id="avg_glucose_level"
                                    name="avg_glucose_level"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder="e.g. 120"
                                    required
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="bmi">BMI</label>
                                <input
                                    id="bmi"
                                    name="bmi"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    placeholder="e.g. 24.5"
                                    required
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="hypertension">
                                    Hypertension
                                </label>
                                <select
                                    id="hypertension"
                                    name="hypertension"
                                >
                                    <option value="0">
                                        No hypertension
                                    </option>
                                    <option value="1">
                                        Hypertension
                                    </option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="heart_disease">
                                    Heart disease
                                </label>
                                <select
                                    id="heart_disease"
                                    name="heart_disease"
                                >
                                    <option value="0">
                                        No heart disease
                                    </option>
                                    <option value="1">
                                        Heart disease
                                    </option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <button
                        className="submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? 'Calculating...'
                            : 'Get prediction'}
                    </button>

                    {result !== null && (
                        <div
                            className={`result ${
                                result.prediction === 1
                                    ? 'result-risk'
                                    : 'result-safe'
                            }`}
                        >
                            <div className="result-header">
                                Prediction result
                            </div>

                            <div className="result-grid">
                                <div className="result-item">
                                    <div className="result-item-label">
                                        Prediction
                                    </div>

                                    <div className="result-status">
                                        {result.prediction === 1
                                            ? 'Patient is at risk of stroke'
                                            : 'Patient is not at risk of stroke'}
                                    </div>
                                </div>

                                <div className="result-item">
                                    <div className="result-item-label">
                                        Probability
                                    </div>

                                    <div className="result-probability">
                                        {(result.probability * 100).toFixed(1)}%
                                    </div>

                                    <div className="result-note">
                                        Estimated probability of stroke
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>

                <footer>
                    ML demo
                </footer>
            </div>
        </main>
    )
}
