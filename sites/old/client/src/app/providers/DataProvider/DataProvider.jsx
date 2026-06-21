import React, { createContext, useState, useEffect } from 'react';
import { getCourses, getCSRF, getDemoCourses, getPosts } from '../../../api'

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [courses, setCourses] = useState(null);
    const [demo, setDemo] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
    getCourses()
    .then(data => setCourses(data))
    .catch(err => {
        console.error("Ошибка при получении курсов:", err);
        setCourses([])
    })

    getDemoCourses()
    .then(data => setDemo(data))
    .catch(err => {
        console.error("Ошибка при получении демо-курсов:", err);
    })

    getPosts()
    .then(data => setPosts(data))
    .catch(err => {
        console.error("Ошибка при получении постов:", err);
    })
    getCSRF()
    .then(data => {
        if (data.csrf_token) {
            localStorage.setItem('csrf_token', data.csrf_token);
        } else {
            console.error("CSRF token not found in response");
        }
    })
}, []);



    return (
        <DataContext.Provider value={{ demo, courses, posts }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
