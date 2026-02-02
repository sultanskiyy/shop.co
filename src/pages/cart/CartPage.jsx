import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrease, deleteProduct, increase } from '../../app/cartSlice'
import { MdOutlineDelete } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const DISCOUNT_PERCENT = 20
  const DELIVERY_PERCENT = 2

  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  // ===== EMPTY CART =====
  if (!cart || cart.length === 0) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Mahsulot tanlang
        </h2>
        <NavLink
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm"
        >
          Home’ga qaytish
        </NavLink>
      </section>
    )
  }

  // ===== CALCULATIONS =====
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const discount = cart.reduce((sum, item) => {
    if (item.rating?.count > 300) {
      return sum + (item.price * item.qty * DISCOUNT_PERCENT) / 100
    }
    return sum
  }, 0)

  const deliveryFee = (subtotal * DELIVERY_PERCENT) / 100

  const promoDiscount = promoApplied
    ? (subtotal - discount) * 0.3
    : 0

  const total = subtotal - discount - promoDiscount + deliveryFee

  return (
    <section className="py-10">
      <ToastContainer position="top-center" />

      <div className="max-w-7xl mx-auto px-4">

        {/* BREADCRUMB */}
        <div className="mb-8 px-3">
          <NavLink to="/" className="text-sm text-gray-500">Home</NavLink>
          <span className="mx-2 text-sm text-gray-500">›</span>
          <span className="text-sm text-gray-500">Cart</span>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl px-3 font-extrabold mb-8">
          YOUR CART
          <span className="block w-24 h-1 bg-blue-500 mt-1"></span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* LEFT — CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              const stars = Math.round(item.rating?.rate || 0)

              return (
                <div
                  key={item.id}
                  className="border border-gray-300 rounded-xl p-4 flex justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-24 cursor-pointer hover:scale-105 duration-300 object-contain bg-gray-100 rounded-lg p-2"
                    />

                    <div>
                      <h2 className="font-bold text-lg">
                        {item.title}
                      </h2>

                      <div className="flex gap-1 items-center mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar
                            key={i}
                            size={14}
                            className={
                              i <= stars
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                        {item?.rating?.rate && (
                          <span className="text-sm text-gray-500 ml-2">
                            ({item.rating?.rate})
                          </span>
                        )}
                      </div>

                      <p className="font-semibold mt-2">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => dispatch(deleteProduct(item.id))}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                      <MdOutlineDelete size={20} />
                    </button>

                    <div className="bg-gray-100 cursor-pointer rounded-full px-3 py-1 w-24 flex items-center justify-between">
                      <button onClick={() => dispatch(decrease(item.id))}>
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button className='cursor-pointer' onClick={() => dispatch(increase(item.id))}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6">

              <h2 className="text-lg font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee (2%)</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo IT_TIME (-30%)</span>
                    <span>- ${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <hr />

                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Add promo code"
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                />

                <button
                  onClick={() => {
                    if (promoInput === 'IT_TIME') {
                      setPromoApplied(true)
                    } else {
                      setPromoApplied(false)
                    }
                  }}
                  className="bg-black cursor-pointer text-white px-6 rounded-full text-sm"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={() => toast.success('Buyurtma qabul qilindi')}
                className="w-full bg-black cursor-pointer text-white py-4 rounded-full mt-6 text-sm font-medium"
              >
                Go to Checkout →
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CartPage
