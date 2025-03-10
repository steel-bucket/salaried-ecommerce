"use client";
import { useState } from 'react';
import { trpc } from '@/server/trpc/client';

function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Use the tRPC mutation from the email router
    const sendEmailMutation = trpc.auth.sendEmail.useMutation();

    // Update form state when inputs change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission with tRPC mutation
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await sendEmailMutation.mutateAsync(formData);
            alert('Email sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error: any) {
            console.error('Error sending email:', error);
            alert(`Error sending email: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-black transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                    </div>
                    <div className="md:w-1/2 bg-white dark:bg-black p-6 rounded-lg shadow transition-colors">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Contact Form(Hire me as a Developer)
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                    Company/Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Your Email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Your Message"
                                    rows={4}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={sendEmailMutation.isLoading}
                                className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {sendEmailMutation.isLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
