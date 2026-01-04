const db = require("../db");

const plaseOrderAddressGet = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM plaseOrderAddress");
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
      (user_id,name, phone_number, alternate_phone_number, house_number, landmark, city_name, state_name, postal_code, address_type)
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
//   try {
//     const { id } = req.params;

//     const {
//       user_id,
//       name,
//       phone_number,
//       alternate_phone_number,
//       house_number,
//       landmark,
//       city_name,
//       state_name,
//       postal_code,
//       address_type,
//     } = req.body;

//     const [rows] = await db.query(
//       `UPDATE plaseOrderAddress
//        SET 
//           user_id=?,
//           name=?,
//            phone_number=?,
//            alternate_phone_number=?,
//            house_number=?,
//            landmark=?,
//            city_name=?,
//            state_name=?,
//            postal_code=?,
//            address_type=?
//        WHERE id=?`,
//       [
//         user_id,
//         name,
//         phone_number,
//         alternate_phone_number,
//         house_number,
//         landmark,
//         city_name,
//         state_name,
//         postal_code,
//         address_type,
//         id,
//       ]
//     );

//     return res.status(200).json(rows);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "database connection error " + error });
//   }
// };


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

    return res.status(200).json({
      message: "Address patched successfully",
      rows,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "database connection error " + error });
  }
};


module.exports = {
  plaseOrderAddressGet,
  placeOrderAddressAdd,
  placeOrderAddressPatch
};
