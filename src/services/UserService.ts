import { User } from "../models/UserModel";

export const signUp = async (
  name: string,
  email: string,
  password: string,
  role: "user" | "admin" = "user"
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ name, email, password, role });
  await user.save();

  const token = user.generateAuthToken();
  return { user, token };
};

export const signIn = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = user.generateAuthToken();
  return { user, token };
};

export const getAllUsers = async()=>{
  const users = await User.find();
  return users;
}

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User does not exist");
  return user;
};

export const updateProfile = async (
  userId: string,
  name: string,
  email: string
) => {
  const existingUser = await User.findOne({ email, _id: { $ne: userId } });
  if (existingUser) throw new Error("Email is already in use by another user");

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true }
  );

  if (!updatedUser) throw new Error("User does not exist");

  return updatedUser;
};

export const toggleRole = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.role = user.role === "user" ? "admin" : "user";
  await user.save();
  return user;
};
