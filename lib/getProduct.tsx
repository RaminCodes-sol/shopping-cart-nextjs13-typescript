

const getProduct = async (productId: string) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
    return response.json()
}

export default getProduct