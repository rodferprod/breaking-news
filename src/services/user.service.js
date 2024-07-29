import authService from "../services/auth.service.js";
import bcrypt from "bcryptjs";
import userRepositories from "../repositories/user.repository.js";

const createUserService = async (body) => {
    const {
        name,
        username,
        email,
        password,
        avatar,
        background
    } = body;
    if (!name || !username || !email || !password || !avatar || !background)
        throw new Error("All fields are required to create a register")

    const foundUser = await userRepositories.findByEmailUserRepository(email);

    if (foundUser) throw new Error("User already exists");
    
    const user = await userRepositories.createUserRepository({
        name,
        username,
        email,
        password,
        avatar,
        background
    });
    
    if (!user)
        throw new Error("An error occurred while creating User.");

    const token = authService.generateToken(user.id);
  
    return token;
}

const findAllUserService = async () => {
    const users = await userRepositories.findAllUserRepository();

    if (users.length === 0) {
        throw new Error("There are no registered users");
    }

    return users;
}

const findByIdUserService = async (userIdParam, userIdLogged) => {
    let idParam;
    if (!userIdParam) {
      userIdParam = userIdLogged;
      idParam = userIdParam;
    } else {
      idParam = userIdParam;
    }
    if (!idParam)
      throw new Error("Send an id in the parameters to search for the user");
  
    const user = await userRepositories.findByIdUserRepository(idParam);
  
    if (!user) throw new Error("User not found");
  
    return user;
  }

const updateUserService = async (
    {
        name,
        username,
        email,
        password,
        avatar,
        background
    },
    userId,
    userIdLogged
) => {

    if (!name && !username && !email && !password && !avatar && !background) 
        throw new Error("Submit at least one field for update");        

    const user = await userRepositories.findByIdUserRepository(userId);

    if (user._id != userIdLogged)
        throw new Error("You cannot update this user");

    if (password) password = await bcrypt.hash(password, 10);

    await userRepositories.updateUserRepository(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
    )

    return { message: "User successfully updated!" };
}

export default {
    createUserService,
    findAllUserService,
    findByIdUserService,
    updateUserService
}