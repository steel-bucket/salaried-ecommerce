import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service | Salaried',
    description: 'Terms of Service for Salaried',
}

export default function TermsOfService() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Terms of Service
            </h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                    Welcome to Salaried. By using our services, you agree to
                    comply with and be bound by the following terms and
                    conditions.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    1. Acceptance of Terms
                </h2>
                <p>
                    By accessing or using Salaried services, you agree to be
                    bound by these Terms of Service and all applicable laws and
                    regulations.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    2. Use of Services
                </h2>
                <p>
                    You agree to use our services only for lawful purposes and
                    in accordance with these Terms of Service.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    3. User Accounts
                </h2>
                <p>
                    To access certain features of our services, you may be
                    required to create an account. You are responsible for
                    maintaining the confidentiality of your account information.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    4. Intellectual Property
                </h2>
                <p>
                    The content, features, and functionality of our services are
                    owned by Salaried and are protected by international
                    copyright, trademark, and other intellectual property laws.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    5. Limitation of Liability
                </h2>
                <p>
                    Salaried shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages resulting from
                    your use of our services.
                </p>
            </div>
        </div>
    )
}
