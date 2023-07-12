import { isToday } from './index'

export const avatarText = (value: string) => {
  if (!value)
    return ''
  const nameArray = value.split(' ')

  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

export const kFormatter = (num: number) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g

  return Math.abs(num) > 9999 ? `${Math.sign(num) * +((Math.abs(num) / 1000).toFixed(1))}k` : Math.abs(num).toFixed(0).replace(regex, ',')
}

export const formatDate = (value: string, formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value)
    return value

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

export const formatDateToMonthShort = (value: string, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting: Record<string, string> = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date))
    formatting = { hour: 'numeric', minute: 'numeric' }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

export const prefixWithPlus = (value: number) => value > 0 ? `+${value}` : value
