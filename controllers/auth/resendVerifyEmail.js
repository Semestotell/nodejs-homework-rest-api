const { createError } = require("../../helpers");
const { User, schemas } = require("../../models/user");
const { sendEmail } = require("../../email");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target='_blank' href='http://localhost:3000/api/auth/verify/${verificationToken}'>Confirm email</a>`,
  };

  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
