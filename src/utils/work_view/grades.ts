

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
  closeDialog: () => void
): Promise<void> {
  
  const work_evaluator = workStore?.currentWork?.evaluator.find(
    (s: any) => s.user.id === Number(authStore?.user?.id)
  )?.id;

  if (is_work_grade) {

  const assessment: any = {
    evaluator: work_evaluator,
    work: work_id,
    grade: grade,
    date_time: date.toISOString(),
    comittee_feedback: '',
  };

  await assessmentStore.createAssessment(assessment);
  } else {
    const assessment: any = {
    work: work_id,
    grade: grade,
    date_time: date.toISOString(),
    student: user.id,
  };

  await studentAssesmentStore.createAssessment(assessment);
  }
  closeDialog();
  
}
