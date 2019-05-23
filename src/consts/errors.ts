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
  accountDoesNotExist: new FormError(409, 'account'),
  usernameConflict: new FormError(412, 'account'),
  transactionFailed: new FormError(400, 'password'),
}

export const errorMessages = {
  password: {
    412: `Invalid private key. Try again.`,
    400: `Transaction failed. Check payload and try again.`,
  },
  account: {
    409: `Cannot find account from EOS network.`,
    412: `Account does not match with private key.`,
  }
}