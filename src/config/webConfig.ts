export const PRODUCT_CATEGORIES = [
    {
        label: 'Water Bottles',
        value: 'waterBottles' as const,
        featured: [
            {
                name: 'Editor picks',
                href: `/products?category=waterBottles`,
                imageSrc: '/nav/waterBottles/img.png',
            },
            {
                name: 'New Arrivals',
                href: '/products?category=waterBottles&sort=desc',
                imageSrc: '/nav/waterBottles/img_1.png',
            },
            {
                name: 'Bestsellers',
                href: '/products?category=waterBottles',
                imageSrc: '/nav/waterBottles/img_2.png',
            },
        ],
    },
    {
        label: 'Monies',
        value: 'monies' as const,
        featured: [
            {
                name: 'Editor picks',
                href: `/products?category=monies`,
                imageSrc: '/nav/monies/mixed.jpg',
            },
            {
                name: 'New Arrivals',
                href: '/products?category=monies&sort=desc',
                imageSrc: '/nav/monies/blue.jpg',
            },
            {
                name: 'Bestsellers',
                href: '/products?category=monies',
                imageSrc: '/nav/monies/purple.jpg',
            },
        ],
    },
    {
        label: 'Ants(what?)',
        value: 'ants' as const,
        featured: [
            {
                name: 'Favorite Ants',
                href: `/products?category=ants`,
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
        value: 'boxes' as const,
        featured: [
            {
                name: 'Editor picks',
                href: `/products?category=boxes`,
                imageSrc: '/nav/boxes/1.png',
            },
            {
                name: 'New Arrivals',
                href: '/products?category=boxes&sort=desc',
                imageSrc: '/nav/boxes/2.png',
            },
            {
                name: 'Bestsellers',
                href: '/products?category=boxes',
                imageSrc: '/nav/boxes/3.png',
            },
        ],
    }
]
