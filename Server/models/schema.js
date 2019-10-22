const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

const todoApp = new mongoose.Schema({
	title: String,
	description: String,
	dateCreated: {
		type: Date,
		default: Date.now()
	}
});

const Todo = mongoose.model('blog1', todoApp);

module.exports = Todo;