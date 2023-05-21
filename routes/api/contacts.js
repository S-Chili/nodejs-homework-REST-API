const express = require("express");

const ctrl = require("../../controllers/contacts");

const {validateBody, authenticate} = require("../../middlewares");

const {validateFavorite} = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateBody(schemas.addSchema, 'POST'), ctrlWrapper(ctrl.add));

router.put("/:id", authenticate, validateBody(schemas.addSchema, 'PUT'), ctrlWrapper(ctrl.updateContacts));

router.patch("/:id/favorite", authenticate, validateFavorite(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", authenticate, ctrlWrapper(ctrl.removeContacts));

module.exports = router;