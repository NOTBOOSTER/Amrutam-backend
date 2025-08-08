import paymentDb from "../database/models/payment.model.js";

const getPaymentsHistory = async (skipto) => {
  const data = await paymentDb.aggregate([
    {
      $sort: { date: 1 },
    },
    {
      $match: {
        status: { $ne: "pending" },
      },
    },
    {
        $skip: parseInt(skipto)
    },
    {
        $limit: 7
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctrId",
        foreignField: "_id",
        as: "doctorInfo",
      },
    },
    {
      $unwind: "$doctorInfo",
    },
    {
      $project: {
        _id: 1,
        doctorName: "$doctorInfo.name",
        email: "$doctorInfo.email",
        walletAmount: "$doctorInfo.wallet",
        mobile: "$doctorInfo.mobile",
        image: "$doctorInfo.image",
        amount: 1,
        status: 1,
        date: 1,
      },
    },
  ]);
  return data;
};

const getPendingPayments = async (skipto) => {
  const data = await paymentDb.aggregate([
    {
      $sort: { date: 1 },
    },
    {
      $match: {
        status: "pending",
      },
    },
    {
        $skip: parseInt(skipto)
    },
    {
        $limit: 7
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctrId",
        foreignField: "_id",
        as: "doctorInfo",
      },
    },
    {
      $unwind: "$doctorInfo",
    },
    {
      $project: {
        _id: 1,
        doctorName: "$doctorInfo.name",
        email: "$doctorInfo.email",
        walletAmount: "$doctorInfo.wallet",
        mobile: "$doctorInfo.mobile",
        image: "$doctorInfo.image",
        amount: 1,
        status: 1,
        date: 1,
      },
    },
  ]);
  return data;
};

export { getPaymentsHistory, getPendingPayments };
