const router = require("express").Router();
const { Character, User } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

let characterData;

// get characters
router
  .route("/character")
  .get(async (req, res) => {
    try {
      characterData = await Character.findAll({
        order: [["name", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      }).then((characterData) => res.json(characterData));
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  .post(withAuth, async (req, res) => {
    // get from Auth0
    const userID = "";

    if (req.body.class === "Warrior") {
      try {
        characterData = await Character.create({
          name: req.body.name,
          bio: req.body.bio,
          class: req.body.class,
          stamina: 100,
          user_id: userID,
        })
          .then((characterData) => res.json(characterData))
          .catch((err) => {
            res.status(500).json(err);
          });
      } catch (err) {
        res.status(500).json(err);
      }
    }

    if (req.body.class === "Mage") {
      try {
        characterData = await Character.create({
          name: req.body.name,
          bio: req.body.bio,
          class: req.body.class,
          mana: 100,
          user_id: userID,
        })
          .then((characterData) => res.json(characterData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });

// get character by id
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      characterData = await Character.findByPK({
        where: {
          id: req.params.id,
        },
        attributes: [
          "id",
          "name",
          "bio",
          "class",
          "health",
          "stamina",
          "mana",
          "user_id",
        ],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      }).then((characterData) => {
        if (!characterData) {
          res.status(404).json({ message: "Character not found with this id" });
          return;
        }
        res.json(characterData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  .delete(withAuth, async (req, res) => {
    try {
      characterData = await Character.destroy({
        where: {
          id: req.params.id,
        },
      }).then((characterData) => {
        if (!characterData) {
          res.status(404).json({ message: "No character found with this id" });
          return;
        }
        res.json(characterData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
