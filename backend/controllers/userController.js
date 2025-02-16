const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { name, email,phone, password, role } = req.body;
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword,phone, role });
    
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            return res.status(401).json({message:"invalid password"})
        }
     
        const token=jwt.sign(
            {id:user._id,role:user._role},
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"

            }
        )
        res.status(200).json({token,user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }})
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }

    exports.post("/signin", async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          res.json({ token: generateToken(user) });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

}
module.exports={loginUser,registerUser};
