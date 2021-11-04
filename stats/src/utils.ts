export const dateStringToDate = (dateString: string): Date => {
  const dateParts = dateString
    .split('/')
    .map((value: string): number => {
      return parseInt(value);
  });

  // year/month/day
  // month starts at 0 index
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
