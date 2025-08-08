import specialCommissionDb from "../database/models/specialCommission.model.js";

const getSpecialCommission = async (skipto) => {
  const specialcommission = await specialCommissionDb.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $skip: parseInt(skipto),
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctorId",
        foreignField: "_id",
        as: "doctorInfo",
      },
    },
    {
      $unwind: "$productInfo",
    },
    {
      $unwind: "$doctorInfo",
    },
    {
      $project: {
        _id: 0,
        productCommission: 1,
        doctorCommission: 1,
        doctorName: "$doctorInfo.name",
        doctorImage: "$doctorInfo.image",
        productName: "$productInfo.name",
      },
    },
  ]);
  const data = specialcommission.map((commission) => commission);
  return data;
};


const setCommission = async (commission) => {
  const data = await specialCommissionDb.create(commission);
  return data;
};

export { getSpecialCommission, setCommission };
