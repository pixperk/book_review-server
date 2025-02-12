import express from "express";
import { getAllUsersController, getProfileController, login, register, toggleRoleController, updateProfileController } from "../controllers/UserController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { loginSchema, registerSchema, updateUserSchema } from "../validations/UserValidation";
import { authenticate, authorize } from "../middlewares/authMiddleware";



const router = express.Router();
router.get("/all", authenticate,authorize("admin"), getAllUsersController);
router.get("/:userId", getProfileController);
router.put("/:userId", authenticate, validateRequest(updateUserSchema), updateProfileController);
router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);

router.put("/toggle-role/:userId",authenticate, authorize("admin"),  toggleRoleController);

export default router;
