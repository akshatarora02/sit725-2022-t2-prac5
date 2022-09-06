const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:admin@sit725.wfbsvth.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })

client.connect((err, db) => {
    if (!err) {
        console.log('Database Connected')
    } else {
        console.log('[error]', err)
    }
});


exports.mongoClient = client;