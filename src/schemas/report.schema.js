import Joi from 'joi'
import { DESCRIPTION_REGEX } from '@utils/regex.patterns'

const reportSchema = {
  joi: Joi.object({
    description: Joi.string().pattern(DESCRIPTION_REGEX),
  }),
  initialValues: {
    description: '',
  },
  initialErrorMessages: {
    description: false,
  },
  initialErrorPrompts: {
    description: '14 to 200 characters. No just spaces.',
  },
}

export default reportSchema
