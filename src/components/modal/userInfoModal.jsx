import React from "react";

function convertDateFormat(inputDate) {
    // Tạo đối tượng Date từ chuỗi thời gian đầu vào
    var date = new Date(inputDate);

    // Lấy giá trị ngày, tháng, năm
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    // Định dạng lại chuỗi thời gian
    var outputDate = day.toString().padStart(2, "0") + "/" + month.toString().padStart(2, "0") + "/" + year.toString();

    return outputDate;
}
function UserInfoModal({ user }) {
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <div className="container flex flex-col">
                        <div className="flex items-center justify-center mt-4 flex-col">
                            <div className="w-10/12 bg-gradient-to-r from-primary to-secondary h-56 rounded-md relative">
                                <div className="avatar absolute -bottom-14 left-6">
                                    <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL} alt="user_img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-center items-center flex mt-20">
                            <div className="w-10/12">
                                <p className="text-lg font-bold text-base-content">{user?.displayName}</p>
                                <p className="text-lg text-base-content mt-2">UID: {user?.uid}</p>
                                <p className="text-lg text-base-content mt-2">Email:{user?.email}</p>
                                <p className="text-lg text-base-content mt-2">Chức vụ: {user?.role}</p>
                                <p className="text-lg text-base-content mt-2">
                                    Ngày tham gia: {convertDateFormat(user?.createdAt ?? "01/01/1970")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-primary">
                            Đóng
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfoModal;
