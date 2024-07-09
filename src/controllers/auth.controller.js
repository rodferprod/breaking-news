import bcrypt from 'bcryptjs'
import { loginService, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginService(email);

        console.log('user:', user)

        const message = "User or password not valid" ;
        
        if(!user) {
            res.status(400).send(
                {
                    message
                }
            )
        }

        const validPassword = await bcrypt.compareSync(password, user.password)

        console.log('validPassword:', validPassword)

        if(!validPassword) {
            res.status(400).send(
                {
                    message
                }
            )
        }

        const token = generateToken(user.id);

        res.send( { token } )

    } catch (erro) {
        res.status(500).send(
            {
                message: erro.message
            }
        )
    }
}

export { login }