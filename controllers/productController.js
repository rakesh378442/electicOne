const db = require("../db");
const fs = require("fs");
const path = require("path");

// GET PRODUCTS
const productGet = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM electricproducts");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "database fetching error " + error });
  }
};

// ADD PRODUCT
const productAdd = async (req, res) => {
  try {
    const { name, price, customer_care_number, description, brand } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image_url = req.file.filename;

    await db.query(
      "INSERT INTO electricproducts (name, price, customer_care_number, description, brand, image_url) VALUES (?,?,?,?,?,?)",
      [name, price, customer_care_number, description, brand, image_url]
    );

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "database insertion error " + error });
  }
};

const productUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, customer_care_number, description, brand } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // 🔹 Get old image
    const [rows] = await db.query(
      "SELECT image_url FROM electricproducts WHERE id=?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    let image_url = rows[0].image_url;

    // 🔹 If new image uploaded
    if (req.file) {
      // delete old image
      if (image_url) {
        const oldPath = path.join(__dirname, "../uploads", image_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      image_url = req.file.filename;
    }

    await db.query(
      `UPDATE electricproducts 
       SET name=?, price=?, customer_care_number=?, description=?, brand=?, image_url=? 
       WHERE id=?`,
      [
        name,
        price,
        customer_care_number,
        description,
        brand,
        image_url,
        id,
      ]
    );

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Update error " + error });
  }
};


const productDelete = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        
        const [rows] = await db.query(
            "SELECT image_url FROM electricproducts WHERE id=?", [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const image_url = rows[0].image_url;

        
        if (image_url) {
            const oldPath = path.join(__dirname, "../uploads", image_url);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        await db.query("DELETE FROM electricproducts WHERE id=?", [id]);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete error " + error });
    }
};

module.exports = { productGet, productAdd, productUpdate, productDelete };