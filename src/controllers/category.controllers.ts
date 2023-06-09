import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../helpers/CustomError";
import Category from "../models/categories.model copy";
import { check_uuid } from "../utils/functions";
import { CategoryValidations } from "../validation/category.validation";

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

    if (!(await check_uuid(category_id))) {
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

// Get category by category_id controller
export const get_category_by_id: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category_id = req.params.id;

    if (!(await check_uuid(category_id))) {
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

    return res.status(200).json({
      ok: true,
      message: "Category by category_id",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Update category controller
export const update_category: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_name, category_name_translations }: any = await CategoryValidations.CreateCategoryValidation(
      req.body
    );

    const category_id = req.params.id;

    if (!(await check_uuid(category_id))) {
      return res.status(400).json({ ok: false, message: "category_id is invalid" });
    }

    let category: any = await Category.findOne({
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

    const category_is_exist = await Category.findOne({
      where: { category_name },
    });
    if (category_is_exist && category_is_exist.category_id !== category.category_id) {
      return res.status(200).json({
        ok: false,
        message: "Category with this name is already exist",
      });
    }

    await Category.update(
      {
        category_name,
        category_name_translations,
      },
      {
        where: {
          category_id,
        },
      }
    );

    return res.status(200).json({
      ok: true,
      message: "category updated",
      category,
    });
  } catch (error) {
    next(error);
  }
};
