export const getWeather = async (req, res) => {
  res.status(200).json({
    message: "weather success",
  });
};
