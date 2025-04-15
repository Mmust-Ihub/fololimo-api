import { body } from "express-validator";

export const validateActivity = [
  // ✅ Validate farmId as a MongoDB ObjectId
  body("farmId")
    .notEmpty().withMessage("farmId is required")
    .isMongoId().withMessage("Invalid farmId. Must be a valid MongoDB ObjectId"),

  // ✅ Title validation
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  // ✅ Description validation
  body("description")
    .notEmpty().withMessage("Description is required")
    .isString().withMessage("Description must be a string")
    .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),

  // ✅ Start Date validation
  body("startDate")
    .notEmpty().withMessage("Start date is required")
    .isISO8601().withMessage("Start date must be a valid ISO8601 date")
    .custom((value, { req }) => {
      const start = new Date(value);
      const end = new Date(req.body.endDate);
      const now = new Date();

      if (isNaN(end)) {
        throw new Error("End date must be provided and valid to compare with start date");
      }

      if (start >= end) {
        throw new Error("Start date must be before end date");
      }

      if (start < now.setHours(0, 0, 0, 0)) {
        throw new Error("Start date must not be in the past");
      }

      return true;
    }),

  // ✅ End Date validation
  body("endDate")
    .notEmpty().withMessage("End date is required")
    .isISO8601().withMessage("End date must be a valid ISO8601 date"),

  // ✅ Optional status field
  body("status")
    .optional()
    .isIn(["pending", "completed", "cancelled"])
    .withMessage('Status must be "pending", "completed", or "cancelled"'),
];
