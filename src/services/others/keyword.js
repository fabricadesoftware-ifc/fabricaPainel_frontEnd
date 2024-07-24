import api from "@/plugins/axios";

class KeywordService {

    async getKeywords(){
        try{
            const response = await api.get('keyword/');
            return response.data;
        }catch(error){
            console.error(error);
        }
    }

    async createKeyword(data) {
        try {
            const response = await api.post('keyword/', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateKeyword(id, data) {
        try {
            const response = await api.put(`keyword/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteKeyword(id) {
        try {
            const response = await api.delete(`keyword/${id}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new KeywordService();