const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const app = express();
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
  }
});

const profile = require('./controllers/profile')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')

/*knex.select('*').from('users').then(result => {
  console.log(result)
})*/



app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.json('Seems to be working just fine')
})

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, knex) })

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, knex, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

app.put('/image', (req, res) => { image.handleImage(req, res, knex) })

app.put('/image', (req, res) => { image.handleAPICall(req, res) })

app.listen(3000, () => {
  console.log("Seems to be working just fine!");
})

