import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://stano254.pythonanywhere.com/api/' // Replace with your actual base URL
});

export default apiClient;