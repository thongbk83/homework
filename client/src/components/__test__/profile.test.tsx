import React from "react";
import { shallow, mount } from "enzyme";
import { Profile } from "../profile/Profile";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import EditProfile from "../profile-form/EditProfile";

it("Profile page has valid children with Profile", () => {
    const propsMock: any = {
        getCurrentProfile: jest.fn(),
        profile: {
            profile: { id: 123, logoUrl: "image.jpg", redInvoice: {} },
            loading: false
        }
    };

    const wrapper = shallow(<Profile {...propsMock} />);

    expect(wrapper.find(Button).find('[name="Edit"]').length).toEqual(1);
    expect(wrapper.find(Button).find('[name="Create"]').length).toEqual(0);
    expect(wrapper.find('img[src="image.jpg"]').length).toEqual(1);
    expect(wrapper.find(Dialog).find("[open=false]").length).toEqual(1);
    expect(wrapper.find(EditProfile).length).toEqual(1);

    // click on edit button to open edit profile dialog
    wrapper
        .find(Button)
        .find('[name="Edit"]')
        .simulate("click");
    expect(wrapper.find(Dialog).find("[open=false]").length).toEqual(0);
    expect(wrapper.find(Dialog).find("[open=true]").length).toEqual(1);
});

it("Profile page has valid children with null Profile", () => {
    const propsMock: any = {
        getCurrentProfile: jest.fn(),
        profile: { profile: null, loading: false }
    };

    const wrapper = shallow(<Profile {...propsMock} />);
    expect(wrapper.find(Button).find('[name="Edit"]').length).toEqual(0);
    expect(wrapper.find(Button).find('[name="Create"]').length).toEqual(1);
    expect(wrapper.find(Dialog).find("[open=false]").length).toEqual(1);

    // click on create button to open create profile dialog
    wrapper
        .find(Button)
        .find('[name="Create"]')
        .simulate("click");
    expect(wrapper.find(Dialog).find("[open=false]").length).toEqual(0);
    expect(wrapper.find(Dialog).find("[open=true]").length).toEqual(1);
});
