const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SendOtpEmail = require('../utils/SendOtpEmail');
exports.CreateUser = async (req, res) => {
    try {
        const { name, email, password,confirmPassword } = req.body;
        // Validate input
        if(!name){
            return res.status(400).send({msg:'Name is required'});
        }else if(!email){
            return res.status(400).send({msg:'Email is required'});
        }else if(!password ){
            return res.status(400).send({msg:'Password is required '});
        }else if(!confirmPassword){
            return res.status(400).send({msg:'Confirm Password is required '});
        }

        // Check if email is valid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).send({msg:'Invalid email'});
        }

        // Check if password is strong enough
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
        return res.status(400).send({
            msg: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character i.e @#$!%*?& and one number'
        });
        }

        if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords do not match" });
        

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send({msg:'Email already exists'});
        }

        // Add bcrypt to Password
        const hashPassword = await bcrypt.hash(password,10)

        // Create new user
        const newUser = await User.create({name,email,password:hashPassword});

        // Generate JWT token
        const token = jwt.sign(
            {   userId: newUser._id,
                name: newUser.name,
                email: newUser.email },
            "qwertyuio0987654321!@#$%^&",
            { expiresIn: '1h' }
        );

        // Send response with token
        return res.status(201).send({
            status:201,
            msg: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.password
            },
            Token: token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

exports.LoginUser = async (req, res) =>{
    try {
        const { email, password } = req.body;

        if(!email) return res.status(400).send({msg:'Email is required'});
        if(!password ) return res.status(400).send({msg:'Password is required '});

        const user = await User.findOne({ email });

        if (!user) return res.status(404).send({ msg: 'User not found' });

        const find_password = await bcrypt.compare(password, user.password);
        if (!find_password) return res.status(402).json({ warning: "password is Incorrect" });

        const token = jwt.sign(
            { userId: user._id, email: user.email , name: user.name },
            "axzsndhsj12343563-+}{\@#$%&*'/?",
             { expiresIn: '1d' }
            );

        return res.status(200).json({
            status:200,
            msg: 'Login successful',
            users:user ,
            Token:token
        });

    }catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
}

exports.UpdateUser = async (req, res) => {
    try {
         const id = req.params.id;

         const UpdateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
         if (!UpdateUser) {
             return res.status(404).send({ msg: 'User not found' });
         }

        return res.status(200).json({ status:200,msg: 'User Updated', NewUser: UpdateUser });

    }catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

exports.DeleteUser = async (req, res) => {
  try{
    const id = req.params.id;
    const DeletUser = await User.findByIdAndDelete(id);
    if (!DeletUser) {
        return res.status(404).send({ msg: 'User not found' });
    }
    return res.status(200).json({ status:200,msg: 'User Deleted', DeletedUser: DeletUser });
  }catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

exports.GetUserAll = async (req, res) =>{

    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).send({ msg: 'No users found' });
        }
        return res.status(200).json({status:200, msg: 'Users fetched successfully', users: users });

    }catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }

}

exports.GetSpecificUser = async (req,res) =>{
    try {
        const Find_users = req.params.email;
        const FindUser = await User.findOne({email:Find_users});

        if(!FindUser) return res.status(404).json({msg: "User not found"});

        return res.status(200).json({status:200,msg: "User Successfully Found", NewUser: FindUser});
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });  
    }
}

exports.SendOtpEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).send({ msg: 'Email is required' });
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ msg: 'User not found' });
        
        const otp = Math.floor(1000 + Math.random() * 9000).toString() + // 4 digits
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) + // Random uppercase letter
        String.fromCharCode(65 + Math.floor(Math.random() * 26));  // Another random uppercase letter
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;    
        await user.save();
        await SendOtpEmail(email, otp);
        console.log("Otp sent successfully",otp);
        return res.status(200).send({ msg: 'Otp sent successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending otp', error: error.message });
    }
}

exports.ResetPassword = async (req, res) => {
    try {
        const { email, otp, password ,confirmPassword} = req.body;
        if (!email || !otp || !password || !confirmPassword) return res.status(400).send({ msg: 'Email, otp , password and confirmPassword are required' });
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send({ msg: 'User not found' });
        if (user.otp !== otp) return res.status(400).send({ msg: 'Invalid otp' });
        if (Date.now() > user.otpExpires) return res.status(400).send({ msg: 'Otp expired' });
        if (password !== confirmPassword) return res.status(400).send({ msg: 'Passwords do not match' });
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        return res.status(200).send({ msg: 'Password reset successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
}