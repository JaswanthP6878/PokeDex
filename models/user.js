import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const userModel = mongoose.model('User', userSchema);
export default userModel;

