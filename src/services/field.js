import api from "@/plugins/axios";

class FieldService {
    /**
     * Retrieves all fields
     * @returns {Promise<Array>} A promise that resolves to an array of fields.
     * @throws {Error} If an error occurs while retrieving the fields.
     */
    async getFields() {
        try {
            const { data } = await api.get("/field")
            return data.results;
        }
        catch (error) {
            console.log("Error in getFields", error);
            throw error;
        }
    }
    /**
     * Creates a new field.
     * @param {Object} newField - The new field object to create.
     * @returns {Promise<Object>} A promise that resolves to the created field object.
     * @throws {Error} If an error occurs while creating the field.
     */
    async createField(newField) {
        console.log(newField);
        try {
            const { data } = await api.post("/field/", newField);
            return data.results;
        } catch (error) {
            console.log("error in createField", error);
            throw error;
        }
    }

    /**
     * Updates an existing field.
     * @param {Object} field - The field object to update.
     * @returns {Promise<Object>} A promise that resolves to the updated field object.
     * @throws {Error} If an error occurs while updating the field.
     */
    async updateField(field) {
        try {
            const { data } = await api.patch(`/field/${field.id}/`, field);
            return data.results;
        } catch (error) {
            console.log("error in updateField", error);
            throw error;
        }
    }

    /**
     * Deletes a field by its ID.
     * @param {number} id - The ID of the field to delete.
     * @returns {Promise<Object>} A promise that resolves to the deleted field object.
     * @throws {Error} If an error occurs while deleting the field.
     */
    async deleteField(id) {
        try {
            const { data } = await api.delete(`/field/${id}/`);
            return data.results;
        } catch (error) {
            console.log("error in deleteField", error);
            throw error;
        }
    }
}

export default new FieldService();
