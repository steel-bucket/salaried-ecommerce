import FollowUsAt from '@/components/Footer/FollowUsAt'

export function Footer() {
    return (
        <footer className="bg-gray-200 dark:bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground font-semibold">
                            © Salaried 2024 All rights reserved.
                        </p>
                    </div>

                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground mb-2">
                            Address: 320, Money-Salary Street, Salary City,
                            India
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                            Billing Info
                        </p>
                        <div className="aspect-w-4 aspect-h-3 max-w-[300px] mx-auto md:mx-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627977975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f0f1f0f1f0!2s1234%20Main%20St%2C%20Anytown%2C%20USA!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
                                className="w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <a
                            href="/privacy-policy"
                            className="block text-sm text-muted-foreground hover:underline mb-2"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms-of-service"
                            className="block text-sm text-muted-foreground hover:underline mb-2"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="/return-refund-policy"
                            className="block text-sm text-muted-foreground hover:underline"
                        >
                            Return and Refund Policy
                        </a>
                    </div>

                    <div className="text-center md:text-left">
                        <FollowUsAt />
                    </div>
                </div>
            </div>
        </footer>
    )
}
