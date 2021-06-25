const router = require('express').Router();
const { Character, User } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

let characterData

router
.route('/')
    .get( async (req, res) => {
        try{characterData = await Character.findAll({
            attributes: [
                'id',
                'name',
                'bio',
                'class',
                'health',
                'stamina',
                'mana',
                'user_id'
            ],
            order: [
                ['name', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(characterData => res.json(characterData.reverse()))
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }

    })
    .post(withAuth, async (req, res) => {
        try { characterData =  await Character.create({
                id: req.body.id,
                name: req.body.name,
                user_id: req.session.user_id
            })
            .then(characterData => res.json(characterData))
        }   catch(err) {
                console.log(err);
                res.status(500).json(err);
            }
    });
router
.route('/:id')
    .get( async (req, res) => {
        try { characterData = await Character.findByPK({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'name',
                'bio',
                'class',
                'health',
                'stamina',
                'mana',
                'user_id'
            ],
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(characterData => {
            if (!characterData) {
                res.status(404).json({ message: 'Character not found with this id' });
                return;
            }
            res.json(characterData);
        })}
            catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
})
    .delete( withAuth, async (req, res) => {
        try { characterData = await Character.destroy({
            where: {
                id: req.params.id
            }
        }).then(characterData => {
            if (!characterData) {
                res.status(404).json({ message: 'No character found with this id' });
                return;
            }
            res.json(characterData)}
    
        )} catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;