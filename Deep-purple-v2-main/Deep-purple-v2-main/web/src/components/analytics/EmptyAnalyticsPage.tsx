export default function EmptyAnalyticsPage() {
    return (
        <section className="my-10 flex flex-col items-center h-140 justify-center">
            <div className="py-5">
                <img src="/src/assets/icons/EmptyReportBoardIcon.svg" alt="emptyPage"
                    className="invert-white" />
            </div>
            <div className="flex flex-col gap-5 items-center justify-center">
                <p className="font-bold text-md">Select the Account to Perform Analysis</p>
            </div>
        </section>
    )
}