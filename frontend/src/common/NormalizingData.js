export const normalizeDate = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const normalizedDate = date.getDate('dd') + ' ' + monthNames[(date.getMonth() + 1)] + ', ' + date.getFullYear() + ' ' + date.getHours() + ":" + date.getMinutes()
  return normalizedDate
}

export const normalizePhoneNumber = (phone) => {
  const normalizedPhone = '+1 (' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, phone.length)
  return normalizedPhone;
}

export const weightConverter = (value, from, to) => {
  if (from === 'kg' && to === 'lbs') {
    return parseInt(value * 2.2046)
  } else {
    return parseInt(value / 2.2046)
  }
}
export const heightConverter = (value, from, to) => {
  if (from === 'cm' && to === 'feet') {
    return (value * 0.032808).toFixed(2)
  } else {
    return (value / 0.032808).toFixed(2)
  }
} 