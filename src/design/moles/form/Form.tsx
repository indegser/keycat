import React, { useContext, HTMLProps, useState, useRef, useCallback } from 'react'

const FormContext = React.createContext({
  errors: {},
})

export const useForm = () => {
  return useContext(FormContext)
}

interface Props extends HTMLProps<HTMLFormElement> {
  onSubmit: (a: any) => void
}

export const Form: React.SFC<Props> = props => {
  const [errors, setErrors] = useState({})
  const ref = useRef(null)

  const onSubmit = useCallback(e => {
    e.preventDefault()
    setErrors({})
    const formData = new FormData(e.target)
    const values = {}

    formData.forEach((value, key) => {
      values[key] = value
    })
    console.log('values: ', values)
    props.onSubmit({ values, setErrors })
  }, [])

  const totalErrors = { ...errors, ...props.errors }

  return (
    <FormContext.Provider
      value={{
        errors: totalErrors,
      }}
    >
      <form ref={ref} {...props} onSubmit={onSubmit} className="form" />
    </FormContext.Provider>
  )
}
