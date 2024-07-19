import { defineStore } from "pinia";
import { computed, reactive } from "vue";

import { FieldService } from "@/services";

/**
 * Store for managing field data.
 * @typedef {Object} FieldStore
 * @property {Object} state - The state object containing field data.
 * @property {Array} state.fields - The array of fields.
 * @property {Object|null} state.selectedField - The currently selected field.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} fieldsCount - Computed property indicating the number of field.
 * @property {Function} getFields - Function to fetch field data.
 * @property {Function} createField - Function to create a new field.
 * @property {Function} updateField - Function to update an existing field.
 * @property {Function} deleteField - Function to delete a field.
 */

/**
 * Creates a new instance of the FieldStore.
 * @function useFieldStore
 * @returns {FieldStore} The FieldStore instance.
 */
export const useFieldStore = defineStore("field",
    () => {
        const state = reactive({
            fields: [],
            selectedField: null,
            loading: false,
            error: null
        });
        const isLoading = computed(() => state.loading);
        const fieldCount = computed(() => state.fields.length);

        /**
         * Fetches fields data.
         * @async
         * @function getFields
         */
        const getFields = async () => {
            state.loading = true;
            try {
                state.fields = await FieldService.getFields();
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        /**
         * Creates a new field.
         * @async
         * @function createField
         * @param {Object} newField - The new field object to create.
         */
        const createField = async (newField) => {
            state.loading = true;
            try {
                state.fields.push(await FieldService.createField(newField));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        /**
         * Updates an existing field.
         * @async
         * @function updateField
         * @param {Object} field - The field object to update.
         */
        const updateField = async (field) => {
            state.loading = true;
            try {
                const index = state.fields.findIndex((s) => s.id === field.id);
                state.fields[index] = await FieldService.updateField(field);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        /**
         * Deletes a field.
         * @async
         * @function deleteField
         * @param {number} id - The ID of the field to delete.
         */
        const deleteField = async (id) => {
            state.loading = true;
            try {
                const index = state.fields.findIndex((s) => s.id === id);
                state.fields.splice(index, 1);
                await FieldService.deleteField(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        return {
            state,
            isLoading,
            fieldCount,
            getFields,
            createField,
            updateField,
            deleteField
        };

    }
)
