import Button from "@/components/common/Button";

const TagLine = () => {
  return (
    <section className="w-full min-h-dvh bg-white relative">
      <video autoPlay loop muted className="w-full min-h-dvh object-cover">
        <source src="/assets/video/tagline-wave-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full flex justify-center items-center">
        <div className="text-center w-[60%] max-1500:w-[75%] max-1200:w-[80%] max-768:w-full max-768:px-[40px] max-600:px-[20px]">
          <h1 className="text-[52px] max-1200:text-[48px] max-1030:text-[40px] max-600:text-[35px] max-420:text-[27px] font-bold">
            The Only Partner You&apos;ll Need for Web, App, and Software
            Excellence.
          </h1>
          <p className="text-[18px] w-[80%] max-1200:text-[16px] max-1030:text-[14px] max-600:text-[12px] max-1030:w-[90%] max-600:w-full mt-5 opacity-80 mx-auto">
            Empowering businesses with innovative web, mobile, and software
            solutions to transform visions into seamless digital experiences and
            maximize ROI.
          </p>
          <div className="mt-10 flex justify-center">
            <Button label={"Let's discuss your Project"} href={""} showArrow />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagLine;
