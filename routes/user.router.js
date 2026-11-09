import { Router } from 'express';
import { validateBody } from '../middlewares/validateJoi.middleware';
import { registerSchema } from '../validations/user.validation';


const router= Router;

router.post('/',validateBody(registerSchema),(req,res) =>{
    res.json({message: 'ההרשמה התקבלה'})
});

router.post('/login', validateBody(signInSchema), (req, res) => {
    res.json({ message: 'בקשת ההתחברות התקבלה' });
});

router.patch('/password', validateBody(updatePasswordSchema), (req, res) => {
    res.json({ message: 'בקשת עדכון הסיסמה התקבלה' });
});

export default router;