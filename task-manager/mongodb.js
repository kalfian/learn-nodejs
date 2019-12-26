const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
const database = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }

    console.log("Connected to db!")

    const db = client.db(database)

    // Insert Many data
    // db.collection('task').insertMany([
    //     {
    //         name: "Buy some milk",
    //         isComplete: true
    //     },{
    //         name: "Buy some egg",
    //         isComplete: false
    //     }
    // ], (error, complete) => {
    //     if (error) {
    //         return console.log('Error insert data!')
    //     }

    //     console.log(complete.ops)
    // })


    // Update Data
    db.collection('task').updateMany({
       isComplete: false 
    }, {
        $set: {
            isComplete: true
        }
    }).then(result => {
        console.log("Success ", result)
    }).catch(error => {
        console.log("Error ", error)
    })
})