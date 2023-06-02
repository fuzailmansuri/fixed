const express = require("express");
const { route } = require('express/lib/application');
const Detail = require("../models/detail");
const routes = express.Router();
const path = require("path");
const userinfo = require("../models/userinfo");
const collection = require("../models/userinfo").default;
const userRoute = require('./userRouter');
const jwt = require('jsonwebtoken');

// Authentication middleware
const authenticateToken = (req, res, next) => {
	const token = req.cookies.token;

	if (!token)
	{
		return res.redirect('/');
	}

	jwt.verify(token, 'your-secret-key', (err, user) => {
		if (err)
		{
			return res.redirect('/');
		}

		req.user = user;
		next();
	});
};

routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());

routes.get('/', (req, res) => {
	res.render("login", { isAuthenticated: false });
});

routes.get('/signup', (req, res) => {
	res.render("signup", { isAuthenticated: false });
});

routes.use('/', userRoute);

routes.get('/home', authenticateToken, (req, res) => {
	res.render("index", { isAuthenticated: true });
});

routes.get('/services', authenticateToken, (req, res) => {
	res.render("Services", { isAuthenticated: true });
});

routes.get('/whyus', authenticateToken, (req, res) => {
	res.render("whyus", { isAuthenticated: true });
});

routes.get('/featuredwork', authenticateToken, (req, res) => {
	res.render("featuredwork", { isAuthenticated: true });
});

routes.get('/reviews', authenticateToken, (req, res) => {
	res.render("reviews", { isAuthenticated: true });
});

module.exports = routes;
