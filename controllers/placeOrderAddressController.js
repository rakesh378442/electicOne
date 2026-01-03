const db = require("../db");

const plaseOrderAddressGet = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM plaseorderaddress");
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
      `INSERT INTO plaseorderaddress
      (name, phone_number, alternate_phone_number, house_number, landmark, city_name, state_name, postal_code, address_type)
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
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

const placeOrderAddressUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const {
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
      `UPDATE plaseorderaddress
       SET name=?,
           phone_number=?,
           alternate_phone_number=?,
           house_number=?,
           landmark=?,
           city_name=?,
           state_name=?,
           postal_code=?,
           address_type=?
       WHERE id=?`,
      [
        name,
        phone_number,
        alternate_phone_number,
        house_number,
        landmark,
        city_name,
        state_name,
        postal_code,
        address_type,
        id,
      ]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "database connection error " + error });
  }
};

module.exports = {
  plaseOrderAddressGet,
  placeOrderAddressAdd,
  placeOrderAddressUpdate,
};
