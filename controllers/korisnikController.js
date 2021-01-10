const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtSecret');
const Korisnik = require('../models/Korisnik');

exports.seeAll = async (req, res) => {
    try {
        // let korisnik = await new Korisnik(req.body);
        console.log(req.id);
        let all = await Korisnik.getAll();

        res.json(all);
    } catch (error) {
        console.log(error);
    }
};

exports.addOne = async (req, res) => {
    let korisnik = await new Korisnik(req.body);
    korisnik
        .add()
        .then(() => {
            // const payload = { korisnik: { id: korisnik.data._id } };
            const payload = { id: korisnik.data._id };

            jwt.sign(payload, jwtSecret, { expiresIn: 10 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, id: payload.id });
            });
        })
        .catch((err) => res.status(422).json(err));
};

exports.login = async (req, res) => {
    let korisnik = await new Korisnik(req.body);
    korisnik
        .authenticate()
        .then(() => {
            const payload = { id: korisnik.data._id };

            if (payload.id) {
                jwt.sign(
                    payload,
                    jwtSecret,
                    { expiresIn: 10 },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json({ token, id: payload.id });
                    }
                );
            } else {
                res.status(400).json(korisnik.errors[0]);
            }
        })
        .catch((err) => res.json(err));
};

// exports.editOne = async (req, res) => {
//     try {
//         await Korisnik.edit(req.body.nameIn, req.body.nameOut);
//         res.json(req.body);
//     } catch (error) {
//         console.log(error);
//     }
// };

// exports.deleteOne = async (req, res) => {
//     try {
//         await Korisnik.delete(req.body.name);
//         res.json(req.body.name);
//     } catch (error) {
//         console.log(error);
//     }
// };
