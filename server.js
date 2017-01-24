"use strict"

// *****************************************************************************
// *****************************************************************************
// Requires

const express = require( "express" )
const path    = require( "path" )
const fs      = require( "fs" )



// *****************************************************************************
// *****************************************************************************
// App setup

const app = express()

app.set( "view engine", "ejs" )

app.use( express.static( path.join( __dirname, "/public" ) ) )




// *****************************************************************************
// *****************************************************************************
// Middleware


app.use( ( req, res, next ) => {

  const now = new Date().toString()

  const log = `${now}: ${req.method} ${req.originalUrl}`

  console.log( log )

  fs.appendFile( "server.log", log + "\n", ( error ) => {

    if ( error ) {

      console.log( "Unable to log" )

    }
  })

  next()

})


app.use( ( req, res, next ) => {

  res.render( "maintenence", {
    pageTitle: "Maintenence"
  })

})



// *****************************************************************************
// *****************************************************************************
// Routing

app.get( "/", ( req, res ) => {

  // res.send( "<h1>Hello world!!!</h1>" )

  res.render( "landing", {
    pageTitle     : "Landing Page",
    currentYear   : new Date().getFullYear(),
    welcomeMessage: "Hello love!"
  })

})



app.get( "/bad", ( req, res ) => {

  res.send({
    error: {
      errorMessage: "This went tits up!"
    }
  })

})



app.get( "/about", ( req, res ) => {

  res.render( "about", {
    pageTitle  : "About page",
    currentYear: new Date().getFullYear()
  })

})



// *****************************************************************************
// *****************************************************************************
// Server

// Set correct port depending on local or via env
app.set( "port", ( process.env.PORT || 3000 ) )

app.listen( app.get( "port" ), function () {

  console.log( "Server has started" )

})

