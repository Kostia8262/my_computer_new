import { useState, useContext } from "react";
import { DataContext } from "../../app/providers/DataProvider/DataProvider";

import './style.css'

import left from '../../shared/assets/icons/interface/left.svg'
import exit from '../../shared/assets/icons/interface/exit.svg'
import { useNavigate } from "react-router-dom";


const PopUp = ({ isPopup, closePopup }) => {
    const navigate = useNavigate();
    const { courses } = useContext(DataContext);

    let [tag, setTag] = useState('')
    let filtredCourses = courses ? courses.filter((course) => course.tag.includes(tag)) : []

    const wrapperHandler = (e) => {
        if (e.target.className.includes('popup__wrapper')) {
            closePopup()
        }
    }

    const linkHandler = (id) => {
        navigate(`course/${id}`)
        closePopup()
    }

    return (
        <div className={`popup__wrapper ${isPopup ? 'active' : ''}`} onClick={wrapperHandler}>
            <div className="popup__content">
                <div className="popup__head">
                    <h2>Курси</h2>
                    <button onClick={closePopup}><img src={exit} alt="" /></button>
                </div>
                <div className="popup__body">
                    <div className="popup__categories">
                        <button className={`popup__category ${tag == '' ? 'active' : ''}`} onClick={() => { setTag('') }}>Всі</button>
                        <button className={`popup__category ${tag == 'design' ? 'active' : ''}`} onClick={() => { setTag('design') }}>Дизайн та 3D</button>
                        <button className={`popup__category ${tag == 'dev' ? 'active' : ''}`} onClick={() => { setTag('dev') }}>Програмування</button>
                        <button className={`popup__category ${tag == 'child' ? 'active' : ''}`} onClick={() => { setTag('child') }}>Курси для дітей</button>
                        <button className={`popup__category ${tag == 'office' ? 'active' : ''}`} onClick={() => { setTag('office') }}>Офісні та SEO SMM</button>
                    </div>
                    <div className="popup__courses">
                        {filtredCourses ? filtredCourses.map((course) =>
                            <div className="popup__course" key={course.id}>
                                <div className="popup__course__description">
                                    <div className="popup__course__title">
                                        <div className="popup__course__age">{course.tag == 'child' ? '6 - 18' : '14 - 99'} років</div>
                                        <h3 className="popup__course__name">{course.name}</h3>
                                    </div>
                                    <ul className="popup__course__apps">
                                        <li className="popup__course__app"></li>
                                    </ul>
                                </div>
                                <div className="popup__course__spec">
                                    <ul>
                                        {course.specs.map((spec) =>
                                            <li key={spec.id}>{spec.text}</li>
                                        )}
                                    </ul>
                                </div>
                                <button className="popup__course__btn" onClick={() => { linkHandler(course.id) }}><img src={left} alt="" /></button>
                            </div>
                        ) : ''}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PopUp