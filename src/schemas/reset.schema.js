import Joi from 'joi'
import { EMAIL_REGEX } from '@utils/regex.patterns'

const recoverSchema = {
  joi: Joi.object({
    email: Joi.string().pattern(EMAIL_REGEX),
  }),
  initialValues: {
    email: '',
  },
  initialErrorMessages: {
    email: false,
  },
  initialErrorPrompts: {
    email: 'Must be a valid email address.',
  },
}

const verifySchema = {
  joi: Joi.object({
    code: Joi.string().length(6),
  }),
  initialValues: {
    code: '',
  },
  initialErrorMessages: {
    code: false,
  },
  initialErrorPrompts: {
    code: 'Must be a valid code.',
  },
}

const resetSchema = {
  joi: Joi.object({
    password: Joi.string().pattern(PWD_REGEX),
    password2: Joi.string(),
  }),
  initialValues: {
    password: '',
    password2: '',
  },
  initialErrorMessages: {
    password: false,
    password2: false,
  },
  initialErrorPrompts: {
    password:
      '8 to 24 characters.\nMust include uppercase and lowercase letters, a number and a special character.\nAllowed special characters: ! @ # $ %',
    password2: '',
  },
}

export { recoverSchema, verifySchema, resetSchema }
