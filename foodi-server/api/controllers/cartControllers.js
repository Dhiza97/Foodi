const Carts = require("../models/Carts");

// Get carts using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, price, image, quantity, email } = req.body;
  try {
    // Existing cart item for the specific user
    const existingCartItem = await Carts.findOne({ menuItemId, email });
    if (existingCartItem) {
      // Increment quantity if item already exists
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      return res.status(200).json({ insertedId: existingCartItem._id, message: "Quantity updated." });
    }

    // Create new cart item
    const cartItem = await Carts.create({
      menuItemId,
      name,
      recipe,
      price,
      image,
      quantity,
      email,
    });

    res.status(201).json({ insertedId: cartItem._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a cart item
const deleteCart = async(req, res) => {
    const cartId = req.params.id
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId)
        if (!deletedCart){
            return res.status(404).json({ message: "Cart item not found!" });
        }
        res.status(200).json({message: "Cart item deleted successfully!"})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a cart item
const updateCart = async(req, res) => {
    const cartId = req.params.id
    const { menuItemId, name, recipe, price, image, quantity, email } = req.body;

    try {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId,
            { menuItemId, name, recipe, price, image, quantity, email },
            { new: true, runValidators: true } 
        )
        if (!updatedCart){
            return res.status(404).json({ message: "Cart item not found!" });
        }
        res.status(200).json(updatedCart)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get single recipe
const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId)
    res.status(200).json(cartItem)

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart
};
