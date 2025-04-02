import { body } from "express-validator";

export const validateFarm = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Farm name is required")
    .isString()
    .withMessage("Farm name must be a string"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be a string"),

  body("size")
    .notEmpty()
    .withMessage("Farm size is required")
    .isNumeric()
    .withMessage("Farm size must be a number"),

  body("geolocation")
    .optional()
    .isObject()
    .withMessage("Geolocation must be an object"),
];
