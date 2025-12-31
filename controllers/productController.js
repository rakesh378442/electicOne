const db = require("../db");
const fs = require("fs");
const path = require("path");

const productGet = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM electricproducts");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "database fetching error " + error });
  }
};


const productAdd = async (req, res) => {
  try {
    const { name, price,customer_care_number, description,brand } = req.body;

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

   
    const [rows] = await db.query(
      "SELECT image_url FROM electricproducts WHERE id=?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    let image_url = rows[0].image_url;

  
    if (req.file) {
      
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
const productPatch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // 1️⃣ Existing product fetch
    const [rows] = await db.query(
      "SELECT * FROM electricproducts WHERE id=?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    let product = rows[0];

    // 2️⃣ Merge incoming values only (fallback: existing)
    const {
      name = product.name,
      price = product.price,
      customer_care_number = product.customer_care_number,
      description = product.description,
      brand = product.brand,
    } = req.body;

    let image_url = product.image_url;

    // 3️⃣ Image update (optional)
    if (req.file) {
      const oldPath = path.join(__dirname, "../uploads", image_url);

      if (image_url && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      image_url = req.file.filename;
    }

    // 4️⃣ Update only merged data
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

    res.status(200).json({ message: "Product patched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Patch error " + error });
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




module.exports = { productGet, productAdd, productUpdate,productPatch,productDelete };