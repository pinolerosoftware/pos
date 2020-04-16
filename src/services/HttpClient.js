import axios from 'axios'

class HttpClient {    
    constructor(){
        this.error = null;
        this.status = "";
    }

    async get(url){
        try {
            const response = await axios.get(url);
            const data = response.data;
            this.clearError(response);
            return data;
        } catch (error) {
            this.setError(error.response);
        }
    }

    async post(url, data){
        try {
            const response = await axios.post(url, data);
            const dataResult = response.data;
            this.clearError(response);
            return dataResult;
        } catch (error) {
            this.setError(error.response);
        }
    }

    async put(url, data){
        try {
            const response = await axios.put(url, data);
            const dataResult = response.data;
            this.clearError(response);
            return dataResult;
        } catch (error) {
            this.setError(error.response);
        }
    }

    async remove(url){
        try {
            const response = await axios.delete(url);
            const data = response.data;
            this.clearError(response);
            return data;
        } catch (error) {
            this.setError(error.response);            
        }
    }

    clearError(response){
        this.status = response.status;
        this.error = null;
    }
    setError(response){
        this.status = response.status;
        this.error = response.data.message;
    }
}

export default HttpClient;