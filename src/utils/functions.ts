function extendOTPExpiration(currentExpiration: Date): Date {
  const twoMinutesInMs = 2 * 60 * 1000; // convert 2 minutes to milliseconds
  const newExpiration = new Date(currentExpiration.getTime() + twoMinutesInMs);
  return newExpiration;
}

function isValidUUID(uuid: string) {
  // Define a regular expression that matches the UUID format
  const uuidRegex = /^[a-f\d]{8}-[a-f\d]{4}-[1-5]\d{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
  return uuidRegex.test(uuid);
}
export { extendOTPExpiration, isValidUUID };
