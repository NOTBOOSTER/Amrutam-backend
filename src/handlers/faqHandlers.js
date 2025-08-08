import faqDb from "../database/models/faq.model.js";

const getFaqs = async (skipto, userType, category) => {
  const faqs = await faqDb.aggregate([
  {
    $match: {
      userType,
      category
    }
  },
  {
    $addFields: {
      sortPriority: {
        $cond: {
          if: {
            $and: [
              { $gte: ["$order", 1] },
              { $lte: ["$order", 7] }
            ]
          },
          then: "$order", 
          else: 8 
        }
      }
    }
  },
  {
    $sort: {
      sortPriority: 1,
      order: 1
    }
  },
  {
    $project: {
      sortPriority: 0
    }
  },
  { $skip: parseInt(skipto) },
  { $limit: 7 }
]);
  return faqs;
};

const newFaq = async (faq) => {
  if (faq.homepage) {
    await faqDb.findOneAndUpdate({ category: faq.category, userType: faq.userType, order: faq.order }, {order: 0 }); 
  }
  const newfaq = await faqDb.create({category: faq.category, userType: faq.userType, question: faq.question, answer: faq.answer, order: faq.order});
  return newfaq;
};

export { getFaqs, newFaq };
