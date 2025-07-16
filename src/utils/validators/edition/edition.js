function ValidateUndefinedItems(arr) {
  return arr?.some(item => item.value === '')
}

function validateDates(arr, fields_qtd) {
  return computed(() => {
    for (let i = 0; i < arr.length - fields_qtd; i++) {
      const actualDate = new Date()
      const currentDate = new Date(arr[i].value)
      const finalDate = new Date(arr[i + fields_qtd].value)

      const actualYear = actualDate.getFullYear()
      const currentYear = currentDate.getFullYear()
      const finalYear = finalDate.getFullYear()
      const currentDay = currentDate.getDate()
      const currentMonth = currentDate.getMonth()
      const finalDay = finalDate.getDate()
      const finalMonth = finalDate.getMonth()

      const currentDateIsNotThisYear = currentYear !== actualYear
      const finalDateIsNotThisYear = finalYear !== actualYear


      const currentDateAfterFinal =
        currentMonth > finalMonth || (currentMonth === finalMonth && currentDay > finalDay);

      if (currentDateAfterFinal || currentDateIsNotThisYear || finalDateIsNotThisYear) {
        console.log(currentDateAfterFinal, currentDateIsNotThisYear, finalDateIsNotThisYear)
        return true
      }

    }
    return false
  }).value
}

function validateIfDatesAreBetweenEditionDates(arr) {
  return computed(() => {
    const RestDates = arr.slice(2, 12);
    const Initial = new Date(arr[0].value);
    const Final = new Date(arr[1].value);

    const allDatesInRange = RestDates.every(d => {
      const date = new Date(d.value);
      return date >= Initial && date <= Final;
    });

    console.log(!allDatesInRange)

    if (allDatesInRange) {
      console.log(validateDates(RestDates, 5))
      return validateDates(RestDates, 5)
    }
    else {
      return !allDatesInRange
    }
  }).value
}

function validateLimitFields(arr) {
  return computed(() => {
    for (let i = 0; i < arr.length; i++) {
      const itensValues = arr[i].map(item => item.value)
      console.log(itensValues)
      if (Number(itensValues[0]) > Number(itensValues[1])) {
        return true
      }
    }
    return false
  }).value
}

export {
  validateDates,
  validateLimitFields,
  ValidateUndefinedItems,
  validateIfDatesAreBetweenEditionDates
}