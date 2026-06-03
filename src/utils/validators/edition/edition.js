const REQUIRED_MESSAGE = "Campo obrigatorio"

function isEmptyValue(value) {
  return value === null || value === undefined || String(value).trim() === ""
}

function toLocalDate(value) {
  if (isEmptyValue(value)) return null

  const [year, month, day] = String(value).split("-").map(Number)

  if (!year || !month || !day) return null

  const date = new Date(year, month - 1, day)
  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day

  return isValidDate ? date : null
}

function addFieldError(errors, index, message) {
  if (!errors[index]) {
    errors[index] = message
  }
}

function addQtdError(errors, fieldIndex, qtdIndex, message) {
  errors[fieldIndex] ??= []

  if (!errors[fieldIndex][qtdIndex]) {
    errors[fieldIndex][qtdIndex] = message
  }
}

function validateRequiredField(errors, fields, index) {
  if (isEmptyValue(fields[index]?.value)) {
    addFieldError(errors, index, REQUIRED_MESSAGE)
  }
}

function validateRequiredQtd(errors, fields, fieldIndex) {
  fields[fieldIndex]?.qtds?.forEach((item, itemIndex) => {
    if (isEmptyValue(item.value)) {
      addQtdError(errors, fieldIndex, itemIndex, REQUIRED_MESSAGE)
    }
  })
}

function validateDateField(errors, fields, index, expectedYear) {
  const value = fields[index]?.value
  if (isEmptyValue(value)) return

  const date = toLocalDate(value)

  if (!date) {
    addFieldError(errors, index, "Data invalida")
    return
  }

  if (date.getFullYear() !== expectedYear) {
    addFieldError(errors, index, "Data fora do ano da edicao")
  }
}

function validateDatePair(errors, fields, initialIndex, finalIndex, message) {
  const initialDate = toLocalDate(fields[initialIndex]?.value)
  const finalDate = toLocalDate(fields[finalIndex]?.value)

  if (initialDate && finalDate && initialDate > finalDate) {
    addFieldError(errors, initialIndex, message)
    addFieldError(errors, finalIndex, message)
  }
}

function validateEvaluationCriteria(errors, fields, index) {
  const groups = fields[index]?.value

  if (!Array.isArray(groups) || groups.length === 0) {
    addFieldError(errors, index, "Informe ao menos um bloco de avaliacao")
    return
  }

  let groupTotal = 0
  const groupKeys = new Set()
  const targets = new Set()

  for (const group of groups) {
    const key = String(group?.key ?? "").trim()
    const target = String(group?.target ?? "").trim()
    const label = String(group?.label ?? "").trim()
    const weight = Number(group?.weight)

    if (!key || !label || !target) {
      addFieldError(errors, index, "Todos os blocos precisam de nome e alvo")
      return
    }

    if (!["work", "student"].includes(target)) {
      addFieldError(errors, index, "O alvo deve ser trabalho ou aluno")
      return
    }

    if (groupKeys.has(key) || targets.has(target)) {
      addFieldError(errors, index, "Existem blocos duplicados")
      return
    }

    if (!Number.isFinite(weight) || weight <= 0) {
      addFieldError(errors, index, "Pesos dos blocos devem ser maiores que zero")
      return
    }

    if (!Array.isArray(group.criteria) || group.criteria.length === 0) {
      addFieldError(errors, index, `O bloco ${label} precisa de criterios`)
      return
    }

    let criteriaTotal = 0
    const criteriaKeys = new Set()

    for (const criterion of group.criteria) {
      const criterionKey = String(criterion?.key ?? "").trim()
      const criterionLabel = String(criterion?.label ?? "").trim()
      const criterionWeight = Number(criterion?.weight)

      if (!criterionKey || !criterionLabel) {
        addFieldError(errors, index, `Todos os criterios de ${label} precisam de nome`)
        return
      }

      if (criteriaKeys.has(criterionKey)) {
        addFieldError(errors, index, `Existem criterios duplicados em ${label}`)
        return
      }

      if (!Number.isFinite(criterionWeight) || criterionWeight <= 0) {
        addFieldError(errors, index, `Pesos dos criterios de ${label} devem ser maiores que zero`)
        return
      }

      criteriaKeys.add(criterionKey)
      criteriaTotal += criterionWeight
    }

    if (Math.abs(criteriaTotal - 100) > 0.01) {
      addFieldError(errors, index, `A soma dos criterios de ${label} deve ser 100`)
      return
    }

    groupKeys.add(key)
    targets.add(target)
    groupTotal += weight
  }

  if (Math.abs(groupTotal - 100) > 0.01) {
    addFieldError(errors, index, "A soma dos blocos deve ser 100")
    return
  }

  if (!targets.has("work") || !targets.has("student")) {
    addFieldError(errors, index, "Informe criterios para avaliador e orientador")
  }
}

function validateEditionTimeline(errors, fields) {
  validateDatePair(errors, fields, 3, 4, "Inicio do evento maior que o fim")

  validateDatePair(errors, fields, 7, 12, "Inicio da 1 submissao maior que o fim")
  validateDatePair(errors, fields, 5, 10, "Inicio do 1 aceite maior que o fim")
  validateDatePair(errors, fields, 7, 5, "1 aceite nao pode iniciar antes da 1 submissao")
  validateDatePair(errors, fields, 12, 10, "1 aceite deve terminar junto ou depois da 1 submissao")
  validateDatePair(errors, fields, 10, 8, "1 aceite deve terminar antes da 2 submissao")

  validateDatePair(errors, fields, 8, 13, "Inicio da 2 submissao maior que o fim")
  validateDatePair(errors, fields, 6, 11, "Inicio do 2 aceite maior que o fim")
  validateDatePair(errors, fields, 8, 6, "2 aceite nao pode iniciar antes da 2 submissao")
  validateDatePair(errors, fields, 13, 11, "2 aceite deve terminar junto ou depois da 2 submissao")
  validateDatePair(errors, fields, 11, 3, "2 aceite deve terminar antes do evento")

  validateDatePair(errors, fields, 9, 14, "Inicio da avaliacao maior que o fim")
  validateDatePair(errors, fields, 3, 9, "Avaliacao nao pode iniciar antes do evento")
  validateDatePair(errors, fields, 9, 4, "Avaliacao deve iniciar durante o evento")
  validateDatePair(errors, fields, 4, 14, "Avaliacao deve terminar junto ou depois do evento")
}

function validateEditionCreation(fields) {
  const fieldErrors = Array.from({ length: fields.length }, () => "")
  const qtdErrors = Array.from({ length: fields.length }, () => [])
  const currentYear = new Date().getFullYear()
  const rawEditionYear = Number(fields[1]?.value)
  const editionYear = Number.isFinite(rawEditionYear) ? rawEditionYear : currentYear

  ;[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19, 20, 21, 22, 23]
    .forEach(index => validateRequiredField(fieldErrors, fields, index))

  if (!isEmptyValue(fields[1]?.value)) {
    if (!Number.isInteger(rawEditionYear)) {
      addFieldError(fieldErrors, 1, "Ano invalido")
    }

    if (rawEditionYear < currentYear) {
      addFieldError(fieldErrors, 1, "Ano menor que o ano atual")
    }
  }

  ;[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    .forEach(index => validateDateField(fieldErrors, fields, index, editionYear))

  validateEditionTimeline(fieldErrors, fields)

  ;[15, 16, 17].forEach(index => {
    validateRequiredQtd(qtdErrors, fields, index)

    const values = fields[index]?.qtds?.map(item => Number(item.value)) ?? []
    const hasBothValues = fields[index]?.qtds?.every(item => !isEmptyValue(item.value))

    if (hasBothValues && values[0] > values[1]) {
      addQtdError(qtdErrors, index, 0, "Minimo maior que o maximo")
      addQtdError(qtdErrors, index, 1, "Minimo maior que o maximo")
    }
  })

  validateEvaluationCriteria(fieldErrors, fields, 24)

  return { fieldErrors, qtdErrors }
}

function hasEditionErrors(validation, start, end) {
  const hasFieldError = validation.fieldErrors
    .slice(start, end)
    .some(Boolean)
  const hasQtdError = validation.qtdErrors
    .slice(start, end)
    .some(errors => errors.some(Boolean))

  return hasFieldError || hasQtdError
}

function ValidateUndefinedItems(arr) {
  return arr?.some(item => isEmptyValue(item.value))
}

function validateDates(arr, fields_qtd) {
  const currentYear = new Date().getFullYear()

  for (let i = 0; i < arr.length - fields_qtd; i++) {
    const currentDate = toLocalDate(arr[i].value)
    const finalDate = toLocalDate(arr[i + fields_qtd].value)

    if (!currentDate || !finalDate) return true

    if (
      currentDate > finalDate ||
      currentDate.getFullYear() !== currentYear ||
      finalDate.getFullYear() !== currentYear
    ) {
      return true
    }
  }

  return false
}

function validateIfDatesAreBetweenEditionDates(arr) {
  const restDates = arr.slice(2, 12)
  const initial = toLocalDate(arr[0].value)
  const final = toLocalDate(arr[1].value)

  if (!initial || !final) return true

  const allDatesInRange = restDates.every(d => {
    const date = toLocalDate(d.value)
    return date && date >= initial && date <= final
  })

  return allDatesInRange ? validateDates(restDates, 5) : true
}

function validateLimitFields(arr) {
  for (let i = 0; i < arr.length; i++) {
    const itensValues = arr[i].map(item => item.value)

    if (Number(itensValues[0]) > Number(itensValues[1])) {
      return true
    }
  }

  return false
}

export {
  validateDates,
  validateLimitFields,
  ValidateUndefinedItems,
  validateIfDatesAreBetweenEditionDates,
  validateEditionCreation,
  hasEditionErrors
}
