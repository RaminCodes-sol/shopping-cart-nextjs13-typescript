import Products from "@/components/Products"
import getProducts from "@/lib/getProducts"



export default async function Home() {
  const productsData: Promise<Product[]> = getProducts()
  const products = await productsData


  return (
    <main className='w-full max-w-[1200px] mx-auto border mt-[6rem] px-4'>
      <Products products={products} />
    </main>
  )
}
