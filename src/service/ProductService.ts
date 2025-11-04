export const ProductService = {
    getProductsData() {
        return [
            {
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: '/baner/baner-1.jpg'
            },
            {
                name: 'Black Watch',
                description: 'Product Description',
                image: '/baner/baner-2.jpg'
            },
            {
                name: 'Blue Band',
                description: 'Product Description',
                image: '/baner/baner-3.jpg'
            }
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }
};
