import Business from "@material-ui/icons/Business";
import Dashboard from "@material-ui/icons/Dashboard";
import Description from "@material-ui/icons/Description";
import { Divider } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Notes from "@material-ui/icons/Notes";
import People from "@material-ui/icons/People";
import React from "react";
import Restaurant from "@material-ui/icons/Restaurant";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import Store from "@material-ui/icons/Store";
import KaremeoLogo from "../../images/kamereo.png";

const SideBar: React.FC = () => {
    return (
        <>
            <Grid container alignItems={"center"} spacing={8}>
                <Grid item xs={4}>
                    <img
                        alt="Kamereo"
                        src={KaremeoLogo}
                        width={"80px"}
                        height={"80px"}
                    />
                </Grid>
                <Grid item xs={8}>
                    <span>
                        <b>KAMEREO</b>
                    </span>
                </Grid>
            </Grid>
            <Divider />
            <ListItem button>
                <ListItemIcon>
                    <Favorite style={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="FAVORITE ITEMS" />
            </ListItem>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText>
                        <b>Dashboard</b>
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Description />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ShoppingBasket />
                    </ListItemIcon>
                    <ListItemText primary="Supplier List" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Notes />
                    </ListItemIcon>
                    <ListItemText primary="Statistic" />
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemText>
                        <b>Market Place</b>
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Store />
                    </ListItemIcon>
                    <ListItemText primary="Market" />
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <ListItemText>
                        <b>General Settings</b>
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Business />
                    </ListItemIcon>
                    <ListItemText primary="Company info" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Restaurant />
                    </ListItemIcon>
                    <ListItemText primary="Store info" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="User Management" />
                </ListItem>
            </List>
        </>
    );
};

export default SideBar;
