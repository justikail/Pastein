import Modal from "react-modal";

Modal.setAppElement("#pastein");

const expirationTimes = [
  { label: "Never", value: 0, text: null },
  { label: "10 Minutes", value: 10, text: "10m" },
  { label: "1 Hour", value: 60, text: "1h" },
  { label: "1 Day", value: 1440, text: "1d" },
  { label: "1 Week", value: 10080, text: "1w" },
  { label: "1 Month", value: 43200, text: "1m" },
];

const TimerModal = ({ isOpen, onRequestClose, onSelect }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={{
        base: "fixed inset-0 top-4 items-start flex justify-center z-50 m-[1.10rem] text-black transition-all duration-1000 ease-in-out",
        afterOpen: "modal-transition-enter-active",
        beforeClose: "modal-transition-exit-active",
      }}
      overlayClassName={{
        base: "fixed inset-0 bg-black bg-opacity-50",
        afterOpen: "modal-transition-enter-active",
        beforeClose: "modal-transition-exit-active",
      }}
      closeTimeoutMS={500}
    >
      <div className="bg-white rounded-lg shadow-lg w-[500px]">
        <div className="flex items-center w-full justify-start p-4 border-b border-slate-300">
          <h2 className="text-lg font-bold">Expiration</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-full p-[1rem] gap-4">
          <p className="text-sm font-normal text-start">How much time do we have before this paste expires?</p>
          <div className="flex flex-wrap gap-2">
            {expirationTimes.map((time) => (
              <button key={time.value} onClick={() => onSelect([time.value, time.text])} className="bg-transparent border-2 transition-colors duration-300 ease-in-out border-gray-300 hover:bg-gray-300 text-xs p-2 rounded">
                {time.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end p-4 border-t border-slate-300">
          <button onClick={onRequestClose} className="text-xs bg-black text-white rounded p-2 uppercase transition-colors hover:bg-slate-900">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TimerModal;
