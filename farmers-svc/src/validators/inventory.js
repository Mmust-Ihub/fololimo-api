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
      .trim()
      .notEmpty()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string"),
  ];