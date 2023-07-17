import getProducts from "@/lib/getProducts"


const sitemap = async () => {
    const productsData: Promise<Product[]> = getProducts()
    const allProducts = await productsData

    const products = allProducts.map(product => ({
        url: `http://localhost:3000/product/${product.id}`,
        lastModified: new Date().toISOString()
    }))

    const routes = ['', '/product'].map(route => ({
        url: `http://localhost:3000${route}`,
        lastModified: new Date().toISOString()
    }))

    return [...routes, ...products]
}

export default sitemap