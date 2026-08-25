

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

  // O diálogo só fecha se a nota realmente foi salva — antes fechava sempre,
  // então uma falha silenciosa dava a impressão de que a nota tinha sido gravada.
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
  }
}
