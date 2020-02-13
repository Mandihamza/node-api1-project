const express = require('express')

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
	res.json({ message: "Server is running 👍" })
})

const port = 8080

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
