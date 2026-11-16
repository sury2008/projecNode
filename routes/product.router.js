import { Router } from "express";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "../controllers/product.controller.js";
import { validateBody } from "../middlewares/validateJoi.middleware.js";
import { productSchema } from "../validations/product.validation.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validateBody(productSchema), addProduct);
router.put("/:id", validateBody(productSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;