const express = require("express");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const cloudinary = require("cloudinary");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");

//config cloudianary
cloudinary.config({
    cloud_name: config.get("CLOUD_NAME"),
    api_key: config.get("INARY_API_KEY"),
    api_secret: config.get("INARY_API_SECRET")
});

// @route    GET api/profile/me
// @desc     Get current profile
// @access   Private
router.get("/me", auth.isAuthorized, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            "user",
            ["name"]
        );

        if (!profile) {
            return res
                .status(400)
                .json({ msg: "There is no profile for this user" });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
    "/",
    [
        auth.isAuthorized,
        [
            check("name", "profile name is required")
                .not()
                .isEmpty(),
            check("invoiceName", "Red invoce name is required")
                .not()
                .isEmpty(),
            check("name", "profile name is required").custom(
                (value, { req, loc, path }) => {
                    if (value !== req.body.invoiceName) {
                        throw new Error("name and invoiceName don't match");
                    } else {
                        return value;
                    }
                }
            )
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            logoUrl,
            name,
            address,
            district,
            city,
            phone,
            invoiceName,
            invoiceAddress,
            invoiceDistrict,
            invoiceCity,
            invoiceTaxCode
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (logoUrl || logoUrl === "") profileFields.logoUrl = logoUrl;
        if (name) profileFields.name = name;
        if (address) profileFields.address = address;
        if (district) profileFields.district = district;
        if (city) profileFields.city = city;
        if (phone) profileFields.phone = phone;

        // Build red invoce object
        profileFields.redInvoice = {};
        if (invoiceName) profileFields.redInvoice.name = invoiceName;
        if (invoiceAddress) profileFields.redInvoice.address = invoiceAddress;
        if (invoiceDistrict)
            profileFields.redInvoice.district = invoiceDistrict;
        if (invoiceCity) profileFields.redInvoice.city = invoiceCity;
        if (invoiceTaxCode) profileFields.redInvoice.taxCode = invoiceTaxCode;

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
            ).populate("user", ["name"]);
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route    Post api/profile/image-upload
// @desc     upload image to Cloudinary
// @access   Public
router.post("/image-upload", auth.isAuthorized, async (req, res) => {
    const files = Object.values(req.files);
    const image = files[0];

    try {
        const response = await cloudinary.uploader.upload(image.path);

        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
