const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    logoUrl: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    district: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        type: String
    },
    redInvoice: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        district: {
            type: String
        },
        city: {
            type: String
        },
        taxCode: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
