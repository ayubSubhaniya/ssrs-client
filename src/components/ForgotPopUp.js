import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";

const contentStyle = {
  maxWidth: "600px",
  width: "90%",
};

const CustomModal = () => (
  <Popup
    trigger={<a href="#" className="popUp"> Forgot Password? </a>}
    modal
    contentStyle={contentStyle}
  >
    {close => (
      <div className="modal_popup">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Forgot Password? </div>
        <form>
            <div className="forgotInput">
            <p><strong>Enter your Registration ID</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="" placeholder="Enter your Registration ID"/></p>
            </div>
            <pre class="preformat">You will be sent reset password link to your webmail</pre>
        </form>
        <div className="actions">
          <button
            className="button"
          >
            Send
          </button>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default Warper(CustomModal);
