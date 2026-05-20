type EditionLike = {
  final_second_submission_date?: string | null
  initial_evaluators_date?: string | null
  final_evaluators_date?: string | null
}

type WorkLike = {
  edition_final_second_submission_date?: string | null
  edition_initial_evaluators_date?: string | null
  edition_final_evaluators_date?: string | null
}

type GradePeriod = {
  initialDate?: string | null
  finalDate?: string | null
}

function dateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function normalizeDateKey(value?: string | null) {
  return value ? value.slice(0, 10) : null
}

function isDateInPeriod(date: Date, initialDate?: string | null, finalDate?: string | null) {
  const today = dateKey(date)
  const initial = normalizeDateKey(initialDate)
  const final = normalizeDateKey(finalDate)

  if (!initial || !final) return false

  return today >= initial && today <= final
}

function isDateBeforeOrEqual(date: Date, finalDate?: string | null) {
  const today = dateKey(date)
  const final = normalizeDateKey(finalDate)

  if (!final) return false

  return today <= final
}

function evaluatorGradePeriod(edition?: EditionLike | null): GradePeriod {
  return {
    initialDate: edition?.initial_evaluators_date,
    finalDate: edition?.final_evaluators_date,
  }
}

function advisorGradePeriod(edition?: EditionLike | null): GradePeriod {
  return evaluatorGradePeriod(edition)
}

function editionFromWork(work?: WorkLike | null): EditionLike | null {
  if (!work) return null

  return {
    final_second_submission_date: work.edition_final_second_submission_date,
    initial_evaluators_date: work.edition_initial_evaluators_date,
    final_evaluators_date: work.edition_final_evaluators_date,
  }
}

export function buildUserValidations(date: Date, editionStore: any, workStore: any) {
  const workEdition = editionFromWork(workStore.currentWork)
  const edition = workEdition?.initial_evaluators_date
    ? workEdition
    : editionStore.currentEdition as EditionLike | null
  const evaluatorPeriod = evaluatorGradePeriod(edition)
  const advisorPeriod = advisorGradePeriod(edition)

  return {
    student_able_to_cancel: isDateBeforeOrEqual(date, edition?.final_second_submission_date),

    advisor_able_to_give_grade: isDateInPeriod(
      date,
      advisorPeriod.initialDate,
      advisorPeriod.finalDate,
    ),

    evaluator_able_to_give_grade: isDateInPeriod(
      date,
      evaluatorPeriod.initialDate,
      evaluatorPeriod.finalDate,
    ),

    advisor_able_to_aprove_work:
      isDateBeforeOrEqual(date, edition?.final_second_submission_date) &&
      workStore?.currentWork?.advisor_status == 2,
  }
}
