const mongoose = require('mongoose')
const {Schema} = mongoose

// Create schema object for menu items
const menuSchema = new Schema ({
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    name: {type: String, trim: true, required: true, minlength: 3},
    recipe: String,
    image: String,
    category: String,
    price: Number
})

// Create a model using the schema
const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu