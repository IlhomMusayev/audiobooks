import { NextFunction, Request, RequestHandler, Response } from "express";
import { checkToken, genereteToken } from "../services/jwt.service";
import { CustomError } from "../helpers/CustomError";
import { extendOTPExpiration } from "../utils/functions";
import Attempts from "../models/attempts.model";
import randomNumber from "../services/generateNumber.service";
import User from "../models/users.model";
import sendSmsTo from "../services/sms.service";
import Sessions from "../models/sessions.model";
import { Validations } from "../validation/user.validation";

// Register user controller
export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number }: any =
      await Validations.RegisterPhoneNumberValidation(req.body);

    const isUser = await User.findOne({
      where: { phone_number },
    });
    if (isUser) {
      throw new CustomError("User already exists", 401);
    }

    const user: any = await User.create({
      phone_number,
    });

    const session = await Sessions.create({
      useragent: req.headers["user-agent"] || "Unknown",
      user_id: user.id,
    });

    const token = await genereteToken({
      session_id: session.id,
    });

    const genNumber = randomNumber;
    const attempts = await Attempts.create({
      code: genNumber,
      user_id: user.id,
    });

    await sendSmsTo(phone_number.slice(1), `Tasdiqlash kodi ${genNumber}`);

    return res.status(200).json({
      token: token,
      user: {
        ...user.dataValues,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Confirm code controller
export const confirmCode: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const { hash }: any = await Validations.HashValidation(req.body);

    // Check if user exists
    const token = await checkToken(req.headers.authorization);

    // Get session
    const session: any = await Sessions.findOne({
      where: {
        id: token?.session_id,
      },
    });

    // Get OTP attempts
    const attempts: any = await Attempts.findOne({
      where: {
        user_id: session.user_id,
      },
      raw: true,
    });

    // Check if code is incorrect
    if (!attempts) {
      throw new CustomError("Confirmation code is incorrect", 402);
    }

    // Check if code is expired
    if (extendOTPExpiration(attempts.createdAt) < new Date()) {
      await Attempts.destroy({
        where: {
          user_id: session.user_id,
        },
      });
      throw new CustomError("Confirmation code is expired", 401);
    }

    // Check if code is correct
    else if ((attempts.code as string) === hash && !attempts.isExpired) {
      await Attempts.destroy({
        where: {
          user_id: session.user_id,
        },
      });
      await User.update(
        {
          status: "active",
        },
        {
          where: {
            id: session.user_id,
          },
        }
      );
      return res.status(200).json({
        message: "Confirmation successful",
      });
    } else {
      throw new CustomError("Confirmation code is incorrect", 402);
    }
  } catch (error) {
    next(error);
  }
};

// Resend code controller
export const resendCode: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone_number }: any =
      await Validations.RegisterPhoneNumberValidation(req.body);

    // Get user
    const user = await User.findOne({
      where: { phone_number },
    });
    // Check if user found
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const session = await Sessions.create({
      useragent: req.headers["user-agent"] || "Unknown",
      user_id: user.id,
    });

    const token = await genereteToken({
      session_id: session.id,
    });

    const genNumber = randomNumber;
    const attempts = await Attempts.create({
      code: genNumber,
      user_id: user.id,
    });

    await sendSmsTo(
      phone_number.slice(1),
      `Tasdiqlash kodi ${genNumber}\n\nNaqshiyApp`
    );

    return res.status(200).json({
      token: token,
      user: {
        ...user.dataValues,
      },
    });
  } catch (error) {
    next(error);
  }
};
// Patch user profile controller
export const patchUserProfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { full_name, email, password }: any =
      await Validations.PatchUserValidation(req.body);

    console.log(full_name, email, password);
  } catch (error) {
    next(error);
  }
};
