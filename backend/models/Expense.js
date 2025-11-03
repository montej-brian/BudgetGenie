import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  category: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
