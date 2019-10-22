import React from "react";
import { shallow, mount } from "enzyme";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { EditProfile } from "../profile-form/EditProfile";

describe("Edit Profile", () => {
    it("call updateProfile when click on submit button", () => {
        const updateProfileMock = jest.fn();
        const onCloseMock = jest.fn();
        const propsMock: any = {
            storeInformation: {
                logoUrl: "image.jpg",
                name: "store1",
                address: "Nguyen Xi",
                district: "district 1",
                city: "Ho Chi Minh",
                phone: "0982341227",
                redInvoice: {
                    name: "store1",
                    address: "nguyenxi",
                    district: "district 1",
                    city: "Ho Chi Minh",
                    taxCode: "1111"
                }
            },
            profile: {
                profile: { id: 123, logoUrl: "image.jpg", redInvoice: {} },
                loading: false
            },
            onClose: onCloseMock,
            updateProfile: updateProfileMock
        };

        const wrapper = mount(<EditProfile {...propsMock} />);

        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        expect(updateProfileMock).toHaveBeenCalled();
    });

    it("fail with invalid phone number when click on submit button", () => {
        const updateProfileMock = jest.fn();
        const onCloseMock = jest.fn();
        const propsMock: any = {
            storeInformation: {
                logoUrl: "image.jpg",
                name: "store1",
                address: "Nguyen Xi",
                district: "district 1",
                city: "Ho Chi Minh",
                phone: "098234122a",
                redInvoice: {
                    name: "store1",
                    address: "nguyenxi",
                    district: "district 1",
                    city: "Ho Chi Minh",
                    taxCode: "1111"
                }
            },
            profile: {
                profile: { id: 123, logoUrl: "image.jpg", redInvoice: {} },
                loading: false
            },
            onClose: onCloseMock,
            updateProfile: updateProfileMock
        };

        const wrapper = mount(<EditProfile {...propsMock} />);

        wrapper.find("form").simulate("submit", { preventDefault: () => {} });
        expect(updateProfileMock).toHaveBeenCalledTimes(0);
    });
});
