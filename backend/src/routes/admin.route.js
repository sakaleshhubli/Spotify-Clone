import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.send("Admin route with GET method");
});

export default router;
