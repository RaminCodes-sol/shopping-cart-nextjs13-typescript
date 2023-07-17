'use client'
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/reduxTK/store"
import Image from "next/image"
import { IoClose } from "react-icons/io5"
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { FaTrash } from "react-icons/fa"
import { DecreaseAmount, IncreaseAmount, RemoveFromCart } from "@/reduxTK/productSlice"



type Props = {
    setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>
}



const Cart = ({ setIsCartOpen }: Props) => {
  const { cartItems } = useAppSelector(state => state.products)
  const dispatch = useAppDispatch()
  const [totalPrice, setTotalPrice] = useState(0)



  /*-------Remove-From-Cart-------*/
  const remove_from_cart = (id: number) => {
    dispatch(RemoveFromCart({ id }))
  }

  /*-------Increase-Amount-------*/
  const increase_amount = (id: number) => {
    dispatch(IncreaseAmount({ id }))
  }

  /*-------Decrease-Amount-------*/
  const decrease_amount = (id: number) => {
    dispatch(DecreaseAmount({ id }))
  }

  
  /*-------Total-Price-------*/
  useEffect(() => {
    if (cartItems.length) {
        const { total } = cartItems.reduce((acc, value) => {
            const { price, amount } = value
            const quantity = amount * price
            acc.total += quantity
            return acc
        }, {
            total: 0
        })

        setTotalPrice(total)
    }
  }, [cartItems])


  return (
    <aside className='w-screen h-screen bg-black/50 fixed top-0 left-0 z-50'>
        <div className='w-full max-w-[600px] h-screen bg-[#141414] absolute top-0 right-0 px-5'>
            
            {/*-------Cart-Title-------*/}
            <div className="flex justify-between items-center px-12 py-3 pt-7 border-b border-b-gray-600">
                <h2>Cart items</h2>
                <button className='text-3xl' onClick={() => setIsCartOpen(false)}><IoClose /></button>
            </div>

            {
                cartItems.length === 0 
                    ? <h2 className="text-center mt-8">cart is empty</h2>
                    : <>

                        {/*-------Cart-Items-------*/}
                        <div className="p-3 mt-4 h-[300px] overflow-y-scroll">
                            {
                                cartItems.map(item => {
                                    return (
                                        <div key={item.id} className="flex justify-between items-center px-5 py-3 border-b-[1.5px] border-b-gray-600">
                                            <figure className="w-[60px] h-[60px]">
                                                <Image src={item.image} width={100} height={100} alt="img"  />
                                            </figure>
            
                                            <div className="flex flex-col">
                                                <h4 className='w-44 truncate'>{item.title}</h4>
                                                <span>${item.price}</span>
                                            </div>
            
                                            <div className='text-2xl flex flex-col gap-2 items-center'>
                                                <button onClick={() => increase_amount(item.id)} className="bg-white text-black"><IoIosArrowUp /></button>
                                                <span className="inline-block text-base">{item.amount}</span>
                                                <button onClick={() => decrease_amount(item.id)} className="bg-white text-black"><IoIosArrowDown /></button>
                                            </div>
                                            
                                            <div>
                                                <button onClick={() => remove_from_cart(item.id)} className="text-2xl p-2"><FaTrash /></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/*-------Cart-Checkout-------*/}
                        <div className="mt-4 flex flex-col gap-4 border-t border-t-orange-600 pt-4">
                            <div className='w-full flex justify-between px-8'>
                                <span>Subtotal</span>
                                <h4>${ totalPrice.toFixed(2) }</h4>
                            </div>
                            <div className='w-full flex justify-between px-8'>
                                <span>Tax incl:</span>
                                <h4>$1.7</h4>
                            </div>
                            <div className='w-full flex justify-between px-8'>
                                <span>Total:</span>
                                <h4>${ (totalPrice + 1.7).toFixed(2) }</h4>
                            </div>
                            <div className="px-8">
                                <button className="w-full p-2 bg-orange-600 transition-colors hover:bg-orange-700">Checkout</button>
                            </div>
                        </div>

                    </>
            }

        </div>
    </aside>
  )
}

export default Cart