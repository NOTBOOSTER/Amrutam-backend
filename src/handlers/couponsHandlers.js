import specialCouponDb from "../database/models/specialCoupons.model.js";

const getSpecialCoupons = async (skipto) => {
  const specialcoupon = await specialCouponDb.aggregate([
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
        limit: 1,
        percentage: 1,
        doctorName: "$doctorInfo.name",
        doctorImage: "$doctorInfo.image",
        productName: "$productInfo.name",
      },
    },
  ]);
  const data = specialcoupon.map((coupon) => coupon);
  return data;
};

const setSpecialCoupon = async (coupon) => {
  const data = await specialCouponDb.create(coupon);
  return data;
};

export { getSpecialCoupons, setSpecialCoupon };