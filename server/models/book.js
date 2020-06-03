const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            maxLength: 50
        },
        genre:{
            type: String,
            required: true,
            maxLength: 40
        },
        authorId:{
            type: String
        }
    },
    {
        timestamps: { createdAt : "created_at" , updatedAt : "updated_at"}
    }
)
module.exports = mongoose.model('Book', bookSchema);