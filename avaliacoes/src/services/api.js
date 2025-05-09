import axios from 'axios'


const api = axios.create({
    baseURL: 'http://lacalhost:3000'
})

export default api