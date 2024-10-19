import { Metadata } from 'next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Return and Refund Policy | Salaried',
    description: 'Return and Refund Policy for Salaried',
}

export default function ReturnRefundPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Return and Refund Policy
            </h1>
            <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                    Please read this policy carefully before making a purchase.
                </AlertDescription>
            </Alert>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                    At Salaried, we strive to ensure your satisfaction with our
                    services. This Return and Refund Policy outlines our
                    guidelines for returns and refunds.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    1. Digital Products
                </h2>
                <p>
                    Due to the nature of digital products, we generally do not
                    offer refunds for purchases of digital goods or services
                    once they have been delivered or access has been granted.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    2. Subscription Services
                </h2>
                <p>
                    For subscription-based services, you may cancel your
                    subscription at any time. Refunds for partial months of
                    service are not provided.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    3. Exceptions
                </h2>
                <p>
                    In cases of technical issues or service unavailability, we
                    may offer refunds or service credits at our discretion.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    4. Refund Process
                </h2>
                <p>
                    If you believe you are eligible for a refund, please contact
                    our customer support team with your order details and the
                    reason for your refund request.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    5. Processing Time
                </h2>
                <p>
                    Approved refunds will be processed within 5-10 business
                    days. The time it takes for the refund to appear in your
                    account may vary depending on your payment method and
                    financial institution.
                </p>
            </div>
        </div>
    )
}
