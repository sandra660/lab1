const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  try {
    const { done } = req.query;

    const filter = {};

    if (done !== undefined) {
      filter.done = done === 'true';
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
const createTodo = async (req, res) => {
  try {
    const { title, done } = req.body;
    const todo = await Todo.create({ title, done });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };