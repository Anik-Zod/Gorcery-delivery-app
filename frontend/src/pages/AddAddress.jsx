import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAddress } from '../features/appSlice'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, MapPin, Phone, Home, Flag, Building } from 'lucide-react'

function AddAddress() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
        dispatch(setAddress(address))
        setFeedback({ type: 'success', message: 'Address added successfully!' })
        setTimeout(() => navigate('/cart'), 1200)
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
    <div className="relative pt-16 -mt-10 px-4 md:px-12 lg:px-24 pb-16 min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Stars Background */}
      <StarsLayer />
      {/* Floating Rigs */}
      <RigsLayer />

      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add Shipping <span className="text-primary">Address</span>
      </motion.h1>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mt-10 relative z-10">
        {/* Form */}
        <motion.div
          className="flex-1 w-full max-w-lg bg-gray-800/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl relative"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={onSubmitHandler} className="space-y-5 sm:space-y-6">
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
              className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition-all ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg text-sm sm:text-base ${
                  feedback.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {feedback.type === 'success' ? <CheckCircle /> : <XCircle />}
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default AddAddress

const FloatingInput = ({ Icon, placeholder, name, value, onChange, type }) => {
  return (
    <div className="relative w-full">
      {Icon && <Icon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={20} />}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        className="peer w-full rounded-xl border border-gray-600 px-12 py-4 text-white text-base sm:text-lg placeholder-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-800/50"
      />
      <label
        htmlFor={name}
        className="absolute left-12 top-4 text-gray-400 text-base sm:text-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-primary peer-focus:text-sm"
      >
        {placeholder}
      </label>
    </div>
  )
}

// Stars Layer
const StarsLayer = () => {
  const stars = Array.from({ length: 120 })
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
          }}
          animate={{ y: [0, -5, 0], x: [0, 3, -3, 0] }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Floating Rigs Layer
const RigsLayer = () => {
  const rigs = Array.from({ length: 8 })
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {rigs.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-primary/70 rounded-lg"
          style={{
            width: 50,
            height: 50,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 6,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
