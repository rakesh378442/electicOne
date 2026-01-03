const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRouts");
const productRoutes = require("./routes/productRouter");
const cartRoutes = require("./routes/cartRouter");
const favouriteRouters = require("./routes/favouriteRouter");
const plaseOrderAddressRouter = require("./routes/placeOrderAddressRouter")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/favourite", favouriteRouters);
app.use("/place",plaseOrderAddressRouter)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
