export const USER_REGEX = /^[A-Za-z0-9-_]{4,24}$/

export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/

export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export const NAME_REGEX = /^[A-Za-z\s]{1,50}$/

export const LNAME_REGEX = /^[A-Za-z\s]{1,50}$/

export const TITLE_REGEX = /^(?!\s+$)[\S\s]{8,30}$/

export const DESCRIPTION_REGEX = /^(?!\s+$)[\S\s]{14,200}$/

export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export const HOUR_REGEX = /^\d{2}:\d{2}$/

export const DURATION_REGEX = /^(?:[0-9]|[1-9][0-9]{1,2}|720)$/

export const TAG_REGEX = /^[\w\s,-]+$/

export const LINK_REGEX =
  /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/
