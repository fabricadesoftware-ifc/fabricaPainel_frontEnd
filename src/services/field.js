import api from "@/plugins/api";

class FieldService {
    /**
     * Retrieves all fields
     * @returns {Promise<Array>} A promise that resolves to an array of fields.
     * @throws {Error} If an error occurs while retrieving the fields.
     */
    async getFields() {
        try {
            const { data } = await api.get("/field")
            return data.results
        }
        catch (error) {
            console.log("Error in getFields", error);
            throw error;
        }
    }
}
