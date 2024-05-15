import PricingBox from "../components/pricebox/PricingBox";
import { prices } from "./../data";


export default function Subscraption() {


    return (
        <section className="h-screen">
            <div className="m-5 grid grid-cols-3 gap-10 w-full">

                {prices.map((price) => (
                    <PricingBox key={price.name} {...price} />
                ))}

            </div>



        </section >
    )
}

