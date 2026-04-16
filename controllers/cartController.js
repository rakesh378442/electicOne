const db = require("../db");

const cartGet = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cart");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: "Database fetch error" });
  }
};


const cartAdd = async (req, res) => {
  try {
    const { product_id, user_id, quantity, name, image_url, price } = req.body;

    if (!product_id || !user_id || !quantity || !name || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.query(
      `INSERT INTO cart (product_id, user_id, quantity, name, image_url, price)
       VALUES (?,?,?,?,?,?)`,
      [product_id, user_id, quantity, name, image_url, price]
    );

    res.status(201).json({ message: "Cart added successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Database insert error",
      error: err.message,
    });
  }
};
const cartUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, user_id, quantity, name, image_url, price } = req.body;

    const [rows] = await db.query("SELECT * FROM cart WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Cart item not found" });

    await db.query(
      `UPDATE cart 
       SET product_id=?, user_id=?, quantity=?, name=?, image_url=?, price=? 
       WHERE id=?`,
      [product_id, user_id, quantity, name, image_url, price, id]
    );

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Database update error",
      error: err.message,
    });
  }
};


const cartDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM cart WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Cart item not found" });

    await db.query("DELETE FROM cart WHERE id = ?", [id]);

    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Database delete error",
      error: err.message,
    });
  }
};

module.exports = { cartGet, cartAdd, cartUpdate, cartDelete };

