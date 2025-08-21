import express from 'express';
import User from '../models/users.js';

const router = express.Router();

router.post('/', async(req, res) => {
  const user = req.body;
  if(!user.name || !user.password) {
    return res.status(400).json({message: 'Name and password are required'});
  }

  const newUser=new User(user);
  try {
    await newUser.save();
    res.status(201).json({success:true, data: newUser});
  }
  catch (error) {
    console.error("Error creating user:",error.message);
    res.status(500).json({message: 'Server error'});
  }
});

export default router;