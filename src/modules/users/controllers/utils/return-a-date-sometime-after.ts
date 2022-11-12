interface Props {
  date: Date;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function returnADateSometimeAfter({
  date,
  hours = 0,
  minutes = 0,
  seconds = 0,
}: Props) {
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + seconds);

  return date;
}
