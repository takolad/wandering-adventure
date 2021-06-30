const router = require("express").Router();
const { User, Character } = require("../../models");

let userData;

// create new user
router.route("/signup").post(async (req, res) => {
  if (req.body.password !== req.body.passwordConfirm) {
    res
      .status(400)
      .json({ message: "Passwords do not match. Please try again!" });
    return;
  }

  try {
    userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    }).then((userData) => {
      // req.session.save(() => {
      //   req.session.user_id = userData.id;
      //   req.session.username = userData.username;
      //   req.session.loggedIn = true;

      res.json(userData);
      // });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get user and characters
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      userData = await User.findByPK({
        attributes: { exclude: ["password"] },
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Character,
          },
        ],
      }).then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  // update user info
  .put(async (req, res) => {
    try {
      userData = await User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id,
        },
      }).then((userData) => {
        if (!userData[0]) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  // DESTROY user
  .delete(async (req, res) => {
    try {
      userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      }).then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// login
router.route("/login").post(async (req, res) => {
  try {
    userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrent username or password. Please try again!" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrent username or password. Please try again!" });
      return;
    }

    // save loggedIn into state

    res.status(200).json({
      user: userData,
      message: "You are _unofficially_ logged in! (not actually)",
    });
  } catch (err) {
    console.log("crap: ", err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
