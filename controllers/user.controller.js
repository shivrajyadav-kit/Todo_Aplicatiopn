import express from "express";
import Todo from "../models/user.model.js";
import User from "../models/login.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log(process.env);

const createTodo = async (req, res) => {
  try {
    const { taskname, subscription, privarty } = req.body;
    if (!taskname || !subscription || !privarty) {
      return res.status(400).json("Feilds are required");
    }

    const createTodo = new Todo({ taskname, subscription, privarty });
    const newdata = await createTodo.save();
    return res.status(200).json(newdata);
  } catch (error) {
    console.error("Error in creating Todo", error);
    return res.status(500).json(error);
  }
};

const alltodos = async (req, res) => {
  try {
    const data = await Todo.find({});
    return res.status(200).json(data);
  } catch (error) {
    return error;
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json("Id is not found");
    }

    const getodo = await Todo.findById(id);

    if (!getodo) {
      return res.status(404).json("Todo is requirewd");
    }
    return res.status(200).json(getodo);
  } catch (error) {
    console.error("Error in geting Todo by id", error);
    return res.status(500).json(error);
  }
};

const updateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskname, subscription, privarty } = req.body;

    if (!taskname || !subscription || !privarty) {
      return res.status(400).json({ message: "Todo ID is required." });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      taskname,
      subscription,
      privarty,
    });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    // updatedTodo.taskname = taskname;
    // updatedTodo.subscription = subscription;
    // updatedTodo.privarty = privarty;

    // const todo = new Todo({
    //     taskname,subscription,privarty
    // });
    // updatedTodo = await todo.save();

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error in updateTodo:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteMany({});
    return res.status(200).json(deleteTodo);
  } catch (error) {
    console.error("Error show in delete Todo", error);
    return res.status(500).json(error);
  }
};
const deleteTodoBYId = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskname, subscription, privarty } = req.body;
    if (!id) {
      return res.status(400).json("not found");
    }
    const deltedtodo = await Todo.findByIdAndDelete(id, {
      taskname,
      subscription,
      privarty,
    });

    if (!deltedtodo) {
      return res.status(400).json({ message: "Todo not show" });
    }

    return res.status(200).json(deltedtodo);
  } catch (error) {
    console.error("Error is detected in id");
    return res.status(500).json(error);
  }
};
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(req);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("2nd log", req);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists." });
    }
    console.log("3nd log", req);
    const newUser = new User({
      username,
      email,
      password,
    });

    const savedata = await newUser.save();

    const token = jwt.sign(
      {
        id: savedata._id,
        role: savedata.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      samesite: "strict",
      maxAge: 60 * 24 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Registration successful.",
      savedata,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const IsMatch = bcrypt.compare(password, user.password);

    console.log(IsMatch);
    if (!IsMatch) {
      return res
        .status(401)
        .json({ message: "email or passord are not matched" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },

      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token);

    return res.status(200).json({
      sucess: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
export {
  createTodo,
  alltodos,
  getTodo,
  updateTodoById,
  deleteTodo,
  deleteTodoBYId,
  userLogin,
  userRegister,
};
