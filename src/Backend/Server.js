const express = require('express')
const app = express()
const port = 4000
const bodyParser = require("body-parser");

//installing cors and using everytime
const cors = require('cors')

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

// parse application intercepts the body of a hhtp message being passed
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
  
//returning a json
app.get('/api/movies', (req, res) =>{
  //create constant
  const myMovies = [{
    "Title":"Avengers: Infinity War",
    "Year":"2018",
    "imdbID":"tt4154756",
    "Type":"movie",
    "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    },
    {
    "Title":"Captain America: Civil War",
    "Year":"2016",
    "imdbID":"tt3498820",
    "Type":"movie",
    "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    },
    {
    "Title":"World War Z",
    "Year":"2013",
    "imdbID":"tt0816711",
    "Type":"movie",
    "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}
    ,{
    "Title":"War of the Worlds",
    "Year":"2005",
    "imdbID":"tt0407304",
    "Type":"movie",
    "Poster":"https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
    }
    ]
    //returns this
  res.status(200).json({
    message: "Everything is OK",
    movies: myMovies});
}
)
//listening to post request going to try and pull title, year, poster using body
app.post('api/movies', (req, res)=>{
  console.log("Movies has been recieved");
  console.log(req.body.title);
  console.log(req.body.year);
  console.log(req.body.poster);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})