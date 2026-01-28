import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contact = () => {
    const formRef = useRef()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false,
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({
                loading: false,
                success: false,
                error: true,
                message: 'Please fill in all fields'
            })
            return
        }

        setStatus({ loading: true, success: false, error: false, message: '' })

        try {
            // EmailJS credentials
            const result = await emailjs.sendForm(
                'service_9sl82lt',      // EmailJS Service ID
                'template_t7qfwrc',     // EmailJS Template ID
                formRef.current,
                'NfWtOA_y46XAEm9SF'     // EmailJS Public Key
            )

            setStatus({
                loading: false,
                success: true,
                error: false,
                message: 'Message sent successfully! I\'ll get back to you soon.'
            })

            // Reset form
            setFormData({ name: '', email: '', message: '' })
            formRef.current.reset()

            // Clear success message after 5 seconds
            setTimeout(() => {
                setStatus({ loading: false, success: false, error: false, message: '' })
            }, 5000)

        } catch (error) {
            console.error('EmailJS Error:', error)
            setStatus({
                loading: false,
                success: false,
                error: true,
                message: 'Failed to send message. Please try again or email me directly.'
            })
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Get In Touch</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        I'm always open to discussing new projects, backend architecture, or opportunities to contribute to dynamic engineering teams.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <a href="mailto:mishu.cse616@gmail.com" className="font-semibold hover:text-blue-500 transition-colors">mishu.cse616@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-semibold">+8801794914570</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="font-semibold">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bento-card"
                >
                    <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                placeholder="Your Name"
                                disabled={status.loading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                placeholder="your@email.com"
                                disabled={status.loading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                placeholder="Hi, I'd like to talk about..."
                                disabled={status.loading}
                            ></textarea>
                        </div>

                        {/* Status Messages */}
                        {status.message && (
                            <div className={`flex items-center gap-2 p-3 rounded-lg ${status.success
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                }`}>
                                {status.success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                <span className="text-sm">{status.message}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status.loading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            {status.loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Contact
