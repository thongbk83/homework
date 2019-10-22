import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import Spinner from "../layout/Spinner";

import kameoreo from "../../images/kamereo.png";
import "./upload.css";

const UploadImageProfile = (props?: any) => {
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState({
        loading: true,
        uploading: false
    });

    const { loading, uploading } = status;

    useEffect(() => {
        if (props.logoUrl) {
            setImageUrl(props.logoUrl);
        }

        setStatus({ ...status, loading: false });
    }, [loading, props]);

    const removeImage = () => {
        setImageUrl("");
        props.onImageChange("");
    };

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const handleImageChange = async (e: any) => {
        const errs = [];
        const files: File[] = Array.from(e.target.files);

        const formData = new FormData();
        const types = ["image/png", "image/jpeg", "image/gif"];

        const file: File = files[0];

        if (types.every(type => file.type !== type)) {
            errs.push(`'${file.type}' is not a supported format`);
        }

        if (file.size > 150000) {
            errs.push(
                `'${file.name}' is too large, please pick a smaller file`
            );
        }

        formData.append("0", file);

        if (errs.length) {
            return errs.forEach(err => {
                props.setAlert(err, "danger");
                console.log(err);
            });
        }

        setStatus({ ...status, uploading: true });

        try {
            const res = await axios.post(
                "/api/profile/image-upload",
                formData,
                config
            );

            if (res.status !== 200) throw res;

            setStatus({ ...status, uploading: false });
            setImageUrl(res.data.secure_url);
            props.onImageChange(res.data.secure_url);
        } catch (error) {
            error.json().then((e: any) => {
                setStatus({ ...status, uploading: false });
            });
        }
    };

    const content = () => {
        switch (true) {
            case loading:
            case uploading:
                return <Spinner />;
            default:
                return (
                    <>
                        <h5>STORE IMAGE</h5>
                        <Card>
                            <img
                                alt="Store"
                                src={imageUrl || kameoreo}
                                className="image"
                                style={{ width: 200 }}
                            />
                            <div>
                                <Button
                                    disabled={!imageUrl}
                                    onClick={removeImage}
                                >
                                    Remove
                                </Button>

                                <label
                                    htmlFor="file-upload"
                                    className="custom-file-upload"
                                >
                                    <i className="fa fa-cloud-upload"></i>{" "}
                                    Upload
                                </label>
                                <input
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="file-upload"
                                    type="file"
                                />
                            </div>
                        </Card>
                    </>
                );
        }
    };

    return <div>{content()}</div>;
};

export default UploadImageProfile;
