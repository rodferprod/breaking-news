import jwt from 'jsonwebtoken'
import userService from '../services/user.service.js'

export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if(!authorization) {
            return res.status(401).send({
                message: "Unauthorizated access: Authorization missing"
            })
        }

        const bearer = authorization.split(" ");

        if(bearer.length !== 2) {
            return res.status(401).send({
                message: "Unauthorizated access: Invalid authorization"
            })
        }

        const [schema, token] = bearer;

        if(schema !== 'Bearer') {
            return res.status(401).send({
                message: "Unauthorizated access: Invalid schema"
            })
        }

        jwt.verify(
            token,
            process.env.SECRET_JWT,
            async (error, decoded) => {
                if(error) {
                    return res.status(401).send({
                        message: "Unauthorizated access: Invalid token"
                    })
                }
                
                const { id, iat, exp } = decoded;
                
                const user = await userService.findByIdService(id);

                if(!user || !user?._id) {
                    return res.status(401).send({
                        message: "User not found"
                    })
                }

                req.id = user._id;

                return next();
            }
        );


    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }

}