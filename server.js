const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const app = express();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'dpg-ci1qu767avj2t31ddqhg-a',
    port: 5432,
    user: 'face_recognition_site_database_user',
    password: '7vdFfiPbWMc7Fk6yACUXryBL2v6Mswxv',
    database: 'face_recognition_site_database'
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

