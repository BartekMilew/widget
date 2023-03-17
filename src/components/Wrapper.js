import React, { useState } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    width: "200px",
    height: "400px",
    margin: "auto",
  },
};
export default function Wrapper() {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!open)}>Connect your bank</button>
      <Modal isOpen={open} contentLabel="Example Modal" style={customStyles}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={() => setIsOpen(!open)}>X</button>
        </div>
        <div>I am a modal</div>
      </Modal>
    </>
  );
}
