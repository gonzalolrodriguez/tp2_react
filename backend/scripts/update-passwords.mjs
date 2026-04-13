import 'dotenv/config';
// Script para actualizar todas las contraseñas de usuarios existentes a formato bcrypt
// Solo ejecuta esto si sabes la contraseña original de cada usuario, o si quieres poner una contraseña por defecto para todos.

import bcrypt from 'bcryptjs';
import { UserModel } from '../src/models/index.js';

const DEFAULT_PASSWORD = '123456'; // Cambia esto si quieres otra contraseña por defecto

async function updatePasswords() {
    try {
        const users = await UserModel.findAll();
        for (const user of users) {
            // Si ya está hasheada, salta
            if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
                continue;
            }
            // Hashea la contraseña actual o la por defecto
            const newPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
            user.password = newPassword;
            await user.save();
            console.log(`Contraseña actualizada para usuario: ${user.username}`);
        }
        console.log('Actualización de contraseñas completada.');
        process.exit(0);
    } catch (err) {
        console.error('Error actualizando contraseñas:', err);
        process.exit(1);
    }
}

updatePasswords();
