export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export interface Shop {
    id: string;
    name: string;
    description: string;
    rating: number;
    image: string;
    coverImage: string;
    products: Product[];
    categories: string[];
}

export const SHOPS: Shop[] = [
    {
        id: 'tech-haven',
        name: 'Tech Haven',
        description: 'Your one-stop shop for the latest gadgets, computers, and accessories.',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=300&q=80',
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        categories: ['Computers', 'Audio', 'Accessories'],
        products: [
            {
                id: 'p1',
                name: 'Pro Laptop 15"',
                description: 'High performance laptop for creatives.',
                price: 1299.00,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80',
                category: 'Computers'
            },
            {
                id: 'p2',
                name: 'Noise Cancelling Headphones',
                description: 'Immersive sound with active noise cancellation.',
                price: 299.00,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
                category: 'Audio'
            },
            {
                id: 'p3',
                name: 'Mechanical Keyboard',
                description: 'Tactile typing experience for professionals.',
                price: 149.00,
                image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=300&q=80',
                category: 'Accessories'
            },
            {
                id: 'p4',
                name: 'Wireless Mouse',
                description: 'Ergonomic design for long hours.',
                price: 79.00,
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80',
                category: 'Accessories'
            }
        ]
    },
    {
        id: 'fashion-forward',
        name: 'Fashion Forward',
        description: 'Trendy apparel and accessories for the modern individual.',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80',
        coverImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
        categories: ['Men', 'Women', 'Accessories'],
        products: [
            {
                id: 'p5',
                name: 'Classic Denim Jacket',
                description: 'Timeless style for any season.',
                price: 89.00,
                image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&q=80',
                category: 'Men'
            },
            {
                id: 'p6',
                name: 'Leather Tote Bag',
                description: 'Spacious and stylish for everyday use.',
                price: 199.00,
                image: 'https://images.unsplash.com/photo-1590874103328-eac65d684363?auto=format&fit=crop&w=300&q=80',
                category: 'Accessories'
            },
            {
                id: 'p7',
                name: 'Summer Dress',
                description: 'Light and breezy for warm days.',
                price: 69.00,
                image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80',
                category: 'Women'
            }
        ]
    },
    {
        id: 'home-essentials',
        name: 'Home Essentials',
        description: 'Decor and furniture to make your house a home.',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80',
        coverImage: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=1200&q=80',
        categories: ['Furniture', 'Decor', 'Kitchen'],
        products: [
            {
                id: 'p8',
                name: 'Modern Coffee Table',
                description: 'Minimalist design with solid wood.',
                price: 249.00,
                image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?auto=format&fit=crop&w=300&q=80',
                category: 'Furniture'
            },
            {
                id: 'p9',
                name: 'Ceramic Vase Set',
                description: 'Handcrafted vases for your blooms.',
                price: 49.00,
                image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=300&q=80',
                category: 'Decor'
            },
            {
                id: 'p10',
                name: 'Chef\'s Knife',
                description: 'Professional grade stainless steel.',
                price: 89.00,
                image: 'https://images.unsplash.com/photo-1593618998160-e3401587383a?auto=format&fit=crop&w=300&q=80',
                category: 'Kitchen'
            }
        ]
    }
];
