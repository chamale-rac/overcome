import Joi from 'joi'
import {
  TITLE_REGEX,
  DESCRIPTION_REGEX,
  HOUR_REGEX,
  DATE_REGEX,
  DURATION_REGEX,
  TAG_REGEX,
  LINK_REGEX,
} from '@utils/regex.patterns'

const eventSchema = {
  joi: Joi.object({
    title: Joi.string().pattern(TITLE_REGEX),
    description: Joi.string().pattern(DESCRIPTION_REGEX),
    date: Joi.string().pattern(DATE_REGEX),
    duration: Joi.string().pattern(DURATION_REGEX),
    hour: Joi.string().pattern(HOUR_REGEX),
    tags: Joi.string().pattern(TAG_REGEX),
    link: Joi.string().pattern(LINK_REGEX),
  }),

  initialValues: {
    title: '',
    description: '',
    date: '',
    duration: '',
    hour: '',
    tags: '',
    link: '',
  },

  initialErrorMessages: {
    title: false,
    description: false,
    date: false,
    duration: false,
    hour: false,
    tags: false,
    link: false,
  },

  initialErrorPrompts: {
    title: '8 to 30 characters. No just spaces.',
    description: '14 to 200 characters. No just spaces.',
    date: 'Type a valid date, e.g. 01/01/2024.',
    duration: 'Needs to be a number between 0 and 720. 0 means all day.',
    hour: 'Type a valid hour, e.g. 12:00.',
    tags: 'Tags for your event, separated by commas. e.g. Halo, CSGO, Valorant.',
    link: 'Type a valid link, e.g. https://www.google.com.',
  },
}

export default eventSchema
