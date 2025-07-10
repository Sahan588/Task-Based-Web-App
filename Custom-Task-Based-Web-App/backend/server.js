const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log('❌ DB Connection Error:', err));
//task1111
/*"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmYzZDhkZjM3MjA5ZWVjN2QwNzhiZSIsImlhdCI6MTc1MjEyNDg3NCwiZXhwIjoxNzUyNzI5Njc0fQ.SO3EIVe7NFHGK9fc1PRJvOuaT5NOn_bIgMSF6KdGiQc",*/