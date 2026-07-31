import bcrypt from "bcrypt";
import { User } from "../../models/user.model";
import { Account } from "../../models/account.model";

interface registerUserDTO {
    email: string;
    name: string;
    password:    string;
}

const registerUser = async (data: registerUserDTO) => {
    try {
        const {email, name, password} = data;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            email,
            name,
        });
        await user.save();

        const account = new Account({
            userId: user._id,
            provider: "local",
            passwordHash,
        });
        await account.save();

        return user;
    } catch (error) {
        throw error;
    }
}

export { registerUser };