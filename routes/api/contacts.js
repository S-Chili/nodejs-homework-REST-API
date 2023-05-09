const express = require("express");

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema, 'POST'), ctrlWrapper(ctrl.add));

router.put("/:id", validateBody(schemas.addSchema, 'PUT'), ctrlWrapper(ctrl.updateContacts));

router.delete("/:id", ctrlWrapper(ctrl.removeContacts));

module.exports = router;