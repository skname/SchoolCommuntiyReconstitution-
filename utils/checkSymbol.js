const Reg = /[&|$|/|\\]/
export function checkSymbol(str = '') {
  if (str == '') return '';
  let content = [...str];
  let curr = content.join('').match(Reg)
  while (curr) {
    content.splice(curr.index, 1);
    curr = content.join('').match(Reg)
  }
  return content.join('')
  return str
}