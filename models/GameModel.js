import mongoose from "mongoose";

const GameSchema = mongoose.Schema(
    {
        userIds: {
            type: Array,
            default: [],
            required: true
        },
        isGameOn: {
            type: Boolean,
            default: true
        },
        positions: {
            type: [{
                id: String,
                places: {
                    type: Array,
                    default: []
                }
            }],
            default: []
        },
        currentTurn: String,
        winnerId: {
            type: String,
            default: null
        },
        lastUpdate: {
            type: Date,
        }
    }
);

const GameModel = mongoose.model("Games", GameSchema);
export default GameModel