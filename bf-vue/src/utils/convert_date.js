export default function (str) {
  var months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }
  var date_str = str.slice(0, 10).split('-')
  var day = parseInt(date_str[2])
  var month = months[parseInt(date_str[1])]
  var year = date_str[0]
  return month + ' ' + day + ', ' + year
}