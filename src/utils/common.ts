export const capitalizedString = (str: string) => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
