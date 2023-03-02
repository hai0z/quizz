import React, { Fragment } from "react";

const InAExamModal = ({ isOpen, closeModal }) => {
    return (
        <Fragment>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className={`modal ${isOpen && "modal-open"}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Không thể làm bài thi này</h3>
                    <p className="py-4">
                        Bạn đang làm 1 bài thi khác vui lòng kết thúc bài thi trước khi làm bài thi
                        mới
                    </p>
                    <div className="modal-action">
                        <button className="btn" onClick={closeModal}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default InAExamModal;
