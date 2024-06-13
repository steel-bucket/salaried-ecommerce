export const PRODUCT_CATEGORIES = [
    {
        label: 'UI Kits',
        value: 'ui_kits' as const,
        featured: [
            {
                name: 'Editor picks',
                href: `/products?category=ui_kits`,
                imageSrc: '/nav/ui-kits/mixed.jpg',
            },
            {
                name: 'New Arrivals',
                href: '/products?category=ui_kits&sort=desc',
                imageSrc: '/nav/ui-kits/blue.jpg',
            },
            {
                name: 'Bestsellers',
                href: '/products?category=ui_kits',
                imageSrc: '/nav/ui-kits/purple.jpg',
            },
        ],
    },
    {
        label: 'Icons',
        value: 'icons' as const,
        featured: [
            {
                name: 'Favorite Icon Picks',
                href: `/products?category=icons`,
                imageSrc: '/nav/icons/picks.jpg',
            },
            {
                name: 'New Arrivals',
                href: '/products?category=icons&sort=desc',
                imageSrc: '/nav/icons/new.jpg',
            },
            {
                name: 'Bestselling Icons',
                href: '/products?category=icons',
                imageSrc: '/nav/icons/bestsellers.jpg',
            },
        ],
    },

    // {
    //     label: 'Illustrations',
    //     value: 'illustrations' as const,
    //     featured: [
    //         {
    //             name: 'Editor picks',
    //             href: `/products?category=illustrations`,
    //             imageSrc: '/nav/illustrations/mixed.jpg',
    //         },
    //         {
    //             name: 'New Arrivals',
    //             href: '/products?category=illustrations&sort=desc',
    //             imageSrc: '/nav/illustrations/blue.jpg',
    //         },
    //         {
    //             name: 'Bestsellers',
    //             href: '/products?category=illustrations',
    //             imageSrc: '/nav/illustrations/purple.jpg',
    //         },
    //     ],
    // },
    // {
    //     label: '3D Assets',
    //     value: '3d_assets' as const,
    //     featured: [
    //         {
    //             name: 'Editor picks',
    //             href: `/products?category=3d_assets`,
    //             imageSrc: '/nav/3d-assets/mixed.jpg',
    //         },
    //         {
    //             name: 'New Arrivals',
    //             href: '/products?category=3d_assets&sort=desc',
    //             imageSrc: '/nav/3d-assets/blue.jpg',
    //         },
    //         {
    //             name: 'Bestsellers',
    //             href: '/products?category=3d_assets',
    //             imageSrc: '/nav/3d-assets/purple.jpg',
    //         },
    //     ],
    // },
    // {
    //     label: 'Fonts',
    //     value: 'fonts' as const,
    //     featured: [
    //         {
    //             name: 'Editor picks',
    //             href: `/products?category=fonts`,
    //             imageSrc: '/nav/fonts/mixed.jpg',
    //         },
    //         {
    //             name: 'New Arrivals',
    //             href: '/products?category=fonts&sort=desc',
    //             imageSrc: '/nav/fonts/blue.jpg',
    //         },
    //         {
    //             name: 'Bestsellers',
    //             href: '/products?category=fonts',
    //             imageSrc: '/nav/fonts/purple.jpg',
    //         },
    //     ],
    // },
    // {
    //     label: 'Mockups',
    //     value: 'mockups' as const,
    //     featured: [
    //         {
    //             name: 'Editor picks',
    //             href: `/products?category=mockups`,
    //             imageSrc: '/nav/mockups/mixed.jpg',
    //         },
    //         {
    //             name: 'New Arrivals',
    //             href: '/products?category=mockups&sort=desc',
    //             imageSrc: '/nav/mockups/blue.jpg',
    //         },
    //     ],
    // },
]
