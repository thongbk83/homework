import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { connect } from "react-redux";
import { updateProfile } from "../../actions/profile";

import "./EditProfile.css";
import UploadImageProfile from "./UploadImageProfile";
import { IStore } from "../../interfaces/Store";
import setAlert from "../../utils/setAlert";

type Props = {
    storeInformation?: IStore;
    profile: any;
    onClose: () => void;
    updateProfile: (formData: any) => void;
};

const phone_regex = /((09|03|07|08|05)+([0-9]{8})\b)/;

export const EditProfile: React.FC<Props> = props => {
    const { storeInformation, profile, onClose, updateProfile } = props;
    const cities = [
        {
            name: "Ho Chi Minh",
            districts: ["district 1", "district 2", "district 3"]
        },
        { name: "Ha Noi", districts: ["Cau Giay", "Dong Da", "Long Bien"] }
    ];

    const [districts, setDistricts] = useState([
        "district 1",
        "district 2",
        "district 3"
    ]);
    const [invoiceDistricts, setInvoiceDistricts] = useState([
        "district 1",
        "district 2",
        "district 3"
    ]);

    //use to keep status profile is updating or not
    const [isUpdating, setIsUpdating] = useState(false);

    const [formData, setFormData] = useState({
        logoUrl: "",
        name: "",
        address: "",
        district: "district 1",
        city: "Ho Chi Minh",
        phone: "",
        invoiceName: "",
        invoiceAddress: "",
        invoiceDistrict: "district 1",
        invoiceCity: "Ho Chi Minh",
        invoiceTaxCode: ""
    });

    useEffect(() => {
        if (storeInformation && !isUpdating) {
            // handle case reload list districts with city
            const selectedCity = cities.find(
                city =>
                    city.name ===
                    (!storeInformation.city
                        ? "Ho Chi Minh"
                        : storeInformation.city)
            );

            if (selectedCity) {
                setDistricts(selectedCity.districts);
            }

            // handle case reload list districts with invoiceCity
            const selectedInvoiceCity = cities.find(
                city =>
                    city.name ===
                    (!storeInformation.redInvoice
                        ? "Ho Chi Minh"
                        : storeInformation.redInvoice.city)
            );

            if (selectedInvoiceCity) {
                setInvoiceDistricts(selectedInvoiceCity.districts);
            }

            setFormData({
                logoUrl: !storeInformation.logoUrl
                    ? ""
                    : storeInformation.logoUrl,
                name: !storeInformation.name ? "" : storeInformation.name,
                address: !storeInformation.address
                    ? ""
                    : storeInformation.address,
                district: !storeInformation.district
                    ? "district 1"
                    : storeInformation.district,
                city: !storeInformation.city
                    ? "Ho Chi Minh"
                    : storeInformation.city,
                phone: !storeInformation.phone ? "" : storeInformation.phone,
                invoiceName: !storeInformation.redInvoice
                    ? ""
                    : storeInformation.redInvoice.name,
                invoiceAddress: !storeInformation.redInvoice
                    ? ""
                    : storeInformation.redInvoice.address,
                invoiceDistrict: !storeInformation.redInvoice
                    ? "district 1"
                    : storeInformation.redInvoice.district,
                invoiceCity: !storeInformation.redInvoice
                    ? "Ho Chi Minh"
                    : storeInformation.redInvoice.city,
                invoiceTaxCode: !storeInformation.redInvoice
                    ? ""
                    : storeInformation.redInvoice.taxCode
            });
        }

        // if profile is updating and no error , close dialog
        if (isUpdating && Object.keys(profile.error).length === 0) {
            setIsUpdating(false);
            onClose();
        }
    }, [props, profile]);

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
    } = formData;

    const onChange = (e: any) => {
        // handle case dictrict change by city for profile infor
        if (e.target.name === "city") {
            const selectedCity = cities.find(
                city => city.name === e.target.value
            );

            if (selectedCity) {
                setDistricts(selectedCity.districts);
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    district: selectedCity.districts[0]
                });
            }
        } else if (e.target.name === "invoiceCity") {
            // handle case dictrict change by city for redInvoice infor
            const selectedCity = cities.find(
                city => city.name === e.target.value
            );

            if (selectedCity) {
                setInvoiceDistricts(selectedCity.districts);
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    invoiceDistrict: selectedCity.districts[0]
                });
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const onImageChangeHandler = (imageUrl: string) => {
        setFormData({ ...formData, logoUrl: imageUrl });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(191, storeInformation);
        if (!phone_regex.test(phone)) {
            setAlert("phone invalid", "error");
            return;
        }

        setIsUpdating(true);
        updateProfile(formData);
    };

    return (
        <Grid id="editStoreProfileDialog" item xs={10}>
            <h4 style={{ textAlign: "left" }}>
                <CreateOutlinedIcon color="primary" />
                EDIT STORE PROFILE
            </h4>

            <Divider />
            <Grid container spacing={10}>
                <Grid item xs={3}>
                    <UploadImageProfile
                        logoUrl={logoUrl}
                        onImageChange={(e: any) => onImageChangeHandler(e)}
                    ></UploadImageProfile>
                </Grid>
                <Grid item xs={9}>
                    <form
                        id="editProfileForm"
                        className="root"
                        autoComplete="off"
                        onSubmit={e => onSubmit(e)}
                    >
                        <h5>BASIC INFO</h5>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl className="formControl">
                                    <InputLabel shrink htmlFor="store-name">
                                        Store Name
                                    </InputLabel>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Store Name"
                                        value={name}
                                        onChange={(e: any) => onChange(e)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction={"row"}
                            alignContent={"flex-start"}
                        >
                            <Grid item xs={4}>
                                <FormControl className="formControl">
                                    <InputLabel shrink htmlFor="store-address">
                                        Store Address
                                    </InputLabel>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e: any) => onChange(e)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl className="formControl">
                                    <InputLabel shrink htmlFor="store-district">
                                        District
                                    </InputLabel>
                                    <Select
                                        value={district}
                                        onChange={(e: any) => onChange(e)}
                                        inputProps={{
                                            name: "district",
                                            id: "district-select"
                                        }}
                                    >
                                        {districts.map((district, i) => {
                                            return (
                                                <MenuItem
                                                    value={district}
                                                    key={district}
                                                >
                                                    {district}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className="formControl">
                                    <InputLabel shrink htmlFor="store-city">
                                        City
                                    </InputLabel>
                                    <Select
                                        value={city}
                                        inputProps={{
                                            name: "city",
                                            id: "city-select"
                                        }}
                                        onChange={(e: any) => onChange(e)}
                                    >
                                        {cities.map((city, i) => {
                                            return (
                                                <MenuItem
                                                    value={city.name}
                                                    key={city.name}
                                                >
                                                    {city.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl className="formControl">
                            <InputLabel shrink htmlFor="phone">
                                Phone
                            </InputLabel>
                            <Input
                                id="phone"
                                name="phone"
                                value={phone}
                                placeholder="0982341222"
                                onChange={(e: any) => onChange(e)}
                            />
                        </FormControl>

                        <h5>RED INVOICE INFO</h5>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl className="formControl">
                                    <InputLabel shrink htmlFor="company-name">
                                        Company Name
                                    </InputLabel>
                                    <Input
                                        id="invoiceName"
                                        name="invoiceName"
                                        placeholder="Company Name"
                                        value={invoiceName}
                                        onChange={(e: any) => onChange(e)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction={"row"}
                            alignContent={"flex-start"}
                        >
                            <Grid item xs={4}>
                                <FormControl className="formControl">
                                    <InputLabel
                                        shrink
                                        htmlFor="company-address"
                                    >
                                        Company Address
                                    </InputLabel>
                                    <Input
                                        id="company-address"
                                        name="invoiceAddress"
                                        placeholder="Address"
                                        value={invoiceAddress}
                                        onChange={(e: any) => onChange(e)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl className="formControl">
                                    <InputLabel
                                        shrink
                                        htmlFor="company-district"
                                    >
                                        District
                                    </InputLabel>
                                    <Select
                                        value={invoiceDistrict}
                                        onChange={(e: any) => onChange(e)}
                                        inputProps={{
                                            name: "invoiceDistrict",
                                            id: "invoiceDistrict-select"
                                        }}
                                    >
                                        {invoiceDistricts.map((district, i) => {
                                            return (
                                                <MenuItem
                                                    value={district}
                                                    key={`invoice + ${district}`}
                                                >
                                                    {district}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl className="formControl">
                                    <InputLabel shrink htmlFor="company-city">
                                        City
                                    </InputLabel>
                                    <Select
                                        value={invoiceCity}
                                        name="invoiceCity"
                                        onChange={(e: any) => onChange(e)}
                                        inputProps={{
                                            name: "invoiceCity",
                                            id: "invoiceCity-select"
                                        }}
                                    >
                                        {cities.map((city, i) => {
                                            return (
                                                <MenuItem
                                                    value={city.name}
                                                    key={`invoice + ${city.name}`}
                                                >
                                                    {city.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl className="formControl">
                            <InputLabel shrink htmlFor="mst">
                                MST
                            </InputLabel>
                            <Input
                                value={invoiceTaxCode}
                                id="mst"
                                name="invoiceTaxCode"
                                placeholder="PN0121209122"
                                onChange={(e: any) => onChange(e)}
                            />
                        </FormControl>
                        <Grid container direction={"column"}>
                            <Grid item xs={10}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    id="saveBtn"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={10}>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};
const mapStateToProps = (state: any) => ({
    profile: state.profile
});
export default connect(
    mapStateToProps,
    { updateProfile }
)(EditProfile);
