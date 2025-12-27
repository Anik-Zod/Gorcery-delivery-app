import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddress, replaceAddress } from '../features/appSlice'
import axiosInstance from '../api/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, MapPin, Phone, Home, Flag, Building, X } from 'lucide-react'

function AddressPopup({ onClose }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.app.user)
    const [address, setLocalAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    })
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState({ type: '', message: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLocalAddress((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFeedback({ type: '', message: '' })
        try {
            const response = await axiosInstance.post('/address/add', address)
            if (response.data.success) {
                // Fetch updated addresses to ensure we have IDs
                if (user?._id) {
                    const addressResponse = await axiosInstance.get(`/address/get/${user._id}`)
                    if (addressResponse.data.success) {
                        dispatch(replaceAddress(addressResponse.data.addresses))
                    }
                }
                setFeedback({ type: 'success', message: 'Address added successfully!' })
                setTimeout(() => {
                    onClose()
                }, 1200)
            } else {
                setFeedback({ type: 'error', message: response.data.message || 'Failed to add address' })
            }
        } catch (err) {
            setFeedback({ type: 'error', message: err.message })
        } finally {
            setLoading(false)
        }
    }

    const inputFields = [
        { name: 'street', placeholder: 'Street', Icon: Home },
        { name: 'city', placeholder: 'City', Icon: Building },
        { name: 'state', placeholder: 'State', Icon: Flag },
        { name: 'zipCode', placeholder: 'Zip Code', Icon: MapPin, type: 'number' },
        { name: 'country', placeholder: 'Country', Icon: Flag },
        { name: 'phone', placeholder: 'Phone', Icon: Phone },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                className="relative w-full max-w-lg bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-700"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                    Add New <span className="text-primary">Address</span>
                </h2>

                <form onSubmit={onSubmitHandler} className="space-y-4">
                    {inputFields.map(({ name, placeholder, Icon, type }) => (
                        <FloatingInput
                            key={name}
                            name={name}
                            type={type || 'text'}
                            placeholder={placeholder}
                            value={address[name]}
                            onChange={handleChange}
                            Icon={Icon}
                        />
                    ))}

                    <button
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition-all mt-2 ${loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary shadow-lg'
                            }`}
                    >
                        {loading ? 'Saving...' : 'Save Address'}
                    </button>
                </form>

                {/* Feedback Toast */}
                <AnimatePresence>
                    {feedback.message && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg text-sm w-max ${feedback.type === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {feedback.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                            {feedback.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default AddressPopup

const FloatingInput = ({ Icon, placeholder, name, value, onChange, type }) => {
    return (
        <div className="relative w-full">
            {Icon && <Icon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                required
                className="peer w-full rounded-xl border border-gray-600 px-10 py-3 text-white text-base placeholder-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-700/50"
            />
            <label
                htmlFor={name}
                className="absolute left-10 top-3 text-gray-400 text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-primary peer-focus:text-xs bg-gray-800 px-1 rounded"
            >
                {placeholder}
            </label>
        </div>
    )
}
