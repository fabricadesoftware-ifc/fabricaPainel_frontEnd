import { defineStore } from "pinia";
import EditionsService from "@/services/editions";
import { IEdition } from "@/interfaces/edition";
import { showMessage } from "@/utils/toastify";
import { reactive, computed } from "vue";

export const useEdition = defineStore("edition", () => {
  const state = reactive({
    currentEdition: null as IEdition | null,
    editions: [] as IEdition[],
    loading: false,
    error: null as string | null,
  });

  const currentEdition = computed(() => state.currentEdition);

  // Mensagens atualizadas usando os novos campos
  const alertStudent = computed(
    () =>
      "A data de submissão é de " +
      state.currentEdition?.initial_submission_date +
      " até " +
      state.currentEdition?.final_submission_date
  );

  const teacherStudent = computed(
    () =>
      "Registro de Avaliadores (" +
      state.currentEdition?.initial_evaluators_date +
      " até " +
      state.currentEdition?.final_evaluators_date +
      ")"
  );

  const isOpenForGroup = computed(() => {
    const currentDate = new Date();
    const initialThemeDate = new Date(
      state.currentEdition?.initial_submission_date || 0 //arrumar essa bomba
    );
    const finalSubmissionDate = new Date(
      state.currentEdition?.final_submission_date || 0
    );
    return (
      initialThemeDate <= currentDate && finalSubmissionDate >= currentDate
    );
  });

  // Computeds para checar se está aberto para diferentes fases, com novos campos adicionados
  const isOpenForWork = computed(() => {
    const currentDate = new Date();
    const initialSubmissionDate = new Date(
      state.currentEdition?.initial_submission_date || 0
    );
    const finalSubmissionDate = new Date(
      state.currentEdition?.final_submission_date || 0
    );
    return (
      initialSubmissionDate <= currentDate && finalSubmissionDate >= currentDate
    );
  });

  const isOpenForSecondSubmission = computed(() => {
    const currentDate = new Date();
    const initialSecondSubmission = new Date(
      state.currentEdition?.initial_second_submission_date || 0
    );
    const finalSecondSubmission = new Date(
      state.currentEdition?.final_second_submission_date || 0
    );
    return (
      initialSecondSubmission <= currentDate &&
      finalSecondSubmission >= currentDate
    );
  });

  const isOpenForAdvisorAcceptance = computed(() => {
    const currentDate = new Date();
    const initialAdvisor = new Date(
      state.currentEdition?.initial_advisor_acceptance || 0
    );
    const finalAdvisor = new Date(
      state.currentEdition?.final_advisor_acceptance || 0
    );
    return initialAdvisor <= currentDate && finalAdvisor >= currentDate;
  });

  const isOpenForSecondAdvisor = computed(() => {
    const currentDate = new Date();
    const initialSecondAdvisor = new Date(
      state.currentEdition?.initial_second_advisor_date || 0
    );
    const finalSecondAdvisor = new Date(
      state.currentEdition?.final_second_advisor_date || 0
    );
    return (
      initialSecondAdvisor <= currentDate && finalSecondAdvisor >= currentDate
    );
  });

  const isOpenForEvaluation = computed(() => {
    const currentDate = new Date();
    const initialEvaluationDate = new Date(
      state.currentEdition?.initial_evaluators_date || 0
    );
    const finalEvaluationDate = new Date(
      state.currentEdition?.final_evaluators_date || 0
    );
    return (
      initialEvaluationDate <= currentDate && finalEvaluationDate >= currentDate
    );
  });

  // Métodos para alterar estado
  const setLoading = (loading: boolean) => {
    state.loading = loading;
  };

  const setError = (message: string | null) => {
    state.error = message;
  };

  // Busca as edições
  const fetchEditions = async () => {
    setLoading(true);
    setError(null);
    try {
      const editions = await EditionsService.getEditions();
      state.editions = editions;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Busca edição aberta atual
  const fetchCurrentEdition = async () => {
    setLoading(true);
    setError(null);
    try {
      const edition = await EditionsService.getOpenEdition();
      state.currentEdition = edition;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cria uma nova edição
  const createEdition = async (editionData: IEdition) => {
    setLoading(true);
    setError(null);
    try {
      const newEdition = await EditionsService.createEdition(editionData);
      state.editions.push(newEdition);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza edição existente
  const updateEdition = async (editionId: any, editionData: IEdition) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEdition = await EditionsService.updateEdition(
        editionId,
        editionData
      );
      const index = state.editions.findIndex(
        (edition: any) => edition.id === editionId
      );
      if (index !== -1) {
        state.editions[index] = updatedEdition;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Envia feedback
  const submitFeedback = async (editionId: string, feedback: string) => {
    setLoading(true);
    setError(null);
    try {
      await EditionsService.submitFeedback(editionId, feedback);
      showMessage(
        "Feedback enviado com sucesso",
        "success",
        3000,
        "top-right",
        "light",
        false
      );
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    currentEdition,
    alertStudent,
    teacherStudent,
    isOpenForWork,
    isOpenForSecondSubmission,
    isOpenForAdvisorAcceptance,
    isOpenForSecondAdvisor,
    isOpenForEvaluation,
    fetchEditions,
    fetchCurrentEdition,
    createEdition,
    updateEdition,
    submitFeedback,
    isOpenForGroup,
  };
});
