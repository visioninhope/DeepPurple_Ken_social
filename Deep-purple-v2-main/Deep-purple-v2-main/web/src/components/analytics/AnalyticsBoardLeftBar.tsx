import { NavLink } from "react-router-dom"
import { MyNavLink } from "../../types"
import { analyticsBoardLinks } from "../../constants"

export default function AnalyticsBoardLeftBar() {



    return (
        <nav className="py-5 flex-col justify-between min-w-[250px] max-w-[250px] bg-purple-2 h-screen border-r border-gray-300 fixed">
            <div className="flex flex-row justify-center items-center mb-5">
                <p className=" text-2xl font-bold">Analytics</p>



            </div>

            <ul className='px-2 py-5 flex flex-col gap-3 border-t-2'>

                {analyticsBoardLinks?.map((link: MyNavLink) => {
                    return (
                        <li key={link.label} className='rounded-full base-medium hover:bg-primary-500 transition'>
                            <NavLink to={link.route}
                                className="flex flex-row gap-3
                                    items-center p-4"
                            >
                                <img src={link.imgURL} alt={link.label}
                                    className={``} width={30} height={30}
                                />
                                <p className="text-sm">{link.label}</p>

                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

