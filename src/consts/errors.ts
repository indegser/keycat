import createError from 'http-errors'

export const AppError = createError

class FormError extends Error {
  field: string

  constructor(code, field) {
    super(code)
    this.field = field
  }
}

export const errors = {
  invalidPassword: new FormError(412, 'password'),
  invalidUsername: new FormError(412, 'account'),
  UsernameConflict: new FormError(409, 'account'),
}