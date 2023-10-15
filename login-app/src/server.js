const express = require('express');
const  dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const argon2 = require('argon2');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

// security password
async function hashPassword(password) {
    try {
      const hash = await argon2.hash(password);
      return hash;
    } catch (err) {
      // Trate os erros apropriadamente
      console.error(err);
      throw err;
    }
  }

  
// connection with the database
mongoose.connect(`mongodb+srv://Duarte:${process.env.PASSWORD}@loginapi.jqmetlr.mongodb.net/?retryWrites=true&w=majority`);

// this line creates a table in database
const User = mongoose.model('createUser', {
    email: String,
    name: String,
    password: String,
    confirmPassword: String
})

// request for get user
app.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
});

// delete user
app.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.send(user)
})

// update user data
app.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }, {
        new: true
    });

    return res.send(user)
})

// register user in database
app.post('/register', async (request, response) => {
    const email = new User({
        email: request.body.email,
        name: request.body.name,
        password: await hashPassword(request.body.password),
        confirmPassword: await hashPassword(request.body.confirmPassword)
    })

   await email.save()
   response.send(email)
})

app.listen(4000, () => {
    console.log('listening on port 4000');
});

