import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

const SinglePage = () => {
  const { id } = useParams()

  const { data, isLoading, isFetching } = useFetch({
    url: `products/${id}`,
    key: ['product', id],
  })

  const singleProduct = data

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('Large')

  if (isLoading || isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <p>Loading...</p>
      </div>
    )
  }

  const price = singleProduct?.price || 0
  const hasDiscount = singleProduct?.rating?.count > 300
  const discountPercent = 40
  const oldPrice = hasDiscount
    ? Math.round(price / (1 - discountPercent / 100))
    : null

  const rate = singleProduct?.rating?.rate || 0
  const fullStars = Math.floor(rate)
  const hasHalfStar = rate % 1 >= 0.5

  return (
    <section className="pt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-sm text-gray-500 mb-6">
          <NavLink to="/">Home</NavLink> <span className="mx-1">›</span> Shop{' '}
          <span className="mx-1">›</span> Men <span className="mx-1">›</span>{' '}
          T-shirts
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Images */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="w-30 h-41 bg-gray-100 rounded-xl flex items-center justify-center border cursor-pointer"
                >
                  <img
                    src={singleProduct?.image}
                    alt="preview"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              ))}
            </div>

            <div className="w-105 h-130 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-blue-500">
              <img
                src={singleProduct?.image}
                alt={singleProduct?.title}
                className="w-full h-full object-contain p-6"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-[32px] font-extrabold">
              {singleProduct?.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  if (i < fullStars)
                    return (
                      <span key={i} className="text-yellow-400">★</span>
                    )
                  if (i === fullStars && hasHalfStar)
                    return (
                      <span key={i} className="text-yellow-400">☆</span>
                    )
                  return (
                    <span key={i} className="text-gray-300">★</span>
                  )
                })}
              </div>
              <span className="text-sm text-gray-600">{rate}/5</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-[24px] font-bold">${price}</span>
              {hasDiscount && (
                <>
                  <span className="line-through text-gray-400">
                    ${oldPrice}
                  </span>
                  <span className="bg-red-100 text-red-500 text-sm px-2 py-0.5 rounded-full">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-6 mb-1 max-w-md">
              {singleProduct?.description}
            </p>

            <hr className="mb-6" />

            {/* Colors */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-1">Select Colors</p>
              <div className="flex gap-4">
                {['#4B4A36', '#1F3D3A', '#2E2F4A'].map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center
                      ${selectedColor === index ? 'ring-2 ring-black' : ''}`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === index && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <hr className="mb-3" />

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Choose Size</p>
              <div className="flex gap-3">
                {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full text-sm
                      ${selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr className="mb-6" />

            {/* Add to Cart (only button) */}
            <button className="w-full bg-black text-white py-3 rounded-full">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SinglePage
