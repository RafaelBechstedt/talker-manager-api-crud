const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailValidation = emailRegex.test(email);

  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

module.exports = validateLogin;