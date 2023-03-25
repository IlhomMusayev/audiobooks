import { Router } from "express";
import {
  create_category,
  delete_category,
  get_categories,
  get_category_by_id,
} from "../controllers/category.controllers";
import AuthMiddleware from "../middleware/authMiddleware";

const categoryRouter = Router();
/**
 * @openapi
 * /categories/create:
 *   post:
 *     summary: Create new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *               category_name_translations:
 *                 type: json
 *             required:
 *               - category_name
 *               - category_name_translations
 *     responses:
 *       '200':
 *         description: Category created successful
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - Category
 */
categoryRouter.post("/create", create_category);

/**
 * @openapi
 * /categories/get_all:
 *   get:
 *     summary: Get all categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *               category_name_translations:
 *                 type: json
 *     responses:
 *       '200':
 *         description: List of categories
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - Category
 */
categoryRouter.get("/get_all", get_categories);

/**
 * @openapi
 * /categories/delete/{category_id}:
 *   get:
 *     summary: Delete category by category_id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Category is deleted
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - Category
 */
categoryRouter.delete("/delete/:id", delete_category);

/**
 * @openapi
 * /categories/get/{category_id}:
 *   get:
 *     summary: Get category by category_id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Category by category_id
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 *     tags:
 *      - Category
 */
categoryRouter.get("/get/:id", get_category_by_id);
export default categoryRouter;
