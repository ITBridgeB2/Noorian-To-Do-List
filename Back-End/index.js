const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
