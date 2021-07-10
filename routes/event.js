const router = require('express').Router();
const { Event, DataTypes } = require('../models');
const sequelize = require('../config/connection');

let eventData

router
.route('/')
    .get( async (req, res) => {
        try{eventData = await Event.findAll({
            attributes: [
                'id',
                'description',
                'text'
            ],
            order: [
                ['name', 'DESC']
            ],
            include: [{
                model: Event,
                attributes: ['id']
            }]
        })
        .then(eventData => res.json(eventData.reverse()))
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }

    })
    .post(async (req, res) => {
        try { eventData =  await Event.create({
                id: req.body.id,
                description: req.body.name,
                text: req.session.text
            })
            .then(eventData => res.json(eventData))
        }   catch(err) {
                console.log(err);
                res.status(500).json(err);
            }
    });
router
.route('/:id')
    .get( async (req, res) => {
        try { eventData = await Event.findByPK({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'description',
                'text'
            ],
            include: [{
                model: Event,
                attributes: ['id']
            }]
        })
        .then(eventData => {
            if (!characterData) {
                res.status(404).json({ message: 'Not Found' });
                return;
            }
            res.json(eventData);
        })}
            catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

module.exports = router;