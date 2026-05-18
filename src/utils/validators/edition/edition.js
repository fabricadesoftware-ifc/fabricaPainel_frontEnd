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

function validateDateInsideEdition(errors, fields, index) {
  const eventStart = toLocalDate(fields[3]?.value)
  const eventEnd = toLocalDate(fields[4]?.value)
  const date = toLocalDate(fields[index]?.value)

  if (eventStart && eventEnd && eventStart <= eventEnd && date) {
    if (date < eventStart || date > eventEnd) {
      addFieldError(errors, index, "Data fora do periodo da edicao")
    }
  }
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

  validateDatePair(
    fieldErrors,
    fields,
    3,
    4,
    "Data inicial maior que a final"
  )

  ;[5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    .forEach(index => validateDateInsideEdition(fieldErrors, fields, index))

  validateDatePair(fieldErrors, fields, 5, 10, "Inicio do aceite maior que o fim")
  validateDatePair(fieldErrors, fields, 6, 11, "Inicio do aceite maior que o fim")
  validateDatePair(fieldErrors, fields, 7, 12, "Inicio da submissao maior que o fim")
  validateDatePair(fieldErrors, fields, 8, 13, "Inicio da submissao maior que o fim")
  validateDatePair(fieldErrors, fields, 9, 14, "Inicio da avaliacao maior que o fim")

  validateDatePair(
    fieldErrors,
    fields,
    10,
    8,
    "1 aceite deve terminar antes da 2 submissao"
  )
  validateDatePair(
    fieldErrors,
    fields,
    11,
    9,
    "2 aceite deve terminar antes da avaliacao"
  )

  ;[15, 16, 17].forEach(index => {
    validateRequiredQtd(qtdErrors, fields, index)

    const values = fields[index]?.qtds?.map(item => Number(item.value)) ?? []
    const hasBothValues = fields[index]?.qtds?.every(item => !isEmptyValue(item.value))

    if (hasBothValues && values[0] > values[1]) {
      addQtdError(qtdErrors, index, 0, "Minimo maior que o maximo")
      addQtdError(qtdErrors, index, 1, "Minimo maior que o maximo")
    }
  })

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
