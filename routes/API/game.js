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
      status: "Active",
    });
    res.status(200).json(newGame);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update game record // req should have event_count & id (game)
router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.status) {
      const updatedGame = await Game.update(
        {
          event_count: req.body.event_count,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedGame) {
        res.status(404).json({ message: "No matching game found." });
        return;
      }
      res.status(200).json(updatedGame);
    } else {
      const updatedGame = await Game.update(
        {
          event_count: req.body.event_count,
          status: req.body.status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (!updatedGame) {
        res.status(404).json({ message: "No matchin game found." });
        return;
      }
      res.status(200).json(updatedGame);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a users active games
router.get("/active/:user_id", async (req, res) => {
  try {
    const gameData = await Game.findAll({
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

router.delete("/:id", async (req, res) => {
  try {
    const gameData = await Game.destroy({
      where: {
        id: req.params.id,
        character_id: req.body.character_id,
      },
    });
    if (!gameData) {
      res.status(404).json({ message: "No matching game data found!" });
      return;
    }
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
