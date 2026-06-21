import React, { useState } from 'react'

const ProgramCard = ({ number, title, paragraphs }) => {
    let [active, setActive] = useState('')
    const leftParagraphs = paragraphs.filter((item, index) => index < paragraphs.length/2);
    const rightsParagraphs = paragraphs.filter((item, index) => index >= paragraphs.length/2);
    return (
        <div className={`program__card ${active}`}>
            <h3 className="program__card_title" onClick={() => setActive(active ? '' : 'active')}><div className="program__card_label">Тема: <span className="program__card_number">{number}</span></div><strong>{title}</strong><span className='program__card_btn'>+</span></h3>
            <div className="program__card_body">
                <ul className="program__card_paragraphs" >
                    {leftParagraphs.map((paragraph, id) =>
                        <li className="program__card_paragraph" key={id}>
                            {paragraph.name}
                        </li>
                    )}
                </ul>
                <ul className="program__card_paragraphs" >
                    {rightsParagraphs.map((paragraph, id) =>
                        <li className="program__card_paragraph" key={id}>
                            {paragraph.name}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ProgramCard
