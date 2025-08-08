import express from "express";
import { getFaqs, newFaq } from "../handlers/faqHandlers.js";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("customization");
});

// faq

router.post("/faqs", async (req, res) => {
  const skipto = req.body.skipto;
  const userType = req.body.userType;
  const category = req.body.category;
  const data = await getFaqs(skipto, userType, category);
  res.send(data);
});

router.post("/faqs/create", async (req, res) => {
  const faq = req.body.data;
  const data = await newFaq(faq);
  res.send(data);
});

export default router;
