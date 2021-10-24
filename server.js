const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

// , collection;

const url = "mongodb+srv://mekibet:Jeanie931@familychores.wsx2y.mongodb.net/chores?retryWrites=true&w=majority";
const dbName = "chores";

app.listen(3002, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => { // if it is correct, the url, it will create a client that holds the mongodb data. 
    if (error) {
      throw error;
    }
    db = client.db(dbName);//it's finding the the mongodb database with thtat name
    console.log("Connected to `" + dbName + "`!");
  });
});

//boiler
app.set('view engine', 'ejs')//allows us to use ejs 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
//

// the non templated stuff
app.get('/', (req, res) => {
  db.collection('choreInfo').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { listOfChores: result })
  })
})

app.post('/listOfChores', (req, res) => {
  db.collection('choreInfo').insertOne({ name: req.body.name, dueday: req.body.dueday, chore: req.body.chore, taskDone: req.body.taskDone}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/listOfChoresNotDone', (req, res) => {
  db.collection('choreInfo')
    .findOneAndUpdate({ name: req.body.name, dueday: req.body.dueday, chore:req.body.chore}, {
      $set: {
        taskDone: false
      }
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.put('/listOfChoresDone', (req, res) => {
  db.collection('choreInfo')
    .findOneAndUpdate({ name: req.body.name, dueday: req.body.dueday, chore:req.body.chore}, {
      $set: {
        taskDone: true
      }
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.delete('/listOfChores', (req, res) => {
  db.collection('choreInfo').findOneAndDelete({ name: req.body.name, dueday: req.body.dueday, chore: req.body.chore}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
