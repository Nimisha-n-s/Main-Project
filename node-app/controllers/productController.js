const mongoose = require("mongoose");
const { Users, getUserById_ } = require("./userController");
let schema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  details: String,
  category: String,
  pimage: String,
  pimage2: String,
  addedBy: mongoose.Schema.Types.ObjectId,
  pLoc: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
});

schema.index({ pLoc: "2dsphere" });

const Products = mongoose.model("Products", schema);

module.exports.search = (req, res) => {
  console.log(req.query);

  let latitude = req.query.loc.split(",")[0];
  let longitude = req.query.loc.split(",")[1];

  let search = req.query.search;
  Products.find({
    $or: [
      { pname: { $regex: search } },
      { pdesc: { $regex: search } },
      { details: { $regex: search } },
    ],
    pLoc: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(latitude), parseFloat(longitude)],
        },
        $maxDistance: 500 * 1000,
      },
    },
  })
    .then((results) => {
      res.send({ message: "success", products: results });
    })
    .catch((err) => {
      res.send({ message: "server err5" });
    });
};

module.exports.addProduct = (req, res) => {
  console.log(req.files);
  console.log(req.body);

  const plat = req.body.plat;
  const plong = req.body.plong;
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const details = req.body.details;
  const category = req.body.category;
  const pimage = req.files.pimage[0].path;
  const pimage2 = req.files.pimage2[0].path;
  const addedBy = req.body.userId;

  const product = new Products({
    pname,
    pdesc,
    details,
    category,
    pimage,
    pimage2,
    addedBy,
    pLoc: {
      type: "Point",
      coordinates: [plat, plong],
    },
  });
  product
    .save()
    .then(() => {
      res.send({ message: "saved success." });
    })
    .catch(() => {
      res.send({ message: "server err4" });
    });
};

module.exports.getProducts = async (req, res) => {
  try {
    const catName = req.query.catName;
    let filter = {};

    // Check if catName query parameter is provided
    if (catName) {
      filter = { category: catName };
    }

    const dat = await getUserById_(req.query.userID)
    
    const likedProductIds = await  dat.likedProducts.map(likedProduct => likedProduct.toString());
    const products = await Products.find(filter);

    // Check if the user likes any of the products
    const updatedProducts = products.map(product => {
      // Check if user likes the product
      const liked = likedProductIds.includes(product._id.toString());
      return { ...product.toObject(), like: liked ? true : false };
    });

    // Send the response with updated products
    res.send({ message: "success", products: updatedProducts });
  } catch (err) {
    res.send({ message: "server err3" });
  }
};




/**Users.findOne({ _id: req.body.userId })
    .populate("likedProducts")
    .then((result) => {
      res.send({ message: "success", products: result.likedProducts });
    })
    .catch((err) => {
      res.send({ message: "server err12" });
    }); */

module.exports.getProductsById = (req, res) => {
  console.log(req.params);

  Products.findOne({ _id: req.params.pId })
    .then((result) => {
      res.send({ message: "success", product: result });
    })
    .catch((err) => {
      res.send({ message: "server err2" });
    });
};

module.exports.myProducts = (req, res) => {
  const userId = req.body.userId;

  Products.find({ addedBy: userId })
    .then((result) => {
      res.send({ message: "success", products: result });
    })
    .catch((err) => {
      res.send({ message: "server err1" });
    });
};
 