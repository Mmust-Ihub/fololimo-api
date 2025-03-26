export const getAgrovets = async (req, res) => {
  if (req.query) {
    if (req.query.location) {
      res.status(200).json({
        location:req.query.location,
        agrovets: [],
      });
      return;
    }
    if (req.query.agrovet) {
      res.status(200).json({ agrovet: req.query.agrovet });
      return;
    }
  }
  res.status(200).json([]);
};

export const notifyAgrovet = async (req, res) => {
  console.log("argrovet:", req.body);
  res.status(200).json({
    message: "agrovet notified successfully",
  });
};
