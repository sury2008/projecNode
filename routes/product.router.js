import {Router} from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct  } from "../controllers/product.controller.js";

const router = Router();

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.post('/',addProduct);

router.put('/:id',updateProduct);

router.delete('/:id',deleteProduct)

export default router;