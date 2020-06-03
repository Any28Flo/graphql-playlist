const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            maxLength: 50,
            minLength: 6,

        },
        age : {
            type: Number,
            required: true
        }
    },
    {
        timestamps: { createdAt : "created_at" , updatedAt : "updated_at"}
    }
)
module.exports = mongoose.model('Author', authorSchema);