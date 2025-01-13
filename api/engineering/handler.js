module.exports = {
  index: async (req, res, next) => {
    return res
      .status(200)
      .json({ message: "You can access Engineering resource" });
  },
};
