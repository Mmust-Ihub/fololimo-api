import { body } from "express-validator";

export const validateInventory = [
  body("farmId")
    .notEmpty()
    .withMessage("Farm ID is required")
    .isMongoId()
    .withMessage("Invalid Farm ID"),

  body("cost")
    .notEmpty()
    .withMessage("Cost is required")
    .isNumeric()
    .withMessage("Cost must be a number"),

  body("transactionType")
    .notEmpty()
    .withMessage("Transaction type is required")
    .isIn(["income", "expense"])
    .withMessage("Transaction type must be either 'income' or 'expense'"),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string")
    .isLength({ min: 10 })
    .withMessage("description must be at least 3 characters long"),
];
