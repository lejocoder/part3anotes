const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// we import express, which this time is a function
// that is sued to create an express appliation stored in the 
// app variable
//body parser is a so called middleware, functions used
// to handle request and resposne objects.
// middle ware can execute, make changes to the request
// and response objects, end the request-response cycle
// call the next middleware function in teh stack
let notes = [  
    {    
        id: 1,    
        content: "HTML is easypeasy",    
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
// use the colon syntax here so we can refer to it in request under
// params, making it easier to access for us to access
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

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}
// in the second line of the code map creates a new array of just ids
// using map we use max to find the max id and add 1 for the new id
// this helps generate the max id !

app.post('/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } // evaluate using truthy or falsey

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  } // create a new note!
  // how important is determined -> if there is a body.important then use it
  // if not default automatiically to defautl
  notes = notes.concat(note) // add note to notes

  response.json(note)
})


// body parser take the json data of a requets and transforms it 
// into a JS object and then attaches it to the body property of 
// the request before the route handler is called


app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
// if deleeting a resource is successful meaning that the note 
// exists and it is removed, we respond to the equest with the 
// status code 204 no contnent and return no data with the response
// no consensus on what status code should be returned to a DELETE
// request if the resource does not exist
//downlaoded postman just o delete and it works! veyr convenient imo
app.use(unknownEndpoint)


// for this we can either us the port defined in env variable 
// PORT or see if env variable port is undefined
const PORT = process.env.PORT || 3001
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

// look into falsy and truthy
// essentially truthy = value considered true when encountered
// ina boolean context


// http GET SHULD BE SAFE HOMIE/
// safety means that executing requests must not cause any side
// effects in the server. BY side-effects we mean that the state
// of the database must not change as a result of the requets
// and the response must only return DATA  that alrdy exists
// on the server

// there is laso a request type called HEAD working exactly like
// GET but it does not reutnr naything but the status code
// and response headers


// all http requests except post should be idempotent
// means that if a request has side-effects, then the reseult
// should be the same regardless of many times the request is sent

// what about delete?
// The key bit there is the side-effects of N > 0 identical requests is the same as for a single request.

//You would be correct to expect that the status code would be 
//different but this does not affect the core concept of 
//idempotency - you can send the request more than once without 
//additional changes to the state of the server.