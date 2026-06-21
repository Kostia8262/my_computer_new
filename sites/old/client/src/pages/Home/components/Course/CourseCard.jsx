import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({ name, id, specs = [], tag}) => {
    return (
        <div className='course__card'>
            <h3 className="course__card_name">{name}</h3>
            <ul className="course__card_descriptions">
                {specs.map((spec, id) =>
                    <li className="course__card_description" key={id}>{spec.text}</li>
                )}
            </ul>
            <Link to={`course/${id}`} className="course__card_link">Дивитись програму</Link>
            <div className={`course__card_stage`}>{tag == 'child' ? '6 - 18' : '14 - 99+'} років</div>
        </div>
    )
}

export default CourseCard