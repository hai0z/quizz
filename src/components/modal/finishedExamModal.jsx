import React from "react";

function FinishedExamModal({ finished, loading }) {
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Thông báo</h3>
                    <p className="py-4">Bạn thật sự muốn nộp bài?</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-error">
                            Quay lại
                        </label>
                        <label
                            className={`btn btn-success ${loading && "loading"}`}
                            onClick={finished}
                        >
                            {loading ? "Đang nộp bài " : "Nộp bài"}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinishedExamModal;
