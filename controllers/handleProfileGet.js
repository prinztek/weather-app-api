const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db("users")
    .select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("invalid id");
      }
    })
    .catch((err) => res.status(404).json("error getting user"));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
