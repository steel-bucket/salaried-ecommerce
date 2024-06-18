export const PRODUCT_CATEGORIES = [
    {
        label: 'Monies',
        value: 'monies' as const,
        featured: [
            {
                name: 'Editor picks',
                href: `/products?category=ui_kits`,
                imageSrc: '/nav/monies/mixed.jpg',
            },
            {
                name: 'New Arrivals',
                href: '/products?category=ui_kits&sort=desc',
                imageSrc: '/nav/monies/blue.jpg',
            },
            {
                name: 'Bestsellers',
                href: '/products?category=ui_kits',
                imageSrc: '/nav/monies/purple.jpg',
            },
        ],
    },
    {
        label: 'Ants(what?)',
        value: 'Ants' as const,
        featured: [
            {
                name: 'Favorite Ants',
                href: `/products?category=icons`,
                imageSrc: '/nav/ants/picks.jpg',
            },
            {
                name: 'Funny Arrivals',
                href: '/products?category=ants&sort=desc',
                imageSrc: '/nav/ants/new.jpg',
            },
            {
                name: 'Bestselling Ants',
                href: '/products?category=ants',
                imageSrc: '/nav/ants/bestsellers.jpg',
            },
        ],
    },
    {
        label: 'Empty Boxes',
        value: 'Boxes' as const,
        featured: [
            {
                name: 'Editor picks',
                href: `/products?category=illustrations`,
                imageSrc: '/nav/boxes/1.png',
            },
            {
                name: 'New Arrivals',
                href: '/products?category=illustrations&sort=desc',
                imageSrc: '/nav/boxes/2.png',
            },
            {
                name: 'Bestsellers',
                href: '/products?category=illustrations',
                imageSrc: '/nav/boxes/3.png',
            },
        ],
    }
]
