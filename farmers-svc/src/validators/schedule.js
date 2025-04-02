import { body } from "express-validator";
export const validateFarmingActivity = [
    body("farmId")
      .notEmpty()
      .withMessage("Farm ID is required")
      .isMongoId()
      .withMessage("Invalid Farm ID"),
    
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Activity name is required")
      .isString()
      .withMessage("Activity name must be a string"),
    
    body("startDate")
      .notEmpty()
      .withMessage("Start date is required")
      .isISO8601()
      .withMessage("Start date must be a valid ISO 8601 date"),
    
    body("duration")
      .notEmpty()
      .withMessage("Duration is required")
      .isString()
      .withMessage("Duration must be a string"),
    
    body("cost")
      .notEmpty()
      .withMessage("Cost is required")
      .isString()
      .withMessage("Cost must be a string"),
    
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string"),
  ];