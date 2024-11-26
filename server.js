/*******************import***************** */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const user = require('./models/user');
/**********Configure the environment ******* */
dotenv.config();
/**********Lunch a server with express ***** */
const app = express();
app.use(express.json());
/**************Connect your database locally********** */
const server = 'localhost:27017';
const database = 'myDB';
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error', err);
      });
  }
}
const databaseCon = new Database()
databaseCon.connect()
/*********************************** */
// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port:http://localhost:${PORT}`);
});
/******************Routes ********* */
//     GET :  RETURN ALL USERS 
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "getting users", users })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//   POST :  ADD A NEW USER TO THE DATABASE
/*app.post("/users", async (req, res) => {
  const post = new User({
    name: 'sallah',
    age: 20,
    email: 'sallah@gmail.com'
  })
  await post.save()
  res.send(post)
})*/
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  PUT : EDIT A USER BY ID 

app.put("/users/:_id", async (req, res) => {
  try {
    const userId = "6745936c43d8626a8e5b9a21";
    const user_found = await User.findById(userId);

    if (!user_found) {
      return res.status(404).json({ error: "User not found" });
    }

    user_found.name = "mohamed";
    user_found.name = 50;
    user_found.email = 'mohamed@gmail.com'

    const updatedUser = await user_found.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE : REMOVE A USER BY ID 
app.delete("/users/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "User doesn't exist!" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});