import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import {
  createCat,
  deleteCat,
  readAllCat,
  readCat,
  updateCat,
  updatePartialCat,
} from "./cats.service";

const router = Router();
// Read 고양이 전체 데이터 조회
router.get("/cats", readAllCat);

// Read 특정 고양이 데이터 조회
router.get("/cats/:id", readCat);

// Create 새로운 고양이 추가 API
router.post("/cats", createCat);

// Update 고양이 데이터 업데이트-> Put
router.put("/cats/:id", updatePartialCat);
// Update 고양이 데이터 부분적으로 업데이트 -> Patch

router.patch("/cats/:id", updateCat);
// Delete 고양이 데이터 삭제
router.delete("/cats/:id", deleteCat);

export default router;
