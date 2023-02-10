const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require("uuid");

const { sendEmail } = require("../../email");
const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const register = async (req, res) => {

  const verificationToken = uuid();

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `${email} in use`);
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target='_blank' href='http://localhost:3000/api/auth/verify/${verificationToken}'>Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = register;
