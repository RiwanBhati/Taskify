// 1. Core Imports
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');   
const app = express();

// 2. Data/Model Imports
const Task = require('./models/Task.js'); 
const Event = require('./models/Event.js');

// 3. User Schema (defined here since it's used directly in server.js)
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 4. Database Connection (Teammate will need to ensure MongoDB server is running)
// 4. Database Connection (USING MONGODB ATLAS)
const ATLAS_URI = 'mongodb+srv://prateekgarg24cse_db_user:taskify1234@taskify.z5wavto.mongodb.net/?appName=Taskify'; // Replace <...> with your saved credentials!

mongoose.connect(ATLAS_URI, { // <-- ADD THIS SECOND ARGUMENT
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Note: The driver handles these options differently now, but they often resolve 
    // these specific legacy SSL/TLS errors on older Node/OpenSSL versions.
})
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err.message);
  });

// 5. Configuration
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

// NOTE ON AUTHENTICATION: 
// For now, we are hardcoding a mock 'userId' (1) in the Task/Event routes below. 
// A real system would pull this from a session/token after login.

// 6. --- PAGE RENDERING ROUTES ---

app.get('/', (req, res) => { res.render('home'); });
app.get('/home', (req, res) => { res.render('home'); });
app.get('/login', (req, res) => { res.render('login'); });
app.get('/signup', (req, res) => { res.render('signup'); });
app.get('/chooseAmong', (req, res) => { res.render('chooseAmong'); });
app.get('/tasks', (req, res) => { res.render('To-Do-List'); });
app.get('/history', (req, res) => { res.render('history'); });
app.get('/pomodoro', (req, res) => { res.render('pomodoro'); });
app.get('/planner', (req, res) => { res.render('Event_PLanner'); });


// 7. --- API ROUTES (CRUD IMPLEMENTATION) ---

// --- USER AUTH ROUTES ---
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and save the new user
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save(); 

    res.status(201).json({ message: 'User created successfully!' });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 2. Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});


// --- TASK ROUTES (Full CRUD) ---

// GET: Read all tasks (used for To-Do List and History)
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: '1' }); // Find all tasks for the mock user
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks.' });
    }
});

// POST: Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            ...req.body,
            userId: '1' // Assign to the mock user
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: 'Invalid task data.' });
    }
});

// PUT: Update a task (used to toggle completed status)
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: '1' }, // Find by ID and mock UserID
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task.' });
    }
});

// DELETE: Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: '1' });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(204).send(); // Success, no content to return
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task.' });
    }
});


// --- EVENT ROUTES (CRUD) ---

// GET: Read all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find({ userId: '1' });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch events.' });
    }
});

// POST: Create a new event
app.post('/api/events', async (req, res) => {
    try {
        const newEvent = new Event({
            ...req.body,
            userId: '1'
        });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Invalid event data.' });
    }
});

// DELETE: Delete an event
app.delete('/api/events/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({ _id: req.params.id, userId: '1' });
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event.' });
    }
});


// 8. Start server
app.listen(PORT, () => {
    console.log(`Server is running! Access your site at: http://localhost:${PORT}`);
});