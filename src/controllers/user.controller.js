import userService from "../services/user.service.js";

const createUserController = async (req, res) => {
    try {
        const token = await userService.createUserService(req.body);

        res.status(201).send(token)
        
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const findAllUserController = async (req, res) => {
    try{
        const users = await userService.findAllUserService();

        return res.send(users);
    } catch (error) {
        res.status(400).send(
            {
                message: error.message
            }
        )
    }
}

const findByIdUserController = async (req, res) => {
    try {
        const user = await userService.findByIdUserService(
          req.params.id,
          req.id
        );
        return res.send(user);
      } catch (e) {
        return res.status(400).send(e.message);
      }
}

const updateUserController = async (req, res) => {
    try{
        const {
            name,
            username,
            email,
            password,
            avatar,
            background
        } = req.body;

        const { id } = req;

        await userService.updateUserService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        )

        return res.send({
            message: "User updated"
        })

    } catch (error) {
        res.status(500).send(
            {
                message: error.message
            }
        )
    }
}

export default {
    createUserController,
    findAllUserController,
    findByIdUserController,
    updateUserController
}