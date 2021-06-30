const router = require("express").Router();
const { Event } = require("../../models");

let eventData;

// get a random event
router.get("/random", async (req, res) => {
  try {
    eventData = await Event.findAll({}).then((eventData) => {
      res.json(eventData[Math.floor(Math.random() * eventData.length)]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router
  .route("/")
  // get all events
  .get(async (req, res) => {
    try {
      eventData = await Event.findAll({
        attributes: ["id", "description", "text", "imageUrl"],
        order: [["id", "DESC"]],
      }).then((eventData) => res.json(eventData.reverse()));
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
  // create new event
  .post(async (req, res) => {
    try {
      eventData = await Event.create({
        id: req.body.id,
        description: req.body.name,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
      }).then((eventData) => res.json(eventData));
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
router.route("/:id").get(async (req, res) => {
  try {
    eventData = await Event.findByPK({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "description", "text", "imageUrl"],
    }).then((eventData) => {
      if (!eventData) {
        res.status(404).json({ message: "Event not found" });
        return;
      }
      res.json(eventData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
