import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        activeGames: {
            type: Array,
            default: []
        },
        completedGames : {
            type: Array,
            default: []
        }
    }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel 