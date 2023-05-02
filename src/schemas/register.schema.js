import Joi from 'joi'
import { USER_REGEX, PWD_REGEX } from '@utils/regex.patterns'

const registerSchema = {
  joi: Joi.object({
    username: Joi.string().pattern(USER_REGEX),
    password: Joi.string().pattern(PWD_REGEX),
    password2: Joi.string().valid(Joi.ref('password')).required(),
  }),
  initialValues: { username: '', password: '', password2: '' },
  initialErrorMessages: { username: false, password: false, password2: false },
  initialErrorPrompts: {
    username:
      '4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.',
    password:
      '8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ %',
    password2: 'Passwords must match.',
  },
}

export default registerSchema
