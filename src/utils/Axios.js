import Axios from 'axios';

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export default instance;
