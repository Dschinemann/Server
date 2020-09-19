const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports = {
    async singin(req, res) {


        const user = await User.findOne({
            where: {
                email: req.body.email
            },
            include:[
                {association:'user1'},
                {association:'upload'}
                
            ]
            
        }).then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." })
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password_hash
            )
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            }
            user.password_hash = undefined

            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 86400
            })

            return res.json({ user, token })
        })

    }
}