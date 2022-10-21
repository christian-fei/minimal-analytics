export function visitorColor (v) {
  return '#' + intToRGB(hashCode(v))

  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  function hashCode (str) { // java String#hashCode
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return hash
  }

  function intToRGB (i) {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase()

    return '00000'.substring(0, 6 - c.length) + c
  }
}
