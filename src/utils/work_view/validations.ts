export function buildUserValidations(date: Date, editionStore: any, workStore: any) {
  return {
    student_able_to_cancel:
      date < new Date(editionStore.currentEdition?.final_second_submission_date ?? "2100-01-01"),

    advisor_able_to_give_grade:
      date < new Date(editionStore.currentEdition?.final_second_advisor_date ?? "2100-01-01"),

    evaluator_able_to_give_grade:
      date < new Date(editionStore.currentEdition?.final_evaluators_date ?? "2100-01-01"),

    advisor_able_to_aprove_work:
      date < new Date(editionStore.currentEdition?.final_second_submission_date ?? "2100-01-01") &&
      workStore?.currentWork.advisor_status == 2
  };
}
