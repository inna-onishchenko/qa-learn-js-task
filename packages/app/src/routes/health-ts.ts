import { Router, Request, Response } from "express";

interface HealthResponse {
  status: string;
  language: string;
}

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  const body: HealthResponse = { status: "ok", language: "typescript" };
  res.json(body);
});

export default router;
