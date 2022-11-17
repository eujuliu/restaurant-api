export function normalizePhone(countryCode: number, phone: string) {
  const regex = /\d+/g;
  const onlyNumbers = phone.match(regex)?.join('');

  return `+${countryCode}${onlyNumbers}`;
}
