export function normalizePhone(countryCode: number, phone: string) {
  phone = phone.replace('(', '');
  phone = phone.replace(')', '');
  phone = phone.replace('-', '');
  phone = phone.replace(' ', '');
  phone = phone.replace(`+${countryCode}`, '');

  return `+${countryCode}${phone}`;
}
