import express from "express"

const app = express()
app.use(express.static("../www"))

app.get("/api/hello", (req, res) => {
    res.type("text/json").send(JSON.stringify({ message: "Hello from the server" }))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})
