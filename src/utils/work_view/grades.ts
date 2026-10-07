import { showMessage } from '@/utils/toastify'

// Evita enviar a mesma nota duas vezes (clique duplo em rede lenta).
const gradesInFlight = new Set<string>()

export async function giveWorkGradeFn(
  grade: any,
  workStore: any,
  authStore: any,
  date: Date,
  work_id: any,
  assessmentStore: any,
  studentAssesmentStore: any,
  user: any,
  is_work_grade: any,
  criterion_grades: any[] = [],
  closeDialog: () => void
): Promise<void> {
  
  const work_evaluator = workStore?.currentWork?.evaluator.find(
    (s: any) => s.user.id === Number(authStore?.user?.id)
  )?.id;

  if (is_work_grade && !work_evaluator) {
    showMessage('Você não é avaliador deste trabalho.', 'error', 4000, 'top-right', 'light', false);
    return;
  }

  const requestKey = is_work_grade ? `work:${work_id}` : `student:${user?.id}:${work_id}`
  if (gradesInFlight.has(requestKey)) return
  gradesInFlight.add(requestKey)

  // Só fecha o diálogo se a nota realmente foi salva.
  try {
    if (is_work_grade) {
      const assessment: any = {
        evaluator: work_evaluator,
        work: work_id,
        grade: grade,
        criterion_grades,
        date_time: date.toISOString(),
        committee_feedback: '',
      };

      await assessmentStore.createAssessment(assessment);
    } else {
      const assessment: any = {
        work: work_id,
        grade: grade,
        criterion_grades,
        date_time: date.toISOString(),
        student: user.id,
      };

      await studentAssesmentStore.createAssessment(assessment);
    }
    closeDialog();
  } catch (error) {
    console.error("Erro ao salvar nota:", error);
  } finally {
    gradesInFlight.delete(requestKey);
  }
}
