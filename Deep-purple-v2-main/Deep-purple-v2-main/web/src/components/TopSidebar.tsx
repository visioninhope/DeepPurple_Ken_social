interface TopSidebarProps {
    title: string | undefined;
}

export default function TopSidebar({ title }: TopSidebarProps) {
    return (
        <section className="sticky top-0 z-50 bg-purple-2 w-full">
            <div className="flex justify-between py-5 px-5 ">
                <p className="font-bold text-3xl text-light-1">{title}</p>

                <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded">
                    Sign Out
                </button>

            </div>
            <hr />
        </section>


    )
}
