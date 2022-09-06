const express = require("express")
const app = express()
var cors = require('cors')
let projectCollection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const MongoClient = require('mongodb').MongoClient

const uri = 'mongodb+srv://admin:admin@sit725.wfbsvth.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true })

//create collection
const createColllection = (collectionName) => {
    client.connect((err, db) => {
        projectCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

//Insert project
const insertProjects = (project, callback) => {
    projectCollection.insert(project, callback);
}

//Get project
const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

// GET API
app.get('/api/projects', (req, res) => {
    getProjects((err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Success", data: result })
        }
    })
})

// POST API
app.post('/api/projects', (req, res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject, (err, result) => {
        if (err) {
            res.json({ statusCode: 400, message: err })
        }
        else {
            res.json({ statusCode: 200, message: "Project Successfully added", data: result })
        }
    })
})



const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
    createColllection('Pets')
})