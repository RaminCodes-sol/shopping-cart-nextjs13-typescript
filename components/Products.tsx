'use client'
import { useState } from "react"
import Product from "@/components/Product"
import Category from "./Category"


type Props = {
  products: Product[]
}


const Products = ({ products }: Props) => {
  const [ category, setCategory] = useState("all")


  return (
    <section>
      <Category setCategory={setCategory} />

      <div className="grid grid-cols-fluid gap-6 mt-10">
        {
          category === 'all' 
            ? products.map((product: Product) => <Product key={product.id} product={product} />)
            : products.filter(product => product.category === category).map(product => <Product key={product.id} product={product} />)
        }
      </div>
    </section>
  )
}

export default Products