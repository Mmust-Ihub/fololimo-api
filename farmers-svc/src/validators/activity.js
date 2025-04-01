import { body, param } from "express-validator";

export const validateActivity = [
  body("farmId")
    .isMongoId()
    .withMessage("Invalid farmId. Must be a valid MongoDB ObjectId"),

  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("startDate")
    .isISO8601()
    .withMessage("Start date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) >= new Date(req.body.endDate)) {
        throw new Error("Start date must be before end date");
      }
      return true;
    }),

  body("endDate").isISO8601().withMessage("End date must be a valid date"),

  body("status")
    .optional()
    .isIn(["pending", "completed", "cancelled"])
    .withMessage('Status must be "pending", "completed", or "cancelled"'),
];
