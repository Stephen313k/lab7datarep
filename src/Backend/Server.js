const express = require('express')
const app = express()
const port = 4000
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//installing cors,mongoose and using everytime

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

//implementing mongoosedb
const ConnectionString = 'mongodb+srv://iawesomely:G@bentrollsmealot1@cluster0.lnu5q.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(ConnectionString, {useNewUrlParser: true});  

//creating a scheme
const Schema = mongoose.Schema;

//what is going to be stored
var movieSchema = new Schema({
  title:String,
  year:String, 
  poster:String
})

var MovieModel = mongoose.model("movie", movieSchema);

//returning a json
app.get('/api/movies', (req, res) =>{
  //create constant
  // const myMovies = [{
  //   "Title":"Avengers: Infinity War",
  //   "Year":"2018",
  //   "imdbID":"tt4154756",
  //   "Type":"movie",
  //   "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title":"Captain America: Civil War",
  //   "Year":"2016",
  //   "imdbID":"tt3498820",
  //   "Type":"movie",
  //   "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
  //   },
  //   {
  //   "Title":"World War Z",
  //   "Year":"2013",
  //   "imdbID":"tt0816711",
  //   "Type":"movie",
  //   "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}
  //   ,{
  //   "Title":"War of the Worlds",
  //   "Year":"2005",
  //   "imdbID":"tt0407304",
  //   "Type":"movie",
  //   "Poster":"https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
  //   }
  //   ]
    //returns this

  //.find finds all doccument in databases
  MovieModel.find((err, data)=>{
    res.json(data);
  })
    
  // res.status(200).json({
  //   message: "Everything is OK",
  //   movies: myMovies});
}
)
//returning movie id
app.get('/api/movies/:id', (req, res)=>{
  console.log(req.params.id);

  MovieModel.findById(req.params.id, (err, data) =>{
    res.json(data);
  })
})


//listening to post request going to try and pull title, year, poster using body
app.post('/api/movies', (req, res)=>{
  console.log("Movies has been recieved");
  console.log(req.body.title);
  console.log(req.body.year);
  console.log(req.body.poster);

  MovieModel.create({
    title:req.body.title,
    year:req.body.year,
    poster:req.body.poster
  })
  //important so client knows its added
  res.send("item added");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})