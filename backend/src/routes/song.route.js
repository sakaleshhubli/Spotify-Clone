import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.send("Songs route with GET method");
});

export default router;
