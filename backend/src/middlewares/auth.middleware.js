import { verifyToken } from "../utils/jwt.util.js";

export const authMiddleware = (req, res, next) => {
  try {
    let token = null;
    // 1. Buscar en Authorization header
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    // 2. Fallback: buscar en cookies (opcional)
    if (!token && req.cookies) {
      token = req.cookies["token"];
    }
    if (!token) {
      return res.status(401).json({ msg: "No autenticado" });
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};