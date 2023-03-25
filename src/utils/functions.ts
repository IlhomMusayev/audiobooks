const Joi = require("joi");

function extendOTPExpiration(currentExpiration: Date): Date {
  const twoMinutesInMs = 2 * 60 * 1000; // convert 2 minutes to milliseconds
  const newExpiration = new Date(currentExpiration.getTime() + twoMinutesInMs);
  return newExpiration;
}

const check_uuid = async (uuidToCheck: string) => {
  const uuidSchema = Joi.string().uuid();
  const result = await uuidSchema.validate(uuidToCheck);

  if (result.error) return false;
  return true;
};

export { extendOTPExpiration, check_uuid };
