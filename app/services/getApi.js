import axios from 'axios';

export const getAPI = async (url, params = null)=>{
    try {
        const response = await axios.get(url, params);
        return (response);
      } catch (error) {
        console.error('Error fetching data:', error);
        return error 
      }
}