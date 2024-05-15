export default function EmptyStreamPage() {
    return (
        <section className="my-10 flex flex-col items-center h-160 justify-center">
            <div className="py-5">
                <img src="/src/assets/icons/EmptyReportBoardIcon.svg" alt="emptyPage"
                    className="invert-white" />
            </div>
            <div className="flex flex-col gap-5 items-center justify-center">
                <p className="font-bold text-md">Create or click on dashboard to add Social Media Stream</p>
                <p className="ml-5 px-5 text-sm max-w-sm">
                    Switch between dashboards to view different social media streams
                </p>
            </div>
        </section>

    )
}