import { toast } from "react-toastify";

const config = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "colored",
  pauseOnFocusLoss: false,
};

export function notifySuccess(msg, position) {
  config.position = position;
  toast.success(msg, config);
}

export function notifyError(msg, position) {
  config.position = position;
  toast.error(msg, config);
}

export function notifyInfo(msg, position) {
  config.position = position;
  toast.info(msg, config);
}
export function notifyWarn(msg, position) {
  config.position = position;
  toast.warn(msg, config);
}

/*

toast.info("Lorem ipsum dolor"); 
toast.error("Lorem ipsum dolor")
toast.success("Lorem ipsum dolor")
toast.warn("Lorem ipsum dolor")


POSTION:

top-left
top-right
top-center
bottom-left
bottom-right
bottom-center

*/
