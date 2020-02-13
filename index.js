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


// Get users by id
  server.get('/api/users/:id', ( req, res ) => {
    Users.findById(req.params.id)
    .then(user => {
        if (user) {
            res
            .status(200)
            .json(user);
        } else {
            res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' })
        }
    })
    .catch(() => {
        res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved.' })
    });
  });

//Post new user
server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;

    if (!name || !bio) {
        res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        Users.insert(req.body)
    .then(users => {
        res
        .status(201)
        .json(users)
    })
    .catch(() => {
        res
        .status(400)
        .json({ errorMessage: 'There was an error while saving the user to the database' })
    });
    }
});

const port = 8080

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})

server.post('/api/users', (req, res) => {
    Users.insert(req.body)
    const newUser = {

    }
})
