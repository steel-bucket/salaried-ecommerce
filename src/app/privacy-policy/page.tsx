import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Salaried',
    description: 'Privacy Policy for Salaried',
}

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Privacy Policy
            </h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                    At Salaried, we are committed to protecting your privacy and
                    ensuring the security of your personal information.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    1. Information We Collect
                </h2>
                <p>
                    We collect personal information that you provide directly to
                    us, such as your name, email address, and payment
                    information when you use our services.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    2. How We Use Your Information
                </h2>
                <p>
                    We use the information we collect to provide, maintain, and
                    improve our services, as well as to communicate with you
                    about your account and our services.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    3. Information Sharing and Disclosure
                </h2>
                <p>
                    We do not sell or rent your personal information to third
                    parties. We may share your information with service
                    providers who assist us in operating our business.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    4. Data Security
                </h2>
                <p>
                    We implement appropriate technical and organizational
                    measures to protect your personal information against
                    unauthorized or unlawful processing and accidental loss,
                    destruction, or damage.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    5. Your Rights
                </h2>
                <p>
                    You have the right to access, correct, or delete your
                    personal information. You may also have the right to
                    restrict or object to certain processing of your data.
                </p>
            </div>
        </div>
    )
}
