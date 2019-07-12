import createError from 'http-errors'

export const AppError = createError

class FormError extends Error {
  field: string

  constructor(code, field) {
    super(code)
    this.field = field
  }
}

const messagePick = () => {

}

export const errors = {
  invalidPassword: new FormError(412, 'password'),
  notFoundOnKeychain: new FormError(413, 'password'),
  accountDoesNotExist: new FormError(409, 'account'),
  usernameConflict: new FormError(412, 'account'),
  transactionFailed: new FormError(400, 'password'),
  signTransactionFailed: new FormError('SIGN_TRANSACTION_FAILED', 'account'),
  signin: (fn: (msgs: typeof SigninErrorMessage) => any, error?: Error) => {
    const message = fn(SigninErrorMessage)
    return new KeycatError(message, error)
  },
  register: (fn: (msgs: typeof RegisterMessage) => any) => {
    const message = fn(RegisterMessage)
    return new KeycatError(message)
  },
  transact: (fn: (msgs: typeof TransactMessage) => any) => {
    const message = fn(TransactMessage)
    return new KeycatError(message)
  }
}

enum TransactMessage {

}

enum RegisterMessage {
  NotRegisteredInKeychain = 'It seems account is not stored in keychain. Did you \"Save Password\"?',
}

export enum SigninErrorMessage {
  PasswordLengthIsZero = 'Could not retrieve account stored in Keychain.',
  InvalidPassword = 'Invalid private key.',
  AccountNotFound = 'Could not find your account from blockchain.',
}

export class KeycatError extends Error {
  rawError: Error

  constructor(type: SigninErrorMessage, rawError?: Error) {
    super(type)
    this.name = 'SigninError'
    this.rawError = rawError
  }
}

export const errorMessages = {
  password: {
    412: `Invalid private key. Try again.`,
    413: `Cannot find account in keychain. Try import first.`,
    400: `Transaction failed. Check payload and try again.`,
  },
  account: {
    SIGN_TRANSACTION_FAILED: 'Cannot sign transaction',
    409: `Cannot find account from EOS network.`,
    412: `Account does not match with private key.`,
  }
}