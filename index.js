const express = require('express')
const app = express()

// we import express, which this time is a function
// that is sued to create an express appliation stored in the 
// app variable
let notes = [  
    {    
        id: 1,    
        content: "HTML is easy",    
        date: "2019-05-30T17:30:31.098Z",    
        important: true  
    },  
    {    
        id: 2,    
        content: "Browser can execute only Javascript",    
        date: "2019-05-30T18:39:34.091Z",    
        important: false  
    },  
    {    
        id: 3,    
        content: "GET and POST are the most important methods of HTTP protocol",    
        date: "2019-05-30T19:20:14.298Z",    
        important: true  
    }
]
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
app.get('/notes', (req, res) => {
    res.json(notes)
    })

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, typeof id, note.id === id)
    return note.id === id
  } )
  if (note) {
      response.json(note)
  }
  else {
      response.status(404).end() // end() llitterly ends the response process
  }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })

// above creates two routes to the appplicatio
// first one handles http get requests made to teh app's root
// first request parameter contains all of teh information
// of the http requesta dn the second response parameter is used to 
// define how the request is responded to.

// in our code we use send to send objects. calling teh method
// makes the server repsond to the http request by sending a 
// response containing the string <h1>Hello World!</h1>


// teh second route defines an event handler, that handles
// httpget requests made to the notes path of the application

// previously wusing only Node we had to transform the data
// into teh JSON format with the JSON.stringify method

