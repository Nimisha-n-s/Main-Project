const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

const Users = mongoose.model("Users", {
  username: String,
  mobile: String,
  email: String,
  password: String,
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

const Admin = mongoose.model("Admin", {
  username: String,
  mobile: String,
  email: String,
  password: String,
});

module.exports = Admin;
module.exports = Users;
module.exports.likeProducts = (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;

  Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
    .then(() => {
      res.send({ message: "liked success." });
    })
    .catch(() => {
      res.send({ message: "server err7" });
    });
};

module.exports.signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const user = new Users({
    username: username,
    password: password,
    email,
    mobile,
  });
  user
    .save()
    .then(() => {
      res.send({ message: "saved success." });
    })
    .catch(() => {
      res.send({ message: "server err8" });
    });
};

module.exports.myProfileById = (req, res) => {
  let uid = req.params.userId;

  Users.findOne({ _id: uid })
    .then((result) => {
      res.send({
        message: "success.",
        user: {
          email: result.email,
          mobile: result.mobile,
          username: result.username,
        },
      });
    })
    .catch(() => {
      res.send({ message: "server err9" });
    });

  return;
};


module.exports.getUserById_ = async function(id) {
  try {
    const user = await Users.findOne({ _id: id });
    return user || false;
  } catch (err) {
    return false;
  }
};

module.exports.getUserById = (req, res) => {
  const _userId = req.params.uId;
  Users.findOne({ _id: _userId })
    .then((result) => {
      res.send({
        message: "success.",
        user: {
          email: result.email,
          mobile: result.mobile,
          username: result.username,
        },
      });
    })
    .catch(() => {
      res.send({ message: "server err10" });
    });
};

module.exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

Users.findOne({ username: username })
    .then((result) => {
        if (!result) {
            Admin.findOne({ username: username })
                .then((adminResult) => {
                    if (!adminResult) {
                        res.send({ message: "user or admin not found." });
                    } else {
                        if (adminResult.password == password) {
                            const token = jwt.sign(
                                {
                                    data: adminResult,
                                },
                                "MYKEY",
                                { expiresIn: "1h" },
                            );
                            res.send({
                                message: "find success.",
                                token: token,
                                userId: adminResult._id,
                                userType: "admin",
                            });
                        } else {
                            res.send({ message: "password wrong." });
                        }
                    }
                })
                .catch(() => {
                    res.send({ message: "server err11" });
                });
        } else {
            if (result.password == password) {
                const token = jwt.sign(
                    {
                        data: result,
                    },
                    "MYKEY",
                    { expiresIn: "1h" },
                );
                res.send({
                    message: "find success.",
                    token: token,
                    success:true,
                    userId: result._id,
                    userType: "user",
                });
            } else {
                res.send({ message: "password wrong." });
            }
        }
    })
    .catch((err) => {
        console.log(err)
        res.send({ message: "server err11" });
    });
};

module.exports.likedProducts = (req, res) => {
  Users.findOne({ _id: req.body.userId })
    .populate("likedProducts")
    .then((result) => {
      res.send({ message: "success", products: result.likedProducts });
    })
    .catch((err) => {
      res.send({ message: "server err12" });
    });
};

module.exports.createAdmin = (req, res) => {
  // create admin code
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
  });
  admin
    .save()
    .then(() => {
      res.send({ message: "saved success." });
    })
    .catch(() => {
      res.send({ message: "server err13" });
    });
};

module.exports.adminLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Admin.findOne({ username: username })
    .then((result) => {
      if (!result) {
        res.send({ message: "Admin not found." });
      } else {
        if (result.password == password) {
          const token = jwt.sign(
            {
              data: result,
            },
            "MYKEY",
            { expiresIn: "1h" },
          );
          res.send({
            message: "find success.",
            token: token,
            userId: result._id,
          });
        }
        if (result.password != password) {
          res.send({ message: "password wrong." });
        }
      }
    })
    .catch(() => {
      res.send({ message: "server err14" });
    });
};


module.exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  // Find the user by ID and delete it
  User.findByIdAndDelete(userId)
    .then((result) => {
      if (!result) {
        res.status(404).send({ message: "User not found." });
      } else {
        res.send({ message: "User deleted successfully." });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Server error." });
    });
};