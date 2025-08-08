import statsDb from "../database/models/stats.model.js";
import salesDb from "../database/models/sales.model.js";

const getStats = async (period) => {
  const now = new Date();
  let dateFrom, dateto;

  if (period === "today") {
    const today = now.toISOString().split("T")[0];
    dateFrom = `${today}T00:00:00.000Z`;
    dateto = `${today}T23:59:59.999Z`;
  } else if (period === "week") {
    dateto = now.toISOString();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    dateFrom = weekAgo.toISOString();
  } else if (period === "month") {
    dateto = now.toISOString();
    const monthAgo = new Date(now);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    dateFrom = monthAgo.toISOString();
  } else {
    throw new Error("Invalid period");
  }

  const stats = await getTotalStats(dateFrom, dateto);
  const topAffiliates = await getTopAffiliates(dateFrom, dateto);
  return [stats, topAffiliates];
};

const getTopAffiliates = async (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const diffMs = toDate.getTime() - fromDate.getTime();
  const prevToDate = new Date(fromDate.getTime() - 1);
  const prevFromDate = new Date(fromDate.getTime() - diffMs);

  const currentData = await salesDb.aggregate([
    {
      $match: {
        date: { $gte: fromDate, $lte: toDate },
      },
    },
    {
      $group: {
        _id: "$doctorId",
        totalRevenue: { $sum: "$amount" },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "doctors",
        localField: "_id",
        foreignField: "_id",
        as: "doctorInfo",
      },
    },
    { $unwind: "$doctorInfo" },
    {
      $project: {
        doctorId: "$_id",
        name: "$doctorInfo.name",
        specialization: "$doctorInfo.specialization",
        image: "$doctorInfo.image",
        totalRevenue: 1,
      },
    },
  ]);

  const topDoctorIds = currentData.map((d) => d.doctorId);

  const previousData = await salesDb.aggregate([
    {
      $match: {
        date: { $gte: prevFromDate, $lte: prevToDate },
        doctorId: { $in: topDoctorIds },
      },
    },
    {
      $group: {
        _id: "$doctorId",
        totalRevenue: { $sum: "$amount" },
      },
    },
  ]);

  const previousMap = {};
  for (const doc of previousData) {
    previousMap[doc._id.toString()] = doc.totalRevenue;
  }

  const topDoctors = currentData.map((doc) => {
    const prevRevenue = previousMap[doc.doctorId.toString()] || 0;
    const percentChange =
      prevRevenue === 0
        ? 0
        : Number(
            (((doc.totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(2)
          );
    return {
      ...doc,
      percentChange,
    };
  });

  const topProducts = await salesDb.aggregate([
    {
      $match: {
        date: { $gte: fromDate, $lte: toDate },
      },
    },
    {
      $group: {
        _id: "$productId",
        totalRevenue: { $sum: "$amount" },
        totalQuantitySold: { $sum: "$quantity" },
      },
    },
    { $sort: { totalRevenue: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    { $unwind: "$productInfo" },
    {
      $project: {
        productId: "$_id",
        name: "$productInfo.name",
        image: "$productInfo.image",
        totalRevenue: 1,
        totalQuantitySold: 1,
      },
    },
  ]);

  return { topDoctors, topProducts };
};

const getTotalStats = async (from, to) => {
  const stats = await statsDb.aggregate([
    {
      $match: {
        day: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCouponsClicks: { $sum: "$couponsclicks" },
        totalOrders: { $sum: "$orders" },
        totalRevenue: { $sum: "$revenue" },
        averageDoctors: { $avg: "$doctors" },
      },
    },
    {
      $project: {
        _id: 0,
        totalCouponsClicks: 1,
        totalOrders: 1,
        totalRevenue: 1,
        averageDoctors: { $round: ["$averageDoctors", 0] },
      },
    },
  ]);

  return (
    stats[0] || {
      totalCouponsClicks: 0,
      totalOrders: 0,
      totalRevenue: 0,
      averageDoctors: 0,
    }
  );
};

export { getStats };
