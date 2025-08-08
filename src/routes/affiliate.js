import express from "express";
import { getStats } from "../handlers/statsHandlers.js";
import { getSpecialCommission, setCommission } from "../handlers/commissionHandlers.js";
import { getDoctorsAndProducts } from "../handlers/dataHendlers.js";
import { getSpecialCoupons, setSpecialCoupon } from "../handlers/couponsHandlers.js";
import { getPaymentsHistory, getPendingPayments } from "../handlers/paymentHandlers.js";

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.ip);
  res.send("Affiliate");
});

router.post("/dashboard/stats", async (req, res) => {
  const period = req.body.period;
  const data = await getStats(period);
  res.send(data);
});

// commissions

router.post("/commission/specialcommissions", async (req, res) => {
  const skipto = req.body.skipto;
  const data = await getSpecialCommission(skipto);
  res.send(data);
});

router.post("/commission/specialcommissions/create", async (req, res) => {
  const data = await setCommission(req.body);
  res.send(data);
});

// coupons

router.post("/coupons/specialcoupons", async (req, res) => {
  const skipto = req.body.skipto;
  const data = await getSpecialCoupons(skipto);
  res.send(data);
});

router.post("/coupons/specialcoupons/create", async (req, res) => {
  const data = await setSpecialCoupon(req.body);
  res.send(data);
});

//payments

router.post("/payments/pending", async (req, res) => {
  const data = await getPendingPayments(req.body.skipto);
  res.send(data);
});

router.post("/payments/history", async (req, res) => {
  const data = await getPaymentsHistory(req.body.skipto);
  res.send(data);
});


router.post("/doctorsandproducts", async (req, res) => {
  const data = await getDoctorsAndProducts();
  res.send(data);
});


export default router;
