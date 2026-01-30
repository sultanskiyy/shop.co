import React, { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard"
import useFetch from "../../hooks/useFetch"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

import { FaStar, FaCheckCircle } from "react-icons/fa"
import { MdOutlineNavigateNext } from "react-icons/md"
import { GrFormPrevious } from "react-icons/gr"

const HomePage = () => {
  const [count, setCount] = useState("Default")
  const [comments, setComments] = useState([])

  const { data: products, isLoading } = useFetch({
    url: "products",
    key: ["products"],
  })

  const categories = products?.map((el) => el.category)
  const allCategories = [...new Set(categories)]

  function viweMore(category) {
    setCount(category === count ? "Default" : category)
  }

  useEffect(() => {
    fetch("https://697c706e889a1aecfeb26851.mockapi.io/comment")
      .then((res) => res.json())
      .then((data) => setComments(data))
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <img
          src="/public/img/Trail loading.gif"
          alt="Loading..."
          className="w-32 h-32"
        />
      </div>
    )
  }

  return (
    <main>

      <section className="bg-[#F2F0F1] w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between px-4 sm:px-6 py-10 lg:py-0">

          <div className="max-w-full text-center pb-20 lg:text-left">
            <h1 className="font-black uppercase text-[36px] sm:text-[48px] lg:text-[72px] leading-[1.05] pb-4">
              FIND CLOTHES <br />
              THAT MATCHES <br />
              YOUR STYLE
            </h1>

            <p className="text-[14px] sm:text-[17px] pb-6 leading-7 text-gray-600">
              Browse through our diverse range of meticulously crafted garments,
              designed <br /> to bring out your individuality and cater to your sense of style.
            </p>

            <button className="bg-black text-white px-16 py-3 rounded-full text-sm font-medium mb-10">
              Shop Now
            </button>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center lg:justify-start">
              <div>
                <p className="font-semibold text-[32px] lg:text-[42px]">200+</p>
                <p className="text-gray-600 text-sm">International Brands</p>
              </div>

              <div className="sm:px-10 sm:border-x-2 border-gray-300">
                <p className="font-semibold text-[32px] lg:text-[42px]">2,000+</p>
                <p className="text-gray-600 text-sm">High-Quality Products</p>
              </div>

              <div>
                <p className="font-semibold text-[32px] lg:text-[42px]">30,000+</p>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-auto justify-center lg:justify-end mt-10 lg:mt-0">
            <img
              src="https://sapphireleather.com/cdn/shop/files/Rectangle_2_9e619e9d-663a-4288-ad5c-d4904c89e81f_1500x.png?v=1760274104"
              alt=""
              className="w-[260px] sm:w-[360px] lg:w-[520px] object-contain"
            />
          </div>

        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6 py-8 px-6 place-items-center">
          <img src="/public/img/versace.png" alt="" />
          <img src="/public/img/zara.png" alt="" />
          <img src="/public/img/gucci-logo-1 1.png" alt="" />
          <img src="/public/img/prada-logo-1 1.png" alt="" />
          <img src="/public/img/CalvinKlein.png" alt="" />
        </div>
      </section>

      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {allCategories.map((category) => (
            <div key={category} className="mt-12">
              <h1 className="text-center text-[24px] sm:text-[32px] font-bold mb-6">
                {category.toUpperCase()}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {(category === count
                  ? products.filter((p) => p.category === category)
                  : products
                    .filter((p) => p.category === category)
                    .slice(0, 4)
                ).map((el) => (
                  <ProductCard key={el.id} {...el} />
                ))}
              </div>

              <button
                onClick={() => viweMore(category)}
                className="mx-auto block mt-6 px-6 py-2 rounded-full border text-sm"
              >
                {category === count ? "View Less" : "View More"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F2F0F1] rounded-[40px] p-10">

            <h2 className="text-center text-[28px] md:text-[36px] font-extrabold mb-12">
              BROWSE BY DRESS STYLE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-white rounded-2xl overflow-hidden h-65 flex items-center justify-center">
                <img
                  src="/public/img/Frame 61.png"
                  alt="Casual"
                  className="object-contain"
                />
              </div>

              <div className="bg-white rounded-2xl overflow-hidden h-65 md:col-span-2 flex items-center justify-center">
                <img
                  src="/public/img/Frame 62.png"
                  alt="Formal"
                  className="object-contain"
                />
              </div>

              <div className="bg-white rounded-2xl overflow-hidden h-65 md:col-span-2 flex items-center justify-center">
                <img
                  src="/public/img/Frame 64.png"
                  alt="Party"
                  className="object-contain"
                />
              </div>

              <div className="bg-white rounded-2xl overflow-hidden h-65 flex items-center justify-center">
                <img
                  src="/public/img/Frame 63.png"
                  alt="Gym"
                  className="object-contain"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[28px] md:text-[36px] font-extrabold">
              Our Happy Customers
            </h2>

            <div className="flex gap-3">
              <button className="swiper-prev px-5 py-2 rounded-full border text-sm"><GrFormPrevious /></button>
              <button className="swiper-next px-5 py-2 rounded-full border text-sm"><MdOutlineNavigateNext /></button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: ".swiper-prev", nextEl: ".swiper-next" }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {comments.map((c) => (
              <SwiperSlide key={c.id}>
                <div className="bg-white p-6 rounded-xl border h-full">

                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                    {c.verified && <FaCheckCircle className="text-green-500" />}
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={i <= Math.round(c.rating) ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{c.rating}/5</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                    {c.comment}
                  </p>

                  <p className="text-xs text-gray-400">{c.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>

    </main>
  )
}

export default HomePage
