const express = require("express");
const { auth, upload } = require("../../middlewares");
const { validationBody } = require("../../middlewares/validationBody");
const { registerSchema, loginSchema } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.post("/register",validationBody(registerSchema), ctrlWrapper(ctrl.register));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.resendVerifyEmail));
router.post("/login",validationBody(loginSchema),ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.setAvatar));

module.exports = router;