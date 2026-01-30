import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { IoSearch } from "react-icons/io5"
import { HiMenu, HiX } from "react-icons/hi"


const Header = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-white ">
                <div className="max-w-7xl mx-auto flex items-center px-6 py-4 gap-8">

                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden text-2xl"
                            onClick={() => setOpen(true)}
                        >
                            <HiMenu />
                        </button>

                        <h1 className="text-xl font-extrabold">
                            <NavLink to="/">SHOP.CO</NavLink>
                        </h1>
                    </div>

                    {/* NAV LINKS — DESKTOP */}
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                        <NavLink className="hover:text-gray-500">Shop</NavLink>
                        <NavLink className="hover:text-gray-500">On Sale</NavLink>
                        <NavLink className="hover:text-gray-500">New Arrivals</NavLink>
                        <NavLink className="hover:text-gray-500">Brands</NavLink>
                    </nav>

                    {/* SEARCH */}
                    <div className="hidden lg:block relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm outline-none"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <IoSearch />
                        </span>
                    </div>

                    {/* ICONS */}
                    <div className="ml-auto flex items-center gap-4 text-xl">
                        <IoSearch className="lg:hidden" />
                        <FiShoppingCart />
                        <CgProfile />
                    </div>
                </div>
            </header>


            {/* OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* MOBILE MENU */}
            <div
                className={`
          fixed top-0 left-0 h-full w-64 bg-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <h2 className="font-bold text-lg">Menu</h2>
                    <button onClick={() => setOpen(false)} className="text-2xl">
                        <HiX />
                    </button>
                </div>

                <nav className="flex flex-col gap-4 px-6 py-6 text-sm font-medium">
                    <NavLink onClick={() => setOpen(false)}>Shop</NavLink>
                    <NavLink onClick={() => setOpen(false)}>On Sale</NavLink>
                    <NavLink onClick={() => setOpen(false)}>New Arrivals</NavLink>
                    <NavLink onClick={() => setOpen(false)}>Brands</NavLink>
                </nav>
            </div>
        </>
    )
}

export default Header
