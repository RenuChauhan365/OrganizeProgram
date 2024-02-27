import SignupModel from '../models/signUpModel.js';

 export const registerController = async (req, res) => {
  const { firstname, lastname, email, phonenumber, type, password } = req.body;

  try {
    const existingUser = await SignupModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: ' email already exists' });
    }

    const newUser = new SignupModel.create({
      firstname :firstname,
      lastname :lastname,
      email :email,
      phonenumber :phonenumber,
      type :type,
      password: password 
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successfull' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginController = async (req, res)  =>{
const {email, password} = req.body

if (!email || !password) {
 res.send({message: 'all fields  are required '})
  }

  const  user  = await SignupModel.findOne({email})
  if (!user) {
res.send({message: 'Invalid crendantials'})  }
const isMatch = await user.comparedPassword(password);
  if (!isMatch) {
    next('Invalid username or password')
  }

  user.password = undefined;

  const token  = user.createJWT()
  res.status(200).json({
    success: true, 
    message : 'Login successful',
    user : user,
    token : token
  })
  
}