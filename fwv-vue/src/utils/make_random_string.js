export default function () {
  var chars = []
  var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  for(var i = 0; i < 12; i++) {
    var temp = Math.floor(Math.random() * 26)
    chars.push(alphabet[temp])
  }
  return chars.join('')
}