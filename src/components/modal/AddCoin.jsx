import React, { Fragment } from "react";

const AddCoinModal = ({ isOpen, closeModal, content }) => {
    return (
        <Fragment>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className={`modal ${isOpen && "modal-open"}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{content.title}</h3>
                    <p className="py-4">{content.descriptions}</p>
                    <div className="modal-action">
                        <button
                            className="btn btn-primary"
                            onClick={closeModal}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default React.memo(AddCoinModal);
