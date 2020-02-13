const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.json({ message: "Server is running 👍" })
});

// Get array of all users
server.get('/api/users', ( req, res ) => {
    Users.find()
    .then(users => {
        res
        .status(200)
        .json(users);
    })
    .catch(() => {
        res
        .status(500)
        .json({errorMessage: 'Please provide name and bio for the user.'});
    });
  });

  server.get('/api/users/:id', ( req, res ) => {
    Users.findById(req.params.id)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' })
        }
    })
    .catch(() => {
        res.status(500)
        .json({ errorMessage: 'The user information could not be retrieved.' })
    });
  });
const port = 8080

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
