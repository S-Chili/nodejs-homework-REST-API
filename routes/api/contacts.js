const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody} = require("../../middlewares");

const {validateFavorite} = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema, 'POST'), ctrlWrapper(ctrl.add));

router.put("/:id", validateBody(schemas.addSchema, 'PUT'), ctrlWrapper(ctrl.updateContacts));

router.patch("/:id/favorite", validateFavorite(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", ctrlWrapper(ctrl.removeContacts));

module.exports = router;