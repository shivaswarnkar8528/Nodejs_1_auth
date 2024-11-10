const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require('../models/user');

const auth={
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = new User({ name, email, password });
            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(password, salt);
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.emailgit branch -M main
                    git remote add origin https://github.com/shivaswarnkar8528/Nodejs_1_auth.git
                    git push -u origin main
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false });
        }
    },
    login:async(req,res)=>{
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                message: 'Login successful'
            });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
}
module.exports=auth;


