export const normalizeDate = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const normalizedDate = date.getDate('dd') + ' ' + monthNames[(date.getMonth())] + ', ' + date.getFullYear() + ' ' + date.getHours() + ":" + date.getMinutes()
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

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return '';
}

export const normalizedSpecialMedicalRecord = (data, residentId) => {

  let normalizedRecords = {
    residentId: residentId,
    medicals: []
  }
  data.forEach(element => {
    const existedType = normalizedRecords.medicals.find(rec => rec.recordType === element.recordType) || {}

    if (Object.keys(existedType).length !== 0) {
      normalizedRecords.medicals = [
        ...normalizedRecords.medicals.filter(res => res.recordType !== element.recordType),
        {
          recordType: existedType.recordType,
          records: [
            ...existedType.records,
            {
              _id: element._id,
              recordTitle: element.recordTitle,
              recordDescription: element.recordDescription
            }
          ]
        }
      ]
    } else {
      normalizedRecords.medicals = [
        ...normalizedRecords.medicals,
        {
          recordType: element.recordType,
          records: [
            {
              _id: element._id,
              recordTitle: element.recordTitle,
              recordDescription: element.recordDescription
            }
          ]
        }
      ]
    }
  });

  return normalizedRecords
}

export const normalizedNotes = (data, residentId) => {

  let normalizedRecords = {
    residentId: residentId,
    notes: []
  }
  data.forEach(element => {
    const existedType = normalizedRecords.notes.find(rec => rec.noteType === element.noteType) || {}

    if (Object.keys(existedType).length !== 0) {
      normalizedRecords.notes = [
        ...normalizedRecords.notes.filter(res => res.noteType !== element.noteType),
        {
          noteType: existedType.noteType,
          records: [
            ...existedType.records,
            {
              _id: element._id,
              note: element.note,
              updatedAt: element.updatedAt,
              createdId: element.createdId,
              shareableId: element.shareableId,
              createdUser: element.createdUser
            }
          ]
        }
      ]
    } else {
      normalizedRecords.notes = [
        ...normalizedRecords.notes,
        {
          noteType: element.noteType,
          records: [
            {
              _id: element._id,
              note: element.note,
              updatedAt: element.updatedAt,
              createdId: element.createdId,
              shareableId: element.shareableId,
              createdUser: element.createdUser
            }
          ]
        }
      ]
    }
  });

  return normalizedRecords
}