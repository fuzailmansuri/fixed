const express = require ("express")
const hbs = require ("hbs")
const app = express();
const PORT = 3000;
const routes = require('./routes/main.js')
const mongoose = require("mongoose")
const detail = require ("./models/detail")
const mongodb = "mongodb+srv://kazifardeen18:kazif4711@cluster0.9wlnmo8.mongodb.net/"
const bcrypt = require('bcrypt');

app.use('/public',express.static("public"))
app.use('',routes)


//template engine 
app.set('view engine','hbs') //sets hbs as the template engine
app.set("views","views") //throws error if views were not set were they are located
hbs.registerPartials("views/partials")

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});

//mongoose connection
mongoose.set('strictQuery', true)//for an error in terminal
// Connect to MongoDB
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

/*	detail.create({
		companyName:"KaziConstructions",
		companyIconUrl:"https://ibb.co/w4vrTb3",
		links:[
			{
			  label:"Home",
			  url:"/"	
			},
			{
				label:"Services",
				url:"/Services"	
			  },
			  {
				label:"Gallery",
				url:"/gallery"
			  },
			  {
				label:"Contact Us",
				url:"/contact-us"
			  },
	
		]
	})
*/
