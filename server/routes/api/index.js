const router = require("express").Router();

const userRoutes = require("./user-routes");
const sessionsRoutes = require("./sessions-routes");

router.use("/user", userRoutes);
router.use("/sessions", sessionsRoutes);

module.exports = router;
