import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import EditProfile from "../profile-form/EditProfile";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import kamereoImage from "../../images/kamereo.png";

export const Profile: React.FC = ({
    getCurrentProfile,
    profile: { profile, loading }
}: any) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const [openEditProfile, setOpenEditProfile] = React.useState(false);

    const handleClickOpen = () => {
        setOpenEditProfile(true);
    };

    const handleClose = () => {
        setOpenEditProfile(false);
    };

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <>
            <h4 style={{ textAlign: "left" }}>Store Information</h4>
            <Grid container justify="center">
                <Grid item xs={4}>
                    {/* <Paper className={classes.paper}> */}
                    <Paper>
                        {profile !== null ? (
                            <Fragment>
                                <img
                                    alt="Store"
                                    src={profile.logoUrl || kamereoImage}
                                    width="80%"
                                    height="auto"
                                />
                                <div style={{ marginBottom: "20px" }}>
                                    <Grid container>
                                        <strong>STORE INFO</strong>
                                        <br />
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <span>Name:</span>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <span id="storeName">
                                                    {profile.name}
                                                </span>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <span>Address:</span>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <span>{`${profile.address} ${profile.district},${profile.city}`}</span>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <span>Phone#:</span>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <span id="storePhone">
                                                    {profile.phone}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container>
                                        <strong>RED INVOICE</strong>
                                        <br />
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <span>name</span>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <span id="storeRedInvoiceName">
                                                    {profile.redInvoice.name}
                                                </span>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <span>Address:</span>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <span>
                                                    {`${profile.redInvoice.address} ${profile.redInvoice.district},${profile.redInvoice.city}`}
                                                </span>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <span>MST:</span>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <span>
                                                    {profile.redInvoice.taxCode}
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Button
                                    onClick={handleClickOpen}
                                    fullWidth
                                    id="editButton"
                                    name="Edit"
                                >
                                    Edit
                                </Button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p id="noProfile">
                                    You have not yet setup a profile, please add
                                    some info
                                </p>
                                <Button
                                    onClick={handleClickOpen}
                                    fullWidth
                                    name="Create"
                                    id="createButton"
                                >
                                    Create Profile
                                </Button>
                            </Fragment>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Dialog
                open={openEditProfile}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="lg"
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    <EditProfile
                        storeInformation={profile}
                        onClose={handleClose}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(Profile);
