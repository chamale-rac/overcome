import Joi from 'joi'
import { USER_REGEX, PWD_REGEX } from '@utils/regex.patterns'

const loginSchema = {
  joi: Joi.object({
    username: Joi.string().pattern(USER_REGEX),
    password: Joi.string().pattern(PWD_REGEX),
  }),

  initialValues: {
    username: '',
    password: '',
  },

  initialErrorMessages: {
    username: false,
    password: false,
  },

  initialErrorPrompts: {
    username:
      '4 to 24 characters.\nMust begin with a letter.\nLetters, numbers, underscores, hyphens allowed.',
    password:
      '8 to 24 characters.\nMust include uppercase and lowercase letters, a number and a special character.\nAllowed special characters: ! @ # $ %',
  },
}

export default loginSchema
