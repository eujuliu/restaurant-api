export function normalizePostalCode(postalCode: string) {
  const regex = /\d+/g;
  const onlyNumbers = postalCode.match(regex)?.join('');

  return onlyNumbers;
}
