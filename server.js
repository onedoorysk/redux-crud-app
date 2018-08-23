import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose'
import Character from './character'

const app = express()
const port = process.env.PORT || 3001
const dbUrl = 'mongodb://localhost/crud'
const requestUrl = '/api/characters'

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr)

  app.get(requestUrl, (request, response) => {
    Character.find({}, (err, characterArray) => {
      if (err) response.status(500).send()
      else response.status(200).send(characterArray)
    })
  })

  app.post(requestUrl, (request, response) => {
    const {name, age} = request.body
    new Character({
      name,
      age
    }).save(err => {
      if (err) response.status(500)
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(characterArray)
        })
      }
    })
  })

  app.put(requestUrl, (request, response) => {
    const { id } = request.body
    Character.findByIdAndUpdate(id, { $inc: {"age": 1} }, err => {
      if (err) response.status(500).send()
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(characterArray)
        })
      }
    })
  })

  app.delete(requestUrl, (request, response) => {
    const { id } = request.body
    Character.findByIdAndRemove(id, err => {
      if (err) response.status(500).send()
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send()
          else response.status(200).send(characterArray)
        })
      }
    })
  })

  app.listen(port, err => {
    if (err) throw new Error(err)
    else console.log(`listening on port ${port}`)
  })
})