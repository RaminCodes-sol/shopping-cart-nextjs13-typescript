'use client'
import { AddToCart, RemoveFromCart } from '@/reduxTK/productSlice'
import { useAppDispatch, useAppSelector } from '@/reduxTK/store'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillCartPlusFill, BsFillTrash3Fill } from "react-icons/bs"


type Props = {
  product: Product
}



const Product = ({ product }: Props) => {
  const { cartItems } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()


  /*--------Add-To-Cart-------*/
  const add_to_cart = (product: Product) => {
    dispatch(AddToCart(product))
  }

  /*--------Remove-From-Cart-------*/
  const remove_from_cart = (id: number) => {
    dispatch(RemoveFromCart({ id }))
  }

  
  return (
    <div className='border border-gray-700 flex gap-3 justify-between flex-col p-4 transition-colors hover:border-gray-500 rounded'>
        
      {/*-----Image-----*/}
      <Link href={`/product/${product.id}`} className='flex-1'>
        <figure className='py-3 w-full h-full'>
          <Image src={product.image} width={200} height={200} alt='img' className='w-full h-full object-cover' />
        </figure>
      </Link>

      {/*-----Title-----*/}
      <div>
        <h2 className='w-44 truncate'>{product.title}</h2>
        <span>${product.price}</span>
      </div>

      {/*-----Button-----*/}
      {
            cartItems.some(item => item.id === product.id) 
                ? <button className='w-full bg-orange-600 text-2xl flex justify-center items-center p-2 transition-colors hover:bg-orange-700' onClick={() => remove_from_cart(product.id)}><BsFillTrash3Fill /></button>
                : <button className='w-full bg-purple-600 text-2xl flex justify-center items-center p-2 transition-colors hover:bg-purple-700' onClick={() => add_to_cart(product)}><BsFillCartPlusFill /></button>
        }

    </div>
  )
}

export default Product