import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userlogout } from "../../redux/userSlice";
import { updatePassword } from "../../api/userApi";
const ChangePassword = () => {
  const [old, setOld] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlechangepass = () => {
    if (old === "" || newPass === "" || confirm === "") {
      toast.error("enter all details", {
        position: "top-center",
      });
    } else if (newPass === confirm && old !== newPass) {
      updatePassword({ old: old, newPass: newPass })
        .then((res) => {
          if (res.data.status === "success") {
            const changePass = document.getElementById("changePass");
            toast.success(
              "Password  is changed successfully!!. Relogin Now",
              dispatch
            );
            changePass.checked = false;
            localStorage.removeItem("usertoken");
            dispatch(userlogout());
            navigate("/");
          } else {
            toast.error("Old Password is Wrong", dispatch, {
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          toast.error(
            error.message,
            // {
            //   position: "top-center",
            // },
            dispatch
          );
        });
    } else {
    }
  };
  return (
    <>
      <input type="checkbox" id="chngepass" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="chngepass"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-extrabold text-center ">
            Change Your Password
          </h3>
          <div className="flex justify-center">
            <div className="form-control">
              <label className="p-2">Old Password</label>
              <input
                type="password"
                onChange={(e) => setOld(e.target.value)}
                value={old}
                placeholder="Type here"
                className="p-2 input bg-slate-300 input-bordered input-info w-full max-w-xs"
              />

              <label className="p-2">New Password</label>
              <input
                type="password"
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
                placeholder="Type here"
                className="p-2 bg-slate-300 input input-bordered input-success w-full max-w-xs"
              />

              <label className="p-2">Confirm Password</label>
              <input
                type="password"
                onChange={(e) => setConfirm(e.target.value)}
                value={confirm}
                placeholder="Type here"
                className="p-2 bg-slate-300 input input-bordered input-success w-full max-w-xs"
              />
              <div className="flex justify-center p-3">
                <button
                  onClick={handlechangepass}
                  className=" btn btn-primary "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ChangePassword;
