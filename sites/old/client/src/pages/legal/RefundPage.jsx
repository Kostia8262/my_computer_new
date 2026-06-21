import React from 'react'
import LegalPage from './LegalPage'

const RefundPage = () => {
    return (
        <LegalPage title="Правила повернення коштів" date="3 червня 2026 року">
            <div className="legal-callout">
                <p>
                    My Computer Academy прагне до чесних та прозорих відносин зі своїми
                    клієнтами. Цей документ визначає умови та порядок повернення коштів
                    за освітні послуги.
                </p>
            </div>

            <div className="legal-section">
                <h2>1. Загальні умови</h2>
                <p>
                    1.1. Повернення коштів здійснюється відповідно до Закону України
                    «Про захист прав споживачів» та умов{' '}
                    <a href="/public-offer/">Публічної оферти</a>.
                </p>
                <p>
                    1.2. Для ініціювання повернення необхідно звернутися до нас протягом
                    встановлених строків одним із способів, зазначених у розділі 3.
                </p>
            </div>

            <div className="legal-section">
                <h2>2. Умови повернення</h2>

                <table className="legal-table">
                    <thead>
                        <tr>
                            <th>Ситуація</th>
                            <th>Розмір повернення</th>
                            <th>Строк звернення</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Академія скасовує або переносить курс</td>
                            <td><strong>100%</strong> вартості</td>
                            <td>Протягом 14 днів з дня повідомлення</td>
                        </tr>
                        <tr>
                            <td>Замовник відмовляється до початку курсу</td>
                            <td><strong>50%</strong> вартості</td>
                            <td>Не пізніше ніж за 3 дні до першого заняття</td>
                        </tr>
                        <tr>
                            <td>
                                Замовник відмовляється після початку курсу,
                                але не більше ніж після 2 занять
                            </td>
                            <td>
                                Пропорційно невикористаній частині
                                за мінусом адміністративного збору 10%
                            </td>
                            <td>Не пізніше ніж після 2-го заняття</td>
                        </tr>
                        <tr>
                            <td>Замовник відмовляється після 3+ занять</td>
                            <td><strong>Повернення не здійснюється</strong></td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>

                <p>
                    <strong>Виняток:</strong> Якщо ненадання послуг сталося з вини Виконавця
                    (технічні збої на нашому боці, некваліфікований викладач тощо),
                    Замовник має право на повернення 100% вартості незалежно від
                    кількості проведених занять.
                </p>
            </div>

            <div className="legal-section">
                <h2>3. Як подати запит на повернення</h2>
                <p>Для отримання повернення коштів необхідно:</p>
                <ol>
                    <li>
                        Звернутися до нас електронною поштою{' '}
                        <a href="mailto:my.computer.academy25@gmail.com">
                            my.computer.academy25@gmail.com
                        </a>{' '}
                        або в Telegram{' '}
                        <a href="https://t.me/SosComputerAcademy" target="_blank" rel="noopener noreferrer">
                            @SosComputerAcademy
                        </a>{' '}
                        з позначкою «Повернення».
                    </li>
                    <li>
                        Вказати: ваше ім'я, назву курсу, дату оплати та причину відмови.
                    </li>
                    <li>
                        Надати підтвердження оплати (скріншот або номер транзакції).
                    </li>
                </ol>
            </div>

            <div className="legal-section">
                <h2>4. Строки повернення</h2>
                <p>
                    4.1. Ми розглянемо ваш запит протягом <strong>3 робочих днів</strong>{' '}
                    і підтвердимо рішення.
                </p>
                <p>
                    4.2. Після підтвердження кошти повертаються тим самим способом,
                    яким була здійснена оплата, протягом <strong>10 робочих днів</strong>.
                    Фактичний строк зарахування залежить від вашого банку.
                </p>
            </div>

            <div className="legal-section">
                <h2>5. Контакти для повернення</h2>
                <ul>
                    <li>
                        <strong>Email:</strong>{' '}
                        <a href="mailto:my.computer.academy25@gmail.com">
                            my.computer.academy25@gmail.com
                        </a>
                    </li>
                    <li>
                        <strong>Телефон / Viber:</strong>{' '}
                        <a href="tel:+380954624672">+38 (095) 462-46-72</a>
                    </li>
                    <li>
                        <strong>Telegram:</strong>{' '}
                        <a href="https://t.me/SosComputerAcademy" target="_blank" rel="noopener noreferrer">
                            @SosComputerAcademy
                        </a>
                    </li>
                </ul>
            </div>
        </LegalPage>
    )
}

export default RefundPage
