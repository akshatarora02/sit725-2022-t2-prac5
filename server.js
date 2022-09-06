const express = require("express")
const app = express()
var cors = require('cors')
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
let userRoutes = require("./routes/userRoutes");
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/projects", projectRoutes)
app.use("/api/user", userRoutes)

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
})