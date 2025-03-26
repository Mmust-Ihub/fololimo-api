export const createActivity = async (req, res) => {
  const { name, duration, startDate } = req.body;
  res.status(201).json({ name, duration, startDate });
};

export const getActivities = async (req, res) => {
  res.status(200).json([]);
};
export const getActivity = async (req, res) => {
  res.status(200).json({});
};
export const updateActivity = async (req, res) => {
  res.status(200).json([]);
};
