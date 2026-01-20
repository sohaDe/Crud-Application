import { X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { updateRecord, addRecord } from '../store/recordsSlice'
import toast from 'react-hot-toast'

function RecordModel({ isopen, onClose, currentRecord, FormData, setFormData }) {

    const dispatch = useDispatch()

    const handleSubmit = () => {
        if (!FormData.name.trim() || !FormData.email.trim()) {
            alert("Please enter name and email")
            return
        }
        if (currentRecord) {
            dispatch(updateRecord({
                id: currentRecord.id,
                data: FormData
            }))
            toast.success("Record updated successfully")
        }
        else {
            dispatch(addRecord(FormData))
            toast.success("Record added successfully")
        }
        onClose()
    }

    if (!isopen) return null


    return (
        <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50'>

            {/* Header  */}
            <div className='bg-white rounded-lg shadow-2xl max-w-md w-full'>
                <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                    <h2 className='text-2xl font-bold text-gray-800'>Register New Record</h2>
                    <button
                        className='text-gray-400 hover:text-gray-600 transition-all'
                        onClick={onClose}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form Field  */}
                <div className='p-6 space-y-4'>
                    {/* Name  */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Name *</label>
                        <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' placeholder='Enter full name'
                            value={FormData.name}
                            onChange={(e) => setFormData({ ...FormData, name: e.target.value })} />
                    </div>

                    {/* Email  */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Email *</label>
                        <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' placeholder='Enter email'
                            value={FormData.email}
                            onChange={(e) => setFormData({ ...FormData, email: e.target.value })} />
                    </div>

                    {/* Phone  */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Phone number*</label>
                        <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type='tel' placeholder='Enter phone'
                            value={FormData.phone}
                            onChange={(e) => setFormData({ ...FormData, phone: e.target.value })} />
                    </div>

                    {/* Position  */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Position *</label>
                        <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' type='text' placeholder='Enter Position'
                            value={FormData.position}
                            onChange={(e) => setFormData({ ...FormData, position: e.target.value })} />
                    </div>
                </div>

                {/* footer buttons  */}
                <div className='flex gap-3 p-6 border-t border-gray-200'>
                    <button className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50
                 transition-all font-medium'
                        onClick={onClose}>
                        Cancel
                    </button>

                    <button className='flex-1 px-4 py-2 border bg-blue-600 text-white border-gray-300 rounded-lg 
                 hover:scale-105 transition-all font-medium'
                        onClick={handleSubmit}>
                        {currentRecord ? 'Update' : 'Register'}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default RecordModel
