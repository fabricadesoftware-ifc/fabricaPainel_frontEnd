import { defineStore } from "pinia";
import { useAuth } from "./auth";
import { useRouter } from "vue-router";
import CategoriesService from "@/services/categories";
import { ICrossCuttingTheme } from "@/interfaces/themes";

export const useCategory = defineStore("categories", () => {
  const state = reactive({
    themes: [] as any[],
    field: [] as any[],
    ods: [] as any[],
    loading: false,
    error: null as string | null,
  });

  const authStore = useAuth();
  const router = useRouter();
  const crossCuttingThemes = computed(() => state.themes.map((t) => t.name));
  const ods = computed(() => state.ods);
  const field = computed(() => state.field.map((f) => f.name));

  const setLoading = (loading: boolean) => {
    state.loading = loading;
  };

  const setError = (message: string | null) => {
    state.error = message;
  };

  const getCrossCuttingThemes = async () => {
    try {
      const response = await CategoriesService.getCrossCuttingThemes();
      state.themes = response;
      return response
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterFields = async (name: string) => {
    try {
      const response = await CategoriesService.FilterField(name)
      state.themes = response;
     
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveCrossCuttingThemes = async (selectThemes: Number[]) => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        selectThemes.map(
          async (selectTheme) =>
            await CategoriesService.updateCrossCuttingThemes(
              state.themes.find((theme) => theme.name === selectTheme),
              authStore.uid
            )
        )
      );
      return responses;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      router.push("/panel");
    }
  };

  const getOds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await CategoriesService.getOds();
      state.ods = response;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getField = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await CategoriesService.getField();
      state.field = response;
      return response
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeAdvisorCrossCuttingThemes = async (themes: ICrossCuttingTheme[]) => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        themes.map(
          async (theme) =>
            await CategoriesService.removeAdvisorCrossCuttingThemes(
              theme,
              authStore.uid
            )
        )
      );
      return responses;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    crossCuttingThemes,
    ods,
    field,
    getOds,
    getField,
    getCrossCuttingThemes,
    saveCrossCuttingThemes,
    removeAdvisorCrossCuttingThemes,
    filterFields
  };
});
