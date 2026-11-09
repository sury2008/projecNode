import {Router} from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct  } from "../controllers/product.controller.js";
import { validateBody } from "../middlewares/validateJoi.middleware.js";
import {ProductSchema} from "../models/product.model.js";

const router = Router();

router.get('/',getAllProducts);
router.get('/:id',getProductById);

const validateProduct = validateBody(ProductSchema);
router.post('/', validateProduct, addProduct);

router.put('/:id',validateBody(productSchema),updateProduct);

router.delete('/:id',deleteProduct)

export default router;