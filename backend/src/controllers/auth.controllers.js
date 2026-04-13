
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { UserRoleModel } from "../models/user_role.model.js";
import { generateToken } from "../utils/jwt.util.js";
import bcrypt from "bcryptjs";


export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    where: { username },
    include: {
      model: PersonModel,
      attributes: ["name", "lastname"],
      as: "person",
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  // Comparar contraseña hasheada
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  const token = generateToken({
    id: user.id,
    name: user.person.name,
    lastname: user.person.lastname,
    username: user.username,
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1h
  });
  return res.json({
    message: "Login exitoso",
    token,
    user: {
      id: user.id,
      name: user.person.name,
      lastname: user.person.lastname,
      username: user.username,
      email: user.email,
    },
  });
};


export const register = async (req, res) => {
  try {
    const { name, lastname, username, email, password } = req.body;
    const persona = await PersonModel.create({ name, lastname });
    // Hashear la contraseña antes de guardar
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      person_id: persona.dataValues.id,
    });
    // Asignar role 'user' por defecto
    const roleUser = await UserRoleModel.findOne({ where: { role_id: 2 } });
    const roles = roleUser.role_id;
    await UserRoleModel.create({ user_id: user.id, role_id: roles });
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const profile = (req, res) => {
  return res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      lastname: req.user.lastname,
    },
  });
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  return res.json({ message: "Logout exitoso" });
};
