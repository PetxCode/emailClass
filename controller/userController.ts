// create user
import crypto from "crypto";
import { Request, Response } from "express";
import userModel from "../model/userModel";
import { verifyMyAccount } from "../newEmail";
import { resetPassword, verifyAccount } from "../util/email";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const token = crypto.randomBytes(32).toString("hex");

    const OTP = crypto.randomBytes(2).toString("hex");

    const user: any = await userModel.create({
      userName,
      email,
      password,
      OTP,
      token,
    });
    verifyMyAccount()
      .then(() => {
        console.log("mail sent");
      })
      .catch((err) => {
        console.log(err);
      });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// view users

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const user = await userModel.find();

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// view single user

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;

    const user = await userModel.findById(id);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
// update user

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;

    const user = await userModel.findByIdAndUpdate(
      id,
      {
        userName,
      },
      { new: true },
    );

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
// delete user
export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;

    const user = await userModel.findByIdAndDelete(id);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// verify user

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { OTP } = req.body;
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (user?.OTP === OTP) {
      if (user?.token !== "") {
        await userModel.findByIdAndUpdate(
          id,
          {
            token: "",
            verified: true,
          },
          { new: true },
        );

        return res.json({
          message: "Account has been verified, you can now signin",
        });
      } else {
        return res.json({ message: "Wrong OTP" });
      }
    } else {
      return res.json({ message: "Wrong OTP" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// request reset password

export const passwordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    const token = crypto.randomBytes(32).toString("hex");
    if ((user?.token === "", user?.verified)) {
      const userData = await userModel.findByIdAndUpdate(
        user?._id,
        { token },
        { new: true },
      );

      resetPassword(userData);

      return res.json({
        message: "An email has been sent to you based on your Request",
      });
    } else {
      return res.json({ message: "just a message" });
    }

    res;

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// reset password

export const changePasswordUser = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    const myUser = await userModel.findById(id);

    if (myUser) {
      if (myUser.token === token && myUser.verified) {
        const user = await userModel.findByIdAndUpdate(
          id,
          {
            password,
            token: "",
          },
          { new: true },
        );

        return res.json({
          message: "Your password has been changed, SUCCESSFULLY!",
          data: user,
        });
      } else {
        return res.json({ message: "Please just go" });
      }
    } else {
      return res.json({ message: "User doesn't Exist" });
    }
  } catch (error) {
    console.log(error);
  }
};
