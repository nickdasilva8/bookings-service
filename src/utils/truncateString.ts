const truncateString = (inputString: string, maxLength: number) =>
  inputString.length > maxLength
    ? inputString.substring(0, maxLength - 3) + '...'
    : inputString;

export default truncateString;
