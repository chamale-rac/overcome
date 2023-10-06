import Joi from 'joi'
import {
  USER_REGEX,
  NAME_REGEX,
  LNAME_REGEX,
  EMAIL_REGEX,
} from '@utils/regex.patterns'

const profileSchema = {
  joi: Joi.object({
    username: Joi.string().pattern(USER_REGEX),
    name: Joi.string().pattern(NAME_REGEX),
    lastname: Joi.string().pattern(LNAME_REGEX),
    email: Joi.string().pattern(EMAIL_REGEX),
  }),

  initialValues: {
    username: '',
    email: '',
    name: '',
    lastname: '',
  },

  initialErrorMessages: {
    username: false,
    email: false,
    name: false,
    lastname: false,
  },

  initialErrorPrompts: {
    username:
      '4 to 24 characters.\nMust begin with a letter.\nLetters, numbers, underscores, hyphens allowed.',
    email: 'Must be a valid email address.',
    name: 'Only letters and spaces are allowed.\nMaximum length is 50 characters.',
    lastname:
      'Only letters and spaces are allowed.\nMaximum length is 50 characters.',
  },
}

export default profileSchema
