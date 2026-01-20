import { Edit2, Plus, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import RecordModel from './RecordModel'
import { selectAllRecords, selectSearchTerm, selectFilteredRecords, deleteRecord, setSearchTerm } from '../store/recordsSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'


function RecordTable() {
    const dispatch = useDispatch()
    const filteredRecords = useSelector(selectFilteredRecords)
    const allRecords = useSelector(selectAllRecords)
    const searchTerm = useSelector(selectSearchTerm)

    // sort the last show in the top 
    const storedRecords = [...filteredRecords].sort((a, b) => b.id - a.id)

    // handle show modal 
    const [showModal, setShowModal] = useState(false)

    // handle currentrecord 
    const [currentRecord, setCurrentRecord] = useState(null)

    const handleDelete = (record) => {
        toast((t) => (
            <div className='flex flex-col gap-2'>
                <span className='font-bold'>Are you sure you want to delete {record.name}</span>
                <div className='flex justify-end gap-2'>
                    <button className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm'
                        onClick={() => toast.dismiss(t.id)}>Cancel</button>
                    <button className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm'
                        onClick={() => {
                            dispatch(deleteRecord(record.id))
                            toast.success(`Record deleted successfully`)
                            toast.dismiss(t.id)
                        }}>Delete</button>
                </div>
            </div>
        ))
    }

    const [FormData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: ''
    })

    // handle open close model 
    const openCreateModel = () => {
        setCurrentRecord(null)
        setFormData({ name: "", email: "", phone: "", position: "" });
        setShowModal(true)
    }

    const openEditModel = (record) => {
        setCurrentRecord(record)
        setFormData({
            name: record.name,
            email: record.email,
            phone: record.phone,
            position: record.position
        });
        setShowModal(true)
    }

    const closeModel = () => {
        setShowModal(false)
        setCurrentRecord(null)
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Header  */}

                <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Employee Managment</h1>
                    <p className='text-gray-600'>
                        Manage Employee Record with Redux Toolkit
                    </p>
                </div>

                {/* Search and Add Buttton  */}
                <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className=' flex-1 relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                                size={20} />
                            <input value={searchTerm}
                                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                                type='text' placeholder='Search by name, email or position'
                                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none
                        focus:ring-2 focus:ring-blue-500'/>
                        </div>

                        <button className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg
                        flex items-center justify-center gap-2 transition-all' onClick={openCreateModel}>
                            <Plus size={20} />
                            Add New Record
                        </button>
                    </div>
                </div>

                {/* Employee table  */}
                <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>ID</th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Name</th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Email</th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Phone</th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Position</th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Actions</th>
                                </tr>
                            </thead>

                            <tbody className='divide-y divider-gray-200'>
                                {/* conditional rendering  */}
                                {storedRecords.length === 0 ? (
                                    <tr className='px-6 py-12 text-center text-gray-500'>
                                        <td colSpan={6}>No Record Found</td>
                                    </tr>) : (
                                    storedRecords.map((record) => {
                                        return (<tr className=' hover:bg-gray-50 transition-colors'>
                                            <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-900'> {record.id} </td>
                                            <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-900'> {record.name} </td>
                                            <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-900'> {record.email} </td>
                                            <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-900'> {record.phone} </td>
                                            <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-900'> {record.position} </td>
                                            <td className='flex gap-2 px-6 py-2 whitespace-nowrap text-sm text-gray-900'>
                                                <div className='flex items-center justify-center gap-2'>
                                                    <button className='flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5
                                             rounded hover:bg-blue-700 transition-all text-sm font-medium'
                                                        onClick={() => openEditModel(record)}>
                                                        <Edit2 size={16} /> Edit
                                                    </button>

                                                    <button className='flex items-center gap-1 bg-red-600 text-white px-3 py-1.5
                                             rounded hover:bg-red-700 transition-all text-sm font-medium'
                                                        onClick={() => handleDelete(record)}>
                                                        <Trash2 size={16} /> Delete
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>)
                                    })
                                )}
                                {/* else  */}
                                {/* Map methode  */}

                            </tbody>
                        </table>
                    </div>

                    {/* footer showing filtered vs total */}
                    <div className='bg-gray-50 px-6 py-3 border-t border-gray-200'>
                        <p className='text-sm text-gray-600'>Showing {storedRecords.length} of {allRecords.length} records</p>
                    </div>
                </div>
            </div>

            {/* Model  */}
            <RecordModel
                isopen={showModal}
                onClose={closeModel}
                currentRecord={currentRecord}
                FormData={FormData}
                setFormData={setFormData}
            />
        </div>
    )
}

export default RecordTable
