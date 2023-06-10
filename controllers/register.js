
const handleRegister = (req, res, knex, bcrypt) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json("Wrong format.")
    }
    const hash = bcrypt.hashSync(password, 10);
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],   //Made a change. Removed .email from here
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(error => {
            res.status(500).json('Error registering user');
        })
}

module.exports = {
    handleRegister : handleRegister
}