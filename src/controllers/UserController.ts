import { Request, Response } from "express";
import { getProfile, signIn, signUp, toggleRole, updateProfile } from "../services/UserService";
import { ZodError } from "zod";
import { AuthRequest } from "../middlewares/authMiddleware";

export const register = async (req: Request, res: Response) => {
  try {
    
    const { name, email, password } = req.body;
    const { user, token } = await signUp(name, email, password, "user");
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error || error instanceof ZodError ? error.message : "Bad Values" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await signIn(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error || error instanceof ZodError ? error.message : "Bad Values"  });
  }
};


export const getProfileController = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params;
    if(!userId) throw new Error("User not found");
    const user = await getProfile(req.params.userId);
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    
    res.status(404).json({ message: error instanceof Error ? error.message : "User not found" });
  }
}

export const updateProfileController = async (req: AuthRequest, res: Response) => {
  try {
    const {userId} = req.params;
    if(!userId) throw new Error("User not found");
    if(userId!=req.user?.id!) throw new Error("This is not your profile");
    const { name, email } = req.body;
    const user = await updateProfile(userId, name, email);
    res.status(200).json({user});
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : "User not found" });
  }
}

export const toggleRoleController = async (req: AuthRequest, res: Response) => {
  try {
    const {userId} = req.params;
    if(!userId) throw new Error("User not found");
    const user = await toggleRole(userId);
    res.status(200).json({user});
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : "User not found" });
  }
}