//this file contains the endpoint to CRUD users in the database

const User = require('../models/User.js');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';


module.exports.controller = (app) => {
    // register a user
    app.post('/users/register', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = new User({
            name,
            email,
            password,

        });

        User.createUser(newUser, (error, user) => {
            if (error) {
                res.status(422).json({
                    message: 'Registrierung fehlgeschlagen!',
                });
            }
            res.send({ user });
        });
    });

    // login a user
    app.post('/users/login', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            User.getUserByEmail(email, (err, user) => {
                if (!user) {
                    res.status(404).json({ message: 'Der Benutzer existiert nicht!' });
                } else {
                    User.comparePassword(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            const payload = { id: user.id };
                            const token = jwt.sign(payload, jwtOptions.secretOrKey);
                            res.json({ message: 'ok', token });
                        } else {
                            res.status(401).json({
                                message: 'Passwort nicht korrekt!'
                            });
                        }
                    });
                }
            });
        }
    });
};