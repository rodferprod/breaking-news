import bcrypt from 'bcryptjs'
import { loginService, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400).send(
                {
                    message: "Invalid credentials"
                }
            )
        }
        
        const user = await loginService(email);

        const message = "User or password not valid" ;
        
        if(!user) {
            res.status(400).send(
                {
                    message
                }
            )
        }

        await bcrypt.compare(password, user.password, async (error, success) => {           

            if(error) {
                return res.status(400).send(
                    {
                        message
                    }
                )
            }

            if(!success) {
                return res.status(400).send(
                    {
                        message
                    }
                )
            }

            const token = await generateToken(user.id);

            return res.send( { token } )
        });
        
    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

export { login }