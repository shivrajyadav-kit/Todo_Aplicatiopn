import express from "express";
import{
    createTodo,
    alltodos,
    getTodo,
    updateTodoById,
    deleteTodo,
    deleteTodoBYId
} from "../controllers/user.controller.js";


const router = express.Router();


router.post("/create",createTodo);
router.get("/todos",alltodos);
router.get("/get/:id",getTodo);
router.put("/update/:id",updateTodoById);
router.delete("/delete",deleteTodo);
router.delete("/delete/:id",deleteTodoBYId);




export default router;