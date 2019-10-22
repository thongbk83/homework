import { Selector } from "testcafe";
import { ClientFunction } from "testcafe";

fixture("Test").page("http://localhost:3000");
const getLocation = ClientFunction(() => document.location.href);

test("The testing environment works", async t => {
    const formEl = await Selector("form");
    await t.expect(formEl.exists).ok();

    const inputEmail = await formEl.find("#testEmail");
    await t.typeText(inputEmail, "thongbk83@yahoo.com");

    const inputPassword = await formEl.find("#password");
    await t.typeText(inputPassword, "123456");

    // Submit the form
    const submitBtn = await formEl.find("#submitBtn");

    // return
    await t
        .click(submitBtn)
        .wait(2000)
        .expect(getLocation())
        .match(/.*\/*/); // valiadte

    var title = await Selector("h4");
    await t.expect(title.innerText).eql("Store Information");

    var editButton = Selector("#editButton");
    await t.click(editButton).wait(500);

    // click on edit button , the edit dialog will show up
    var dialog = Selector("#editStoreProfileDialog");
    await t.expect(dialog.exists).ok();

    const inputName = await Selector("#name");
    await t
        .selectText(inputName)
        .pressKey("delete")
        .typeText(inputName, "storeEdit1");

    const inputInvoiceName = await Selector("#invoiceName");
    await t.typeText(inputInvoiceName, "storeEdit2");

    const savebtn = await Selector("#saveBtn");
    await t.click(savebtn).wait(1000);

    const toastEl = await Selector(".Toastify").child("div");
    await t.expect(toastEl.exists).ok();

    const phone = await Selector("#phone");
    await t
        .selectText(phone)
        .pressKey("delete")
        .typeText(phone, "09823411");

    await t.click(savebtn).wait(1000);

    await t.expect(toastEl.exists).ok();

    await t
        .selectText(phone)
        .pressKey("delete")
        .typeText(phone, "0982341111");

    await t
        .selectText(inputName)
        .pressKey("delete")
        .typeText(inputName, "newStoreName");

    await t
        .selectText(inputInvoiceName)
        .pressKey("delete")
        .typeText(inputInvoiceName, "newStoreName");

    await t.click(savebtn).wait(500);

    await t.expect(dialog.exists).notOk();

    const storeName = await Selector("#storeName");
    await t.expect(storeName.innerText).eql("newStoreName");

    const storePhone = await Selector("#storePhone");
    await t.expect(storePhone.innerText).eql("0982341111");
});
