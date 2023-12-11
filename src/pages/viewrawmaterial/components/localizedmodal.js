import { Button, Modal } from "antd";
import React, { useState } from "react";
function LocalizedModal() {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button className="deletebtn"
        onClick={showModal}
        style={{
          Left: "5%",
          fontSize: "12px",
          backgroundColor: "#FFE5E5",
          color: "#BB2525",
          borderColor: "#FF9B82",
          border: "1px",
          borderStyle: "solid",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        DELETE
      </Button>
      <Modal
        title="Modal"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </>
  );
}
export default LocalizedModal;
