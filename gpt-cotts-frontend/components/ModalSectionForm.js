import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

export default function ModalSectionForm({ open, onClose, onSave }) {

  return (
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col items-center justify-center mt-96 ml-24 mr-24">

          <div className="bg-gray-400 p-4 w-full rounded-md shadow-md">
            <div className="flex">
              <button className="ml-auto bg-purple-600 p-2 rounded hover:bg-red-500" onClick={onClose}>Cancel</button>
            </div>
            <form className="flex flex-col mb-2">
              <label className="text-lg text-black font-semibold mb-2"><u>Section Title</u></label>
              <input className="border rounded-md p-2 mb-4" type="text" name="title" />
              <label className="text-lg text-black font-semibold mb-2"><u>Section Content</u></label>
              <textarea className="border rounded-md p-32" name="content" />
            </form>
            <div className="flex">
              <button className="ml-auto bg-purple-600 p-2 rounded hover:bg-fuchsia-500">Save</button>
            </div>
          </div>
        </div>
      </Modal>
  )
}
