const sequelize = require('../config/connection');
const { User, Character } = require('../models');
const router = require('express').Router();
router.route('/')
.get(async(req, res) => {
   try {userData = await User.findAll({
            attributes: [
                'id',
                'username',
                'password'
            ],
            include: [{
                    model: Character,
                    attributes: ['id', 'name', 'bio', 'class', 'health', 'stamina', 'mana', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
            ]
        })
        .then(userData => {
            const character = userData.map(character => character.get({ plain: true }));
            res.render('homepage', { character, loggedIn: req.session.loggedIn });
        })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});
router.route('/login')
.get((req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
router.route('/signup')
.get((req, res) => {
    res.render('signup');
});
router.route('/user/:id')
.get(async (req, res) => {
    try {postData = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'username',
                'password',
            ],
            include: [{
                    model: Character,
                    attributes: ['id', 'name', 'bio', 'class', 'health', 'stamina', 'mana', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            const user = userData.get({ plain: true });
            console.log(user);
            res.render('single-post', { user, loggedIn: req.session.loggedIn });
        })}
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
});

module.exports = router;