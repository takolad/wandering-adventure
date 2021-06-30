const router = require("express").Router();
const { Game, Character } = require("../../models");
const sequelize = require("../../config/connection");
const { Op } = require("sequelize");

let gameData;

// create new game record // req should have the character_id
router.post("/", async (req, res) => {
  try {
    const newGame = await Game.create({
      character_id: req.body.character_id,
    });

    res.status(200).json(newGame);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update game record // req should have event_count & character_id
router.put("/:id", async (req, res) => {
  try {
    const updatedGame = await Game.update(
      {
        event_count: req.body.event_count,
        character_id: req.body.character_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all active games
// req should have user_id
router.get("/active/:user_id", async (req, res) => {
  try {
    const gameData = await Game.findAll({
      where: {
        // event_count: { [Op.lt]: 5 } // if game condition is # of events
        status: "Active",
      },
      include: [
        {
          model: Character,
          where: {
            character_id: Character.id,
            user_id: user_id, // does this work?
          },
        },
      ],
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
