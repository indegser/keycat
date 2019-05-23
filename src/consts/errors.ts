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

export const errorMessages = {
  password: {
    412: `Invalid private key. Try again.`,
  },
  account: {
    409: `Account does not match with private key.`,
  }
}