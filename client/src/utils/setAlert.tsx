import { toast } from "react-toastify";

const config: any = {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
};

const setAlert = (msg: string, type: string) => {
    if (type === "error") {
        toast.error(msg, config);
    } else if (type === "success") {
        toast.success(msg, config);
    } else {
        toast(msg, config);
    }
};

export default setAlert;
