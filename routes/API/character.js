const router = require("express").Router();
const { Character, Game, EventLog, Event } = require("../../models");
// const withAuth = require("../../utils/auth");

let characterData;

// get all characters of matching user_id
router.get("/:id", async (req, res) => {
  console.log("get by user_id");
  try {
    characterData = await Character.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [
        {
          model: Game,
          include: {
            model: Event,
          },
        },
      ],
    });

    if (!characterData) {
      res.status(404).json({ message: "No characters found for this user." });
      return;
    }

    const characters = characterData.map((character) =>
      character.get({ plain: true })
    );
    res.json(characters);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create character
router.post("/", async (req, res) => {
  const userID = req.query.user_id;
  console.log(userID);

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

// update the character's stats (health, stamina/mana)
router.put("/", async (req, res) => {
  const { id, health, stamina, mana } = req.body.characterData;
  try {
    updatedCharacter = await Character.update(
      {
        health: health,
        stamina: stamina,
        mana: mana,
      },
      {
        where: {
          id: id,
          user_id: req.body.user_id,
        },
      }
    )
      .then((updatedCharacter) => res.json(updatedCharacter))
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    res.json(err);
  }
});

// get character by id
router
  .route("/")
  .get(async (req, res) => {
    console.log(req.query);
    try {
      characterData = await Character.findOne({
        where: {
          id: req.query.id,
          user_id: req.query.user_id,
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
  })
  .delete(async (req, res) => {
    try {
      characterData = await Character.destroy({
        where: {
          id: req.params.id,
          user_id: req.query.user_id,
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
