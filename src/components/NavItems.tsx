export default function NavItems() {
    const items = [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: 'Quality',
            href: '/quality',
        },
    ]
    return (
        <nav className="flex space-x-4">
            {items.map((item) => (
                <a
                    key={item.title}
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                >
                    {item.title}
                </a>
            ))}
        </nav>
    )
}
