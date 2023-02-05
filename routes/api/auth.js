const express = require("express");
const { auth } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.post("/register", ctrlWrapper(ctrl.register));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
