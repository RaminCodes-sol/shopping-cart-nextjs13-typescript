'use client'
import { useState } from 'react'
import { useAppSelector } from '@/reduxTK/store'
import { Cross as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import Cart from "@/components/Cart"




const Navbar = () => {
    const [isOpen, setOpen] = useState(false)
    const { cartItems } = useAppSelector(state => state.products)
    const [ isCartOpen, setIsCartOpen] = useState(false)


    return (
        <nav className='flex justify-between items-center pl-2 pr-4 py-4 md:px-7 text-white fixed top-0 z-10 w-full bg-[#141414]/80'>

            {/*-------Left-Side-------*/}
            <div className="flex items-center gap-4">
                <Hamburger toggled={isOpen} toggle={setOpen} size={29}/>
                <Link href='/' className='font-BebasNeue font-semibold'>EasyShop</Link>
            </div>


            {/*-------Right-Side-------*/}
            <div className='flex items-center  gap-1'>
                <button className='cursor-pointer' onClick={() => setIsCartOpen(true)}>My Cart</button>
                <span className='flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white mix-blend-difference text-sm leading-snug'>{cartItems.length}</span>
            </div>
            
            { isCartOpen ? <Cart setIsCartOpen={setIsCartOpen} /> : ''}
        </nav>
    )
}

export default Navbar