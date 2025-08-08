import doctorDb from "../database/models/doctor.model.js";
import productDb from "../database/models/product.model.js";

const getDoctorsAndProducts = async () => {
  const doctors = await doctorDb.find().sort({ _id: -1 });
  const products = await productDb.find().sort({ _id: -1 });
  return {doctors, products};
};

export { getDoctorsAndProducts };