import Image from "next/image"

const SelectionCard = ({imageUrl,label,handleClick}) => {
    return(
        <Image src="/assets/svgs/front-end.svg" />

    )
}

const Technology = () => {

    return (
        <section className="w-full bg-black relative text-white">
            <p className="text-3xl sm:text-4xl md:text-5xl text-center font-bold">
                Trending Technologies
            </p>
            <p className="text-base sm:text-lg md:text-xl text-center mt-4 sm:mt-5 md:mt-6">
                We work on the best Technologies and frameworks to deliver world-class solutions to our clients.
            </p>
            {/* <Image src="/assets/svgs/front-end.svg" /> */}
        </section>
    )

}

export default Technology