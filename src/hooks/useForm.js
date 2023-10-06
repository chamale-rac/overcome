import React, { useState } from 'react'

const useForm = (
  schema,
  initialValues,
  initialErrorMessages,
  initialErrorPrompts,
) => {
  const [error, setError] = useState(true)
  const [values, setValues] = useState(initialValues)
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages)
  const [errorPrompts, setErrorPrompts] = useState(initialErrorPrompts)

  const setValue = (field, value) => {
    setValues((old) => ({
      ...old,
      [field]: value,
    }))
  }

  const totalClean = () => {
    const emptyValues = Object.keys(values).reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {})
    setValues(emptyValues)
  }

  const setErrorMessage = (field, error) =>
    setErrorMessages((old) => ({
      ...old,
      [field]: error,
    }))

  const onChange =
    (field) =>
    ({ target: { value } }) => {
      fieldValidate(field, value)
      setValue(field, value)
    }

  const fieldValidate = (field, value) => {
    const validation = schema.extract(field).validate(value)
    if (validation.error) {
      setErrorMessage(field, errorPrompts[field])
      setError(true)
    } else {
      /* console.log(`Validation successful for field ${field}`)*/
      setErrorMessage(field, false)
      setError(false)
    }
  }

  const validate = () => {
    const validation = schema.validate(values)
    if (validation.error) {
      setError(true)
      return false
    }
    setError(false)
    return true
  }

  return {
    values,
    setValue,
    setValues,
    onChange,
    error,
    errorMessages,
    validate,
    totalClean,
  }
}

export default useForm
