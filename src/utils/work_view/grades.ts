

export async function giveWorkGradeFn(
  grade: any,
  workStore: any,
  authStore: any,
  date: Date,
  work_id: any,
  assessmentStore: any,
  closeDialog: () => void
): Promise<void> {
  
  const work_evaluator = workStore?.currentWork?.evaluator.find(
    (s: any) => s.user.id === Number(authStore?.user?.id)
  )?.id;

  const assessment: any = {
    evaluator: work_evaluator,
    work: work_id,
    grade: grade.work_grade,
    date_time: date.toISOString(),
    comittee_feedback: grade.comittee_feedback,
  };

  await assessmentStore.createAssessment(assessment);
  closeDialog();
}
