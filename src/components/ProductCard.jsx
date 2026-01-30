import React from "react"
import { Link } from "react-router-dom"

const ProductCard = ({ image, title, price, rating, id }) => {
    const hasDiscount = rating?.count > 300
    const discountPercent = 20

    const oldPrice = hasDiscount
        ? Math.round(price / (1 - discountPercent / 100))
        : null

    return (
        <Link to={`product/${id}`} className="max-w-112.5 w-full py-4 px-2">
            <div className="h-70 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full py-4 px-4 object-contain"
                />
            </div>
            <div className="flex flex-col gap-2 mt-3">
                <h1 className="text-[18px] line-clamp-2 font-semibold">
                    {title}
                </h1>
                <div className="flex items-center gap-1 text-sm">
                    ⭐ {rating?.rate}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">
                        ${price}
                    </span>
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
            </div>
        </Link>
    )
}

export default ProductCard
