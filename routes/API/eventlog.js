const router = require("express").Router();
const { EventLog } = require("../../models");
const { route } = require("./character");

let logData;

// gets all seen events associated to specified game_id
router.get("/:id", async (req, res) => {
  try {
    const eventLog = await EventLog.findAll({
      where: {
        game_id: req.params.id,
      },
    });

    if (!eventLog) {
      res.status(404).json({ message: "No event data found for this game." });
      return;
    }

    const events = eventLog.map((event) => event.get({ plain: true }));
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new eventlog with event_id and game_id
router.post("/", async (req, res) => {
  try {
    eventLog = await EventLog.create({
      event_id: req.body.event_id,
      game_id: req.body.game_id,
    })
      .then((eventLog) => res.json(eventLog))
      .catch((err) => res.status(500).json(err));
  } catch (err) {
    res.status(500).json(err);
  }
});

// deletes all saved events for specified game_id
router.delete("/:id", async (req, res) => {
  try {
    eventData = await EventLog.destroy({
      where: {
        game_id: req.params.id,
      },
    }).then((eventData) => {
      if (!eventData) {
        res
          .status(404)
          .json({ message: "No events found for this character." });
        return;
      }
      res.json(eventData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
