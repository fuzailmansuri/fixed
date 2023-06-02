const express = require('express');
const router = express.Router();
const { Login, Signup } = require('../models/userinfo');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/signup', async (req, res) => {
  try
  {
    const user = new Signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      date: new Date()
    });
    await user.save();
    res.render('login');
  } catch (err)
  {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  try
  {
    const user = await Signup.findOne({ email: req.body.email });
    if (!user)
    {
      return res.render('login', { error: 'Invalid User' });
    }
    const isPasswordValid = req.body.password === user.password;
    if (!isPasswordValid)
    {
      return res.render('login', { error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user._id }, 'your-secret-key');

    // Set the token in a cookie
    res.cookie('token', token, { httpOnly: true, secure: true });

    res.render('index');
  } catch (err)
  {
    res.status(400).send(err);
  }
});
router.post('/logout', (req, res) => {

  res.cookie('token', '', { expires: new Date(0), path: '/' });

  res.redirect('/');
});
module.exports = router;
