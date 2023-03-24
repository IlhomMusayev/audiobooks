import { Router } from "express";
import {
  registerUser,
  confirmCode,
  resendCode,
  patchUserProfile,
} from "../controllers/user.controllers";
import AuthMiddleware from "../middleware/authMiddleware";

const userRouter = Router();
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 pattern: ^(\+998)?(\s)?\d{2}(\s)?\d{3}(\s)?\d{2}(\s)?\d{2}$
 *             required:
 *               - phone_number
 *     responses:
 *       '200':
 *         description: User registration successful
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - User
 */
userRouter.post("/register", registerUser);
/**
 * @openapi
 * /auth/confirm:
 *   post:
 *     summary: Confirmation code
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hash:
 *                 type: number
 *             required:
 *               - hash
 *     responses:
 *       '200':
 *         description: Confirmation successful
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - User
 */
userRouter.post("/confirm", AuthMiddleware, confirmCode);
/**
 * @openapi
 * /auth/resend:
 *   post:
 *     summary: Resend confirmation code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 pattern: ^(\+998)?(\s)?\d{2}(\s)?\d{3}(\s)?\d{2}(\s)?\d{2}$
 *             required:
 *               - phone_number
 *     responses:
 *       '200':
 *         description: User registration successful
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - User
 */
userRouter.post("/resend", resendCode);
/**
 * @openapi
 * /auth/profile:
 *   patch:
 *     security:
 *       - jwt: []
 *     summary: Profile patch request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                full_name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *
 *     responses:
 *       '200':
 *         description: User edit successful
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - User
 */
userRouter.patch("/profile", AuthMiddleware, patchUserProfile);

export default userRouter;
