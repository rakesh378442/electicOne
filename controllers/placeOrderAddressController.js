const db = require("../db");

const plaseOrderAddressGet = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM plaseOrderAddress WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "database connection error " + error });
  }
};

const placeOrderAddressAdd = async (req, res) => {
  try {
    const {
      user_id,
      name,
      phone_number,
      alternate_phone_number,
      house_number,
      landmark,
      city_name,
      state_name,
      postal_code,
      address_type,
    } = req.body;

    const [rows] = await db.query(
      `INSERT INTO plaseOrderAddress
       (user_id,name,phone_number,alternate_phone_number,house_number,landmark,city_name,state_name,postal_code,address_type)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        user_id,
        name,
        phone_number,
        alternate_phone_number,
        house_number,
        landmark,
        city_name,
        state_name,
        postal_code,
        address_type,
      ]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "database connection error " + error });
  }
};

const placeOrderAddressPatch = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      user_id,
      name,
      phone_number,
      alternate_phone_number,
      house_number,
      landmark,
      city_name,
      state_name,
      postal_code,
      address_type,
    } = req.body;

    const [rows] = await db.query(
      `
      UPDATE plaseOrderAddress
      SET
        user_id = IFNULL(?, user_id),
        name = IFNULL(?, name),
        phone_number = IFNULL(?, phone_number),
        alternate_phone_number = IFNULL(?, alternate_phone_number),
        house_number = IFNULL(?, house_number),
        landmark = IFNULL(?, landmark),
        city_name = IFNULL(?, city_name),
        state_name = IFNULL(?, state_name),
        postal_code = IFNULL(?, postal_code),
        address_type = IFNULL(?, address_type)
      WHERE id = ?
      `,
      [
        user_id ?? null,
        name ?? null,
        phone_number ?? null,
        alternate_phone_number ?? null,
        house_number ?? null,
        landmark ?? null,
        city_name ?? null,
        state_name ?? null,
        postal_code ?? null,
        address_type ?? null,
        id,
      ]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res.status(200).json({
      message: "Address patched successfully",
      rows,
    });
  } catch (error) {
    // foreign-key error handle
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ message: "Invalid user_id (foreign key failed)" });
    }

    return res
      .status(500)
      .json({ message: "database connection error " + error });
  }
};

module.exports = {
  plaseOrderAddressGet,
  placeOrderAddressAdd,
  placeOrderAddressPatch,
};
