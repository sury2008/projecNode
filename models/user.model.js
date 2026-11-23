import { model, Schema } from "mongoose";


const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
     role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

userSchema.pre(['save', /update/], async function () {
     if (!this.isModified('password')) return;
    const saltRounds = +process.env.SALT_ROUNDS ?? 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcryptjs.hash(this.password, salt);
    this.password = hash;   
});

userSchema.methods.comparePassword = async function (password) {
    console.log(this);
 return await bcrypt.compare(password, this.password);
};
const User = model("users", userSchema);

export default User;