import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../helpers/CustomError";
import Category from "../models/categories.model copy";
import { isValidUUID } from "../utils/functions";
import { CategoryValidations } from "../validation/category.validation";
const uuidValidate = require("uuid-validate");

// Create category controller
export const create_category: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_name, category_name_translations }: any = await CategoryValidations.CreateCategoryValidation(
      req.body
    );

    const category_is_exist = await Category.findOne({
      where: { category_name },
    });
    if (category_is_exist) {
      throw new CustomError("Category already exist", 400);
    }

    const category: any = await Category.create({
      category_name,
      category_name_translations,
    });

    return res.status(200).json({
      ok: true,
      message: "category created",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Get all categories controller
export const get_categories: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories: any = await Category.findAll();

    return res.status(200).json({
      ok: true,
      message: "list of categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// Delete category by category_id controller
export const delete_category: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category_id = req.params.id;

    if (!uuidValidate(category_id)) {
      return res.status(400).json({ ok: false, message: "category_id is invalid" });
    }

    const category: any = await Category.findOne({
      where: {
        category_id,
      },
    });

    if (!category) {
      return res.status(200).json({
        ok: false,
        message: "Category doesn't exist",
      });
    }

    await Category.destroy({
      where: {
        category_id,
      },
    });
    return res.status(200).json({
      ok: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};
