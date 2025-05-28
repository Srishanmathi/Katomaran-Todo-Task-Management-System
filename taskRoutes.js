// Example: routes/tasks.js (inside your router.post('/'))
router.post('/', async (req, res) => {
  try {
    const { userId, title, description, dueDate, completed } = req.body;

    // Frontend validation is good, but backend validation is crucial for security
    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: 'Title, Description, and Due Date are required.' });
    }

    const newTask = new Task({
      userId,
      title,
      description,
      dueDate, // dueDate is now required
      completed: completed || false,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error.message);
    // Mongoose validation errors will have error.name === 'ValidationError'
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).send('Server Error');
  }
});