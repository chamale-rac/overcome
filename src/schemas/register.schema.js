import Joi from 'joi'
import {
  USER_REGEX,
  PWD_REGEX,
  NAME_REGEX,
  LNAME_REGEX,
  EMAIL_REGEX,
} from '@utils/regex.patterns'

const registerSchema = {
  joi: Joi.object({
    username: Joi.string().pattern(USER_REGEX),
    password: Joi.string().pattern(PWD_REGEX),
    password2: Joi.string(),
    name: Joi.string().pattern(NAME_REGEX),
    last_name: Joi.string().pattern(LNAME_REGEX),
    email: Joi.string().pattern(EMAIL_REGEX),
  }),

  initialValues: {
    username: '',
    password: '',
    password2: '',
    email: '',
    name: '',
    last_name: '',
  },

  initialErrorMessages: {
    username: false,
    password: false,
    password2: false,
    email: false,
    name: false,
    last_name: false,
  },

  initialErrorPrompts: {
    username:
      '4 to 24 characters.\nMust begin with a letter.\nLetters, numbers, underscores, hyphens allowed.',
    password:
      '8 to 24 characters.\nMust include uppercase and lowercase letters, a number and a special character.\nAllowed special characters: ! @ # $ %',
    password2: '',
    email: 'Must be a valid email address.',
    name: 'Only letters and spaces are allowed.\nMaximum length is 50 characters.',
    last_name:
      'Only letters and spaces are allowed.\nMaximum length is 50 characters.',
  },
}

export default registerSchema
