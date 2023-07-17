import getProduct from "@/lib/getProduct"
import getProducts from "@/lib/getProducts"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


type Props = {
    params: {
        productId: string
    }
}


/*--------GenerateMetadata--------*/
export const generateMetadata = async ({ params: { productId }}: Props): Promise<Metadata> => {
    const productData: Promise<Product> = getProduct(productId)
    const product = await productData

    if (!product.id) return {
        title: 'Page not Found!'
    }

    return {
        title: product.title,
        description: `this is description for ${product.title}`
    }
}




/*--------Product-Page--------*/
const ProductPage = async ({ params: { productId }}: Props) => {
   const productData: Promise<Product> = getProduct(productId)
   const product = await productData


   if (!product.id) return <h1 className="text-center text-xl">Loading...</h1>


  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='mt-14 flex gap-5'>

            {/*-------Product-Image-------*/}
            <div>
                <figure className="w-[300px] h-[350px]">
                    <Image src={product.image} width={400} height={800} alt="img" className="w-full h-full object-cover"/>
                </figure>
            </div>

            {/*-------Product-Details-------*/}
            <div>
                <h1 className='text-2xl my-2'>{product.title}</h1>
                <h2 className="text-xl my-2">${product.price}</h2>
                <p className='max-w-[400px] my-4'>{product.description}</p>
                <button className="flex-1 w-full mt-2"><Link href='/' className="w-full px-2 p-[.6rem] inline-block bg-purple-600 text-sm transition-colors hover:bg-purple-700">back to home</Link></button>
            </div>

        </div>
    </div>
  )
}

export default ProductPage


/*--------GenerateStaticParams--------*/
export const generateStaticParams = async () => {
    const productsData: Promise<Product[]> = getProducts()
    const products = await productsData

    return products.map(product => ({
        productId: product.id.toString()
    }))
}