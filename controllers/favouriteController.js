const db = require("../db");

const favouriteAdd = async (req, res) => {
  try {
    const { user_id, product_id,name,price,image_url } = req.body;

    if (!user_id || !product_id || !price || !image_url || name) {
      return res
        .status(400)
        .json({ message: "all required hai" });
    }

    await db.query(
      "INSERT INTO favorites (user_id, product_id,name,price,image_url) VALUES (?,?,?,?,?)",
      [user_id, product_id,name,price,image_url]
    );

    res.status(201).json({ message: "favorite add ho gaya" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "database error: " + error.message });
  }
};


const favouriteDelete= async (req,res)=>{
    try{
        
            const { id } = req.params;
            if(!id){
                   return res.status(400).json({ message: "id required hai" });
            }

            const [result] =await db.query("DELETE FROM favorites WHERE id=?",[id]);
            

            if(result.affectedRows===0){
                return res.status(404).json({ message: "favorite nahi mila" });

            }
              res.status(200).json({ message: "favorite delete ho gaya" });

    }
    catch(error){
        res.status(500).json({message:"dataBase fatching error"+error});
    }
        }

     const favouriteGet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id required hai" });
    }

    const [results] = await db.query(
      "SELECT * FROM favorites WHERE id = ?",
      [id]
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "database fetching error: " + error,
    });
  }
};

      const favouriteGests = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM favorites");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "database fetching error: " + error,
    });
  }
};

module.exports = { favouriteAdd,favouriteDelete,favouriteGet,favouriteGests};
