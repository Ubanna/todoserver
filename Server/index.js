const options = {
    keepAlive: true,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
  };
const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./models/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
};

mongoose
	.connect('mongodb+srv://test:123@cluster0-iiyzw.mongodb.net/test?retryWrites=true&w=majority',  options )
	.then(() => console.log('connected'))
	.catch((err) => console.log('failed to connect', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
	res.send('Welcome to our first express app');
});

app.post('/create', (req, res) => {
	const { title, description, dateCreated } = req.body;
	const newTodo = new Todo({
		title,
		description,
		dateCreated
	});
	newTodo
		.save()
		.then((response) => {
			res.send(response);
		})
		.catch((err) => console.log(err));
});

app.get('/blog-post', (req, res) => {
	Todo.find({}, (err, allTodo) => {
		if (err) {
			return err;
		} else {
			res.send(allTodo)
			return allTodo;
		}
	});
});

app.get('/blog-post/:id', (req, res) => {
	Todo.findById(req.params.id, (err, singleTodo) => {
		if (err) {
			console.log(err);
		} else {
			console.log(singleTodo);
		}
	});
});

app.delete("/delete", (req, res) => {
	Todo.deleteMany({}, (err, removed) => {
		if (err) {
			return err
		} else {
			res.send(removed)
		}
	})
})

app.delete('/delete-post/:id', (req, res) => {
	console.log(req.params)
	Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
		if (err) {
			console.log(err);
		} else {
			console.log(deletedTodo);
		}
	});
});


app.put('/update-post/:id', (req, res) => {
	Todo.findOneAndUpdate(req.params.id, req.body, (err, updated) => {
		console.log(req.body, 'reeee')
		if (err) {
			console.log(err);
		} else {
			res.send(updated);
		}
	});
});

app.post('/sendmail', (req, res) => {
	const {title, subject, description} = req.body
	const mailOptions = {
		to: 'ubaekeh@gmail.com',
		from:  title,
		subject: subject,
		html: description,
		dateCreated: Date.now()
	}
	transporter.sendMail(mailOptions, (err, sentmail) => {
		if(err){
			console.log(err)
		}console.log(sentmail)
	})

})

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: 'ubaekeh@gmail.com',
		pass: "12345"
	}
})


const Port = process.env.PORT || 3008;
app.listen(Port, () => {
	console.log('app running on port', Port);
});