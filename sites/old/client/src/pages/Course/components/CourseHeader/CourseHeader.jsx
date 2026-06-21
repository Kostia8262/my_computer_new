
import laptop from '../../../../shared/assets/images/laptop.svg'
import blop from '../../../../shared/assets/icons/shapes/blop.svg'

import CourseSkeleton from './CourseSkeleton'
import { downloadFile } from '../../../../api'

export const CourseHeader = ({ course }) => {
    return (
        <header>
            <div className="container">
                <div className="header">
                    {course ? (
                        <div className="header__text">
                            <h1>Курс <span>"{course ? course.name : ''}"</span></h1>
                            <p>{course ? course.description : ''}</p>
                            <ul className="header__list">
                                {course ? course.specs.map((spec, id) =>
                                    <li className="header__item" key={id}>{spec.text}</li>
                                ) : ''}
                            </ul>
                            <button onClick={() => { downloadFile(course.id) }}>Завантажити программу</button>
                        </div>
                    ) : (
                        <div className="header__text">
                            <CourseSkeleton />
                        </div>
                    )
                    }

                    <div className="header__img">
                        <img src={laptop} alt="laptop" />
                    </div>
                    <img className="header__blop" src={blop} alt="blop" />
                </div>
            </div>
        </header>
    )
}
