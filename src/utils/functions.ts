function extendOTPExpiration(currentExpiration: Date): Date {
  const twoMinutesInMs = 2 * 60 * 1000; // convert 2 minutes to milliseconds
  const newExpiration = new Date(currentExpiration.getTime() + twoMinutesInMs);
  return newExpiration;
}
export { extendOTPExpiration };
