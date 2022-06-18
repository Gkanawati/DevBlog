import axios from 'axios';

// ip Ap: http://192.168.1.11

const api = axios.create({
    baseURL: 'http://192.168.1.11:1337'
});
export default api; 