
const handleSignIn = (req, res, knex, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json("Wrong format")
    }
    knex.select('email', 'hash').from('login').where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                knex.select('*').from('users').where('email', '=', data[0].email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => console.log(err))
            } else {
                res.status(400).json('Wrong credentials')
            }
        })
        .catch(err => console.log(err))
}


module.exports = {
    handleSignIn: handleSignIn
}