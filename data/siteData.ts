export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    tag: string;
    link: string;
    category: string;
    description?: string;
    details?: string[];
    sizes?: string[];
    colors?: { name: string; hex: string }[];
    stock?: number;
    reviews?: Review[];
}

export interface Review {
    id: number;
    author: string;
    rating: number;
    date: string;
    title: string;
    body: string;
    verified: boolean;
}

export interface Collection {
    id: string;
    title: string;
    description?: string;
    image: string;
    link: string;
    category?: string;
}

export const siteData = {
    name: "VOID",
    slogan: "MODERN ESSENTIALS.",
    announcement: "FREE SHIPPING ON ORDERS OVER $150 | WORLDWIDE DELIVERY",

    hero: {
        title: "SPRING COLLECTION '26",
        subtitle: "PREMIUM STREETWEAR FOR THE MODERN ERA. QUALITY THAT SPEAKS FOR ITSELF.",
        cta: "SHOP NOW",
        image: "/hero-bg.webp",
    },

    drop: {
        title: "FEATURED ITEM",
        date: "2026-03-01T00:00:00", // Kept for type safety but ignored in UI
        productName: "VOID RUNNER V2",
        productImage: "/drop-shoe.webp",
        price: "$220",
        stockStatus: "IN STOCK",
        cta: "SHOP NOW",
    },

    collections: [
        {
            id: "new-arrivals",
            title: "NEW ARRIVALS",
            description: "Latest styles just landed. Explore the collection.",
            image: "/collection-new.webp",
            link: "/collections/new-arrivals",
        },
        {
            id: "best-sellers",
            title: "BEST SELLERS",
            description: "Customer favorites. Verified quality.",
            image: "/collection-best.webp",
            link: "/collections/best-sellers",
        },
        {
            id: "accessories",
            title: "ACCESSORIES",
            description: "Complete your look. Beanies, bags, and more.",
            image: "/collection-accessories.webp",
            link: "/collections/accessories",
        },
    ] as Collection[],

    products: [
        {
            id: 1,
            name: "OVERSIZED GRAPHIC HOODIE",
            slug: "oversized-graphic-hoodie",
            price: 85,
            image: "/product-hoodie.webp",
            images: ["/product-hoodie.webp", "/product-hoodie-2.webp", "/product-hoodie-3.webp"],
            tag: "BESTSELLER",
            link: "/product/oversized-graphic-hoodie",
            category: "best-sellers",
            description: "Premium heavyweight 400gsm cotton hoodie with oversized fit. Features bold front graphic and ribbed cuffs. A streetwear essential that goes with everything.",
            details: [
                "400gsm premium cotton",
                "Oversized relaxed fit",
                "Ribbed cuffs and hem",
                "Kangaroo pocket",
                "Machine wash cold",
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: [
                { name: "Black", hex: "#000000" },
                { name: "Cream", hex: "#F5F0E6" },
                { name: "Charcoal", hex: "#333333" },
            ],
            stock: 24,
            reviews: [
                { id: 1, author: "JAKE M.", rating: 5, date: "2026-01-15", title: "INSANE quality", body: "Best hoodie I've ever owned. The weight on this thing is unreal. Fits perfectly oversized.", verified: true },
                { id: 2, author: "SARAH K.", rating: 5, date: "2026-01-10", title: "Worth every penny", body: "Got it in black and cream. Can't pick a favorite. Both are fire.", verified: true },
                { id: 3, author: "DEON W.", rating: 4, date: "2026-01-05", title: "Great but runs big", body: "Quality is top tier. Went TTS and it's super oversized. Size down if you want a regular fit.", verified: true },
            ],
        },
        {
            id: 2,
            name: "CARGO UTILITY PANTS",
            slug: "cargo-utility-pants",
            price: 110,
            image: "/product-pants.webp",
            images: ["/product-pants.webp", "/product-pants-2.webp", "/product-pants-3.webp"],
            tag: "NEW",
            link: "/product/cargo-utility-pants",
            category: "new-arrivals",
            description: "Technical cargo pants with six utility pockets. Adjustable ankle toggles and YKK zippers throughout. Built for the streets.",
            details: [
                "Ripstop nylon blend",
                "6 utility pockets",
                "YKK zippers",
                "Adjustable ankle toggles",
                "Elastic waistband with drawcord",
            ],
            sizes: ["28", "30", "32", "34", "36"],
            colors: [
                { name: "Black", hex: "#000000" },
                { name: "Olive", hex: "#4A5520" },
            ],
            stock: 18,
            reviews: [
                { id: 4, author: "MARCUS T.", rating: 5, date: "2026-01-20", title: "These go crazy", body: "Pockets on pockets. The fit is perfect and the material feels premium.", verified: true },
                { id: 5, author: "LIZ R.", rating: 4, date: "2026-01-18", title: "Love the olive", body: "Got the olive colorway. Pairs perfect with everything. Wish they had more colors.", verified: true },
            ],
        },
        {
            id: 3,
            name: "DISTRESSED DENIM JACKET",
            slug: "distressed-denim-jacket",
            price: 145,
            originalPrice: 180,
            image: "/product-jacket.webp",
            images: ["/product-jacket.webp", "/product-jacket-2.webp", "/product-jacket-3.webp"],
            tag: "SALE",
            link: "/product/distressed-denim-jacket",
            category: "best-sellers",
            description: "Hand-distressed selvedge denim jacket. Each piece is unique with custom wash treatment.",
            details: [
                "14oz Japanese selvedge denim",
                "Hand-distressed finishing",
                "Copper hardware",
                "Interior pocket",
                "Premium denim",
            ],
            sizes: ["S", "M", "L", "XL"],
            colors: [
                { name: "Washed Blue", hex: "#6B8DB5" },
                { name: "Black Wash", hex: "#1A1A1A" },
            ],
            stock: 5,
            reviews: [
                { id: 6, author: "TYLER B.", rating: 5, date: "2026-02-01", title: "Museum piece", body: "This jacket is art. The distressing is clearly done by hand. Worth every dollar.", verified: true },
            ],
        },
        {
            id: 4,
            name: "STREETWEAR BEANIE",
            slug: "streetwear-beanie",
            price: 35,
            image: "/product-beanie.webp",
            images: ["/product-beanie.webp", "/product-beanie-2.webp"],
            tag: "",
            link: "/product/streetwear-beanie",
            category: "accessories",
            description: "Ribbed knit beanie with embroidered VOID logo. One size fits all. The finishing touch for any fit.",
            details: [
                "100% acrylic knit",
                "Embroidered logo",
                "One size fits all",
                "Ribbed construction",
            ],
            sizes: ["ONE SIZE"],
            colors: [
                { name: "Black", hex: "#000000" },
                { name: "Yellow", hex: "#FFD400" },
                { name: "Gray", hex: "#808080" },
            ],
            stock: 50,
            reviews: [
                { id: 7, author: "NINA P.", rating: 5, date: "2026-01-25", title: "Clean", body: "Simple, clean, quality. Got the yellow one and it pops.", verified: true },
                { id: 8, author: "ALEX G.", rating: 4, date: "2026-01-22", title: "Solid beanie", body: "Nothing crazy but the quality is there. Logo is clean.", verified: true },
            ],
        },
        {
            id: 5,
            name: "TECH FLEECE JOGGERS",
            slug: "tech-fleece-joggers",
            price: 95,
            image: "/product-joggers.webp",
            images: ["/product-joggers.webp"],
            tag: "NEW",
            link: "/product/tech-fleece-joggers",
            category: "new-arrivals",
            description: "Double-knit tech fleece joggers with tapered fit. Zippered pockets keep your essentials secure.",
            details: [
                "Double-knit tech fleece",
                "Tapered slim fit",
                "Zippered side pockets",
                "Elastic waist with drawcord",
                "Ribbed ankles",
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: [
                { name: "Black", hex: "#000000" },
                { name: "Heather Gray", hex: "#B0B0B0" },
            ],
            stock: 32,
            reviews: [],
        },
        {
            id: 6,
            name: "GRAPHIC CREWNECK TEE",
            slug: "graphic-crewneck-tee",
            price: 55,
            image: "/product-tee.webp",
            images: ["/product-tee.webp"],
            tag: "BESTSELLER",
            link: "/product/graphic-crewneck-tee",
            category: "best-sellers",
            description: "Heavyweight 240gsm cotton tee with oversized back graphic. Boxy fit with dropped shoulders.",
            details: [
                "240gsm premium cotton",
                "Boxy oversized fit",
                "Dropped shoulders",
                "Screen-printed graphic",
                "Reinforced collar",
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: [
                { name: "White", hex: "#FFFFFF" },
                { name: "Black", hex: "#000000" },
            ],
            stock: 45,
            reviews: [
                { id: 9, author: "RAJ S.", rating: 5, date: "2026-02-05", title: "Perfect summer tee", body: "Heavy cotton that drapes well. Graphic print quality is top notch.", verified: true },
            ],
        },
        {
            id: 7,
            name: "CHAIN LINK NECKLACE",
            slug: "chain-link-necklace",
            price: 65,
            image: "/product-chain.webp",
            images: ["/product-chain.webp"],
            tag: "",
            link: "/product/chain-link-necklace",
            category: "accessories",
            description: "Stainless steel chain link necklace with VOID pendant. 20-inch length. Water and tarnish resistant.",
            details: [
                "316L stainless steel",
                "VOID branded pendant",
                "20-inch length",
                "Lobster clasp closure",
                "Water resistant",
            ],
            sizes: ["ONE SIZE"],
            colors: [
                { name: "Silver", hex: "#C0C0C0" },
                { name: "Gold", hex: "#D4AF37" },
            ],
            stock: 28,
            reviews: [],
        },
        {
            id: 8,
            name: "UTILITY CROSSBODY BAG",
            slug: "utility-crossbody-bag",
            price: 75,
            image: "/product-bag.webp",
            images: ["/product-bag.webp"],
            tag: "NEW",
            link: "/product/utility-crossbody-bag",
            category: "accessories",
            description: "Tactical crossbody bag with multiple compartments. Adjustable strap with quick-release buckle.",
            details: [
                "1000D Cordura nylon",
                "Multiple compartments",
                "Quick-release buckle",
                "Adjustable strap",
                "Reflective VOID logo",
            ],
            sizes: ["ONE SIZE"],
            colors: [
                { name: "Black", hex: "#000000" },
            ],
            stock: 15,
            reviews: [
                { id: 10, author: "KAI N.", rating: 5, date: "2026-01-30", title: "Essential", body: "Perfect size for phone, wallet, keys. The buckle system is sick.", verified: true },
            ],
        },
    ] as Product[],

    get featuredProducts(): Product[] {
        return this.products.slice(0, 4);
    },

    socialProof: {
        stats: [
            { label: "Happy Customers", value: "12K+" },
            { label: "5-Star Reviews", value: "2.4K" },
            { label: "Countries", value: "45+" },
            { label: "Returns", value: "Hassle Free" },
        ],
        testimonials: [
            { author: "JAKE M.", text: "Best quality streetwear I've found online. Period.", rating: 5, avatar: "JM" },
            { author: "SARAH K.", text: "Everything I've ordered has been fire. Shipping was fast too.", rating: 5, avatar: "SK" },
            { author: "DEON W.", text: "Worth the price. Quality is insane.", rating: 5, avatar: "DW" },
            { author: "NINA P.", text: "Finally a brand that matches the photos. True to size, premium feel.", rating: 5, avatar: "NP" },
        ],
    },

    sizeGuide: {
        clothing: {
            headers: ["Size", "Chest (in)", "Waist (in)", "Length (in)"],
            rows: [
                ["S", "38-40", "30-32", "27"],
                ["M", "40-42", "32-34", "28"],
                ["L", "42-44", "34-36", "29"],
                ["XL", "44-46", "36-38", "30"],
                ["XXL", "46-48", "38-40", "31"],
            ],
        },
        pants: {
            headers: ["Size", "Waist (in)", "Hip (in)", "Inseam (in)"],
            rows: [
                ["28", "28", "36", "30"],
                ["30", "30", "38", "31"],
                ["32", "32", "40", "32"],
                ["34", "34", "42", "32"],
                ["36", "36", "44", "33"],
            ],
        },
    },

    pages: {
        about: {
            title: "ABOUT VOID",
            subtitle: "Born from the streets. Built for the culture.",
            story: [
                "VOID started in 2024 with a simple idea: streetwear should be premium without the premium price tag. We saw a gap between fast fashion and luxury — and we filled it.",
                "Every piece we make is designed in-house, tested on the streets, and produced with care.",
                "We're not just a brand. We're a movement. Every piece is a statement.",
            ],
            values: [
                { title: "QUALITY FIRST", description: "Precision engineering in every stitch. We prioritize durability and comfort above all else." },
                { title: "SUSTAINABLE PRACTICES", description: "Ethically sourced materials and fair labor practices are at the core of our business." },
                { title: "STREET TESTED", description: "Every design is worn and tested before it launches. If we wouldn't wear it, we don't sell it." },
                { title: "FAST SHIPPING", description: "Orders ship within 24 hours. Worldwide delivery in 3-7 business days." },
            ],
        },
        shipping: {
            title: "SHIPPING & DELIVERY",
            policies: [
                { title: "DOMESTIC (US)", description: "Free shipping on orders over $150. Standard shipping (3-5 days) — $7.99. Express shipping (1-2 days) — $14.99." },
                { title: "INTERNATIONAL", description: "Flat rate $19.99 for orders under $200. Free on orders over $200. Delivery in 7-14 business days." },
                { title: "ORDER TRACKING", description: "All orders include tracking. You'll receive an email with your tracking number once your order ships." },
                { title: "PROCESSING TIME", description: "Orders are processed within 24 hours on business days. Orders placed on weekends ship Monday." },
            ],
        },
        returns: {
            title: "RETURNS & EXCHANGES",
            policies: [
                { title: "RETURN WINDOW", description: "30-day return window from delivery date. Items must be unworn with tags attached." },
                { title: "EXCHANGES", description: "Free exchanges for different sizes. Subject to availability." },
                { title: "REFUND PROCESS", description: "Refunds processed within 5-7 business days after we receive your return." },
                { title: "FINAL SALE", description: "Clearance items and accessories are final sale." },
            ],
        },
    },

    footer: {
        links: [
            { name: "SHOP", href: "/shop" },
            { name: "ABOUT", href: "/about" },
            { name: "SHIPPING", href: "/shipping" },
            { name: "RETURNS", href: "/returns" },
        ],
        socials: [
            { name: "INSTAGRAM", href: "#" },
            { name: "TIKTOK", href: "#" },
            { name: "X", href: "#" },
        ],
        copyright: "\u00A9 2026 VOID. ALL RIGHTS RESERVED.",
    },
};
