import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './LegalPage.css'

const LegalPage = ({ title, date, children }) => {
    return (
        <section className="legal-page">
            <Helmet>
                <title>{title} | Академія Мій Комп'ютер</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="container">
                <div className="legal-page__inner">
                    <Link to="/" className="legal-page__back">
                        ← Повернутись на головну
                    </Link>
                    <div className="legal-page__header">
                        <p className="legal-page__tag">Юридична інформація</p>
                        <h1 className="legal-page__title">{title}</h1>
                        {date && (
                            <p className="legal-page__meta">Дата набрання чинності: {date}</p>
                        )}
                    </div>
                    <div className="legal-content">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LegalPage
