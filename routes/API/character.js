const router = require("express").Router();
const { Character, Game, EventLog, Event } = require("../../models");
// const withAuth = require("../../utils/auth");

let characterData;

// get all characters of matching user_id
router.get("/:id", async (req, res) => {
  console.log("get by user_id");
  try {
    const characterData = await Character.findAll({
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
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create character
router.post("/", async (req, res) => {
  const { name, bio } = req.body.characterData;
  const charClass = req.body.characterData.class;
  const userID = req.body.user_id;

  if (charClass === "warrior") {
    try {
      const characterData = await Character.create({
        name: name,
        bio: bio,
        class: charClass,
        stamina: 100,
        user_id: userID,
      });
      res.status(200).json(characterData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (charClass === "mage") {
    try {
      const characterData = await Character.create({
        name: name,
        bio: bio,
        class: charClass,
        mana: 100,
        user_id: userID,
      });
      res.status(200).json(characterData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// update the character's stats (health, stamina/mana)
router.put("/", async (req, res) => {
  const { id, health, stamina, mana } = req.body.characterData;
  try {
    const updatedCharacter = await Character.update(
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
    );
    if (!updatedCharacter) {
      res.status(404).json({ message: "No matching character data found!" });
      return;
    }
    res.status(200).json(updatedCharacter);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get character by id
router.route("/").get(async (req, res) => {
  console.log(req)
  try {
    const characterData = await Character.findOne({
      where: {
        id: req.query.id,
        user_id: req.query.user_id,
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
      res.status(404).json({ message: "No character found with this id" });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req);
  try {
    const characterData = await Character.destroy({
      where: {
        id: req.params.id,
        user_id: req.query.user_id,
      },
    });

    if (!characterData) {
      res.status(404).json({ message: "No character found with this id" });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
