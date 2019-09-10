const express = require('express')
const methodOverride = require('method-override');
var db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// Home page
app.get('/', (req, res) => {
	res.render('home')
})

// List of all favorite animals
app.get('/favorites', (req, res) => {
	db.animal.findAll()
	.then(function(animals) {
		res.render('favorites', { animals: animals })
	})
	.catch(error => {
		if(error){
			console.log(error);
			res.send("There was an error processing your request")
		}
	});
})

// Add a new favorite animal
app.post('/favorites', (req, res) => {
	db.animal.create({
		species_name: req.body.species_name,
		scientific_name: req.body.scientific_name,
		image_url: req.body.image_url,
		description: req.body.description,
		extinct: req.body.extinct
	})
	.then(function(animal){
		res.redirect('favorites')
	})
	.catch(error => {
		if(error){
			console.log(error);
			res.send("There was an error processing your request")
		}
	});
})

// A form for adding a new animal
app.get('/favorites/new', (req, res) => {
	res.render('new')
})

app.listen(process.env.PORT || 3004);