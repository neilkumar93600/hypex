export const siteConfig = {
    name: "VOID",
    tagline: "DROP CULTURE",
    description: "Limited drops. No restocks.",
    social: {
        instagram: "https://instagram.com/void",
        twitter: "https://twitter.com/void",
        discord: "https://discord.gg/void"
    }
};

export const heroData = {
    headline: "VOID // DROP 047",
    subheadline: "SS24 COLLECTION",
    cta: "SHOP NOW",
    secondaryCta: "VIEW LOOKBOOK",
    backgroundImage: "/hero-drop.svg",
    dropDate: "2024-03-15T00:00:00Z"
};

export const dropData = {
    currentDrop: {
        id: "drop-047",
        name: "VOID // 047",
        status: "LIVE",
        endTime: "2024-03-22T23:59:59Z",
        totalItems: 12,
        itemsRemaining: 3
    },
    upcomingDrops: [
        {
            id: "drop-048",
            name: "VOID // 048",
            date: "2024-04-01T00:00:00Z",
            teaser: "TECHNICAL SERIES"
        }
    ]
};

export const products = [
    {
        id: "v-047-001",
        name: "OVERSIZED TECH HOODIE",
        price: 189,
        originalPrice: null,
        category: "HOODIES",
        badge: "SELLING FAST",
        stock: 5,
        images: ["/products/hoodie-1.svg", "/products/hoodie-2.svg"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["BLACK", "ASH"]
    },
    {
        id: "v-047-002",
        name: "CARGO TECH PANTS",
        price: 149,
        originalPrice: null,
        category: "BOTTOMS",
        badge: "LOW STOCK",
        stock: 2,
        images: ["/products/cargo-1.svg"],
        sizes: ["30", "32", "34", "36"],
        colors: ["BLACK"]
    },
    {
        id: "v-047-003",
        name: "BOX FIT TEE",
        price: 59,
        originalPrice: 79,
        category: "TEES",
        badge: "SALE",
        stock: 15,
        images: ["/products/tee-1.svg"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["WHITE", "BLACK"]
    },
    {
        id: "v-047-004",
        name: "PUFFER JACKET",
        price: 299,
        originalPrice: null,
        category: "OUTERWEAR",
        badge: "LIMITED",
        stock: 1,
        images: ["/products/puffer-1.svg"],
        sizes: ["M", "L"],
        colors: ["BLACK"]
    },
    {
        id: "v-047-005",
        name: "CROSSBODY BAG",
        price: 89,
        originalPrice: null,
        category: "ACCESSORIES",
        badge: null,
        stock: 8,
        images: ["/products/bag-1.svg"],
        sizes: ["ONE SIZE"],
        colors: ["BLACK", "COYOTE"]
    },
    {
        id: "v-047-006",
        name: "TECH CAP",
        price: 45,
        originalPrice: null,
        category: "ACCESSORIES",
        badge: null,
        stock: 12,
        images: ["/products/cap-1.svg"],
        sizes: ["ONE SIZE"],
        colors: ["BLACK", "WHITE"]
    }
];

export const collections = [
    {
        id: "all",
        name: "ALL",
        image: "/collections/all.svg"
    },
    {
        id: "hoodies",
        name: "HOODIES",
        image: "/collections/hoodies.svg"
    },
    {
        id: "tees",
        name: "TEES",
        image: "/collections/tees.svg"
    },
    {
        id: "bottoms",
        name: "BOTTOMS",
        image: "/collections/bottoms.svg"
    },
    {
        id: "outerwear",
        name: "OUTERWEAR",
        image: "/collections/outerwear.svg"
    }
];

export const footerData = {
    links: {
        shop: ["ALL PRODUCTS", "NEW DROPS", "RESTOCKS"],
        support: ["SHIPPING", "RETURNS", "SIZE GUIDE", "FAQ"],
        company: ["ABOUT", "CAREERS", "PRESS"]
    },
    newsletter: {
        headline: "GET EARLY ACCESS",
        subtext: "Subscribers get 24hr early access to drops"
    }
};