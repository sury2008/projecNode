import { Router } from "express";
import { validateBody } from "../middlewares/validateJoi.middleware.js";
import { registerSchema,signInSchema,updatePasswordSchema } from "../validations/user.validation.js";
import { login, register, updatePassword } from '../controllers/user.controller.js';


const router= Router();

router.post('/',validateBody(registerSchema),register);
});

router.post('/login', validateBody(signInSchema), login);
});

router.patch('/password', validateBody(updatePasswordSchema), (req, res) => {
    res.json({ message: 'בקשת עדכון הסיסמה התקבלה' });
});

export default router;