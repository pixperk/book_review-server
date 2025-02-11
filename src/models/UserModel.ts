import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  comparePassword(password: string): Promise<boolean>;
  generateAuthToken(): string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
UserSchema.methods.generateAuthToken = function (): string {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};


export const User  = mongoose.model<IUser>("User", UserSchema);
