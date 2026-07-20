// const BASE_URL = 'https://api.sos-computer.site/';
// const BASE_URL = 'http://127.0.0.1:8000/';
// const BASE_URL = 'https://185-46-8-102.cloudvps.regruhosting.ru/';
// const BASE_URL = 'http://62.72.21.71/';
// const BASE_URL = 'https://mycomputer.com.pl/';
const BASE_URL = process.env.REACT_APP_API_URL

async function get(endpoint = '') {
    const response = await fetch(BASE_URL + endpoint);
    return response.json();
}

async function post(endpoint = '', data = null, headers = {}) {
    const response = await fetch(BASE_URL + endpoint, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json', 'X-CSRFToken': localStorage.getItem('csrf_token') }, headers),
        credentials: 'include',
        body: JSON.stringify(data),
    });
    return response.json();
}

async function put(endpoint = '', data = null) {
    const response = await fetch(BASE_URL + endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': localStorage.getItem('csrf_token') },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function del(endpoint = '') {
    const response = await fetch(BASE_URL + endpoint, {
        method: 'DELETE',
        headers: { 'X-CSRFToken': localStorage.getItem('csrf_token') },
    });
    return response.json();
}

// endpoints

export const getCourses = async () => {
    return await get()
}

export const getDemoCourses = async () => {
    return await get('demo/')
}

export const getCourse = async (id) => {
    return await get(`course/${id}/`)
}

export const getCSRF = async () => {
    return await get(`order/csrf/`)
}

export const postOrder = async (data) => {
    return await post(`order/`, data)
    // return await post(`order/`, Object.assign({ csrfmiddlewaretoken: token }, data), { 'X-CSRFToken': token })
}

export const getPosts = async () => {
    return await get(`posts/`)
}

export const getPostById = async (id) => {
    const response = await fetch(BASE_URL + `posts/${id}/`);
    if (!response.ok) return null;
    return await response.json();
}

export const getDiscounts = async () => {
    return await get(`discounts/`)
}

export const downloadFile = async (id) => {
    let url_path = `${BASE_URL}programm/${id}/`
    console.log(url_path)
    const response = await fetch(url_path, {
        method: 'GET',
        headers: {
            Accept: 'application/pdf',
        },
        responseType: 'blob',
    });

    if (!response.ok) {
        throw new Error('Ошибка при получении файла');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const contentDisposition = response.headers.get('Content-Disposition');
    console.log(response)
    const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
    const fileName = fileNameMatch ? fileNameMatch[1] : 'file.pdf';

    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
};