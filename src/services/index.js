import fs from 'fs'
import { keys } from 'lodash'

const filePath = './public/notes.json'

module.exports = (app) => {
  app.get('/notes', (req, res) => {
    const { query: { keyword } } = req
    fs.readFile(filePath, 'utf8', (e, data) => {
      if (e) {
        console.log(e)
        return
      }
      const notesData = data ? JSON.parse(data) : {}
      const notes = []
      if (keys(notesData).includes(keyword)) {
        notes.push(...notesData[keyword])
      }
      res.send({ data: { keyword, notes } })
    })
  })

  app.post('/notes', (req, res) => {
    const { body: { keyword, note } } = req
    console.log({ keyword, note })
    fs.readFile(filePath, 'utf8', (e, data) => {
      if (e) {
        console.log(e)
        return
      }
      const notesData = data ? JSON.parse(data) : {}
      const notesArray = [note]
      if (keys(notesData).includes(keyword)) {
        notesArray.push(...notesData[keyword])
      }
      notesData[keyword] = notesArray
      console.log({ notesData })
      fs.writeFileSync(filePath, JSON.stringify(notesData))
      res.status(201)
      res.send({ notesData })
    })
  })
}