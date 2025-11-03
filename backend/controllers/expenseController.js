import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const expense = await Expense.create({ ...req.body, user: req.user });
  res.json(expense);
};

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
  res.json(expenses);
};
