import { Router } from "express";
import {
  create,
  deleteById,
  show,
  shows,
  showsPaginate,
  update,
} from "../../handler/v1/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to the API",
  });
});

router.post("/posts", create);
router.get("/posts", shows);
router.get("/posts/paginate", showsPaginate);
router.get("/posts/:id", show);
router.put("/posts/:id", update);
router.delete("/posts/:id", deleteById);

export default router;
