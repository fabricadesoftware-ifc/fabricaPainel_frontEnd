type CriteriaGroup = { target?: string; weight?: number | string }

const DEFAULT_WEIGHT = 50

function groupWeight(groups: CriteriaGroup[] | null | undefined, target: string) {
  const weight = Number(groups?.find((group) => group?.target === target)?.weight)
  return Number.isFinite(weight) ? weight : DEFAULT_WEIGHT
}

// Mesma conta do relatorio do backend (prepare_grades): media ponderada pelos
// pesos da edicao (grupo "work" = banca, "student" = orientador); sem
// configuracao, 50/50.
export function computeFinalGrade(
  workGrade: number | string | null | undefined,
  studentGrade: number | string | null | undefined,
  criteria: CriteriaGroup[] | null | undefined
): number | null {
  if (workGrade == null || studentGrade == null) return null

  const work = Number(workGrade)
  const student = Number(studentGrade)
  if (Number.isNaN(work) || Number.isNaN(student)) return null

  const workWeight = groupWeight(criteria, 'work')
  const studentWeight = groupWeight(criteria, 'student')
  const total = workWeight + studentWeight
  if (total <= 0) return null

  return (student * studentWeight + work * workWeight) / total
}
