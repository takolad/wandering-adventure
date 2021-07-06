const router = require("express").Router();
const { Game, Character } = require("../../models");
const sequelize = require("../../config/connection");
const { Op } = require("sequelize");

let gameData;

// create new game record // req should have the character_id
router.post("/", async (req, res) => {
  try {
    newGame = await Game.create({
      character_id: req.body.character_id,
      status: "Active",
    })
      .then((newGame) => res.status(200).json(newGame))
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    res.status(500).json(err);
  }
});

// update game record // req should have event_count & character_id
router.put("/:id", async (req, res) => {
  try {
    updatedGame = await Game.update(
      {
        event_count: req.body.event_count,
        character_id: req.body.character_id,
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedGame) => res.status(200).json(updatedGame))
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a users active games
router.get("/active/:user_id", async (req, res) => {
  try {
    gameData = await Game.findAll({
      where: {
        status: "Active",
      },
      include: [
        {
          model: Character,
          where: {
            user_id: req.params.user_id,
          },
        },
      ],
    });

    if (gameData.length < 1 || !gameData) {
      res.status(404).json({ message: "No active games found for this user." });
      return;
    }

    const games = gameData.map((game) => game.get({ plain: true }));
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
