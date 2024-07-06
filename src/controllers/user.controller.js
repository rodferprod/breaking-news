const create = (req, res) => {
    const {
        name,
        username,
        email,
        senha,
        avatar,
        background
    } = req.body;

    if(!name || !username || !email || !senha || !avatar || !background) {
        res.status(400).send(
            {
                message: "All fields are required to create a register"
            }
        )
    } else {
        res.status(201).send(
            {
                message: "User created successfully",
                user: {
                    name,
                    username,
                    email,
                    avatar,
                    background
                },
            }
        )
    }

}

module.exports = { create };