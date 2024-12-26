import Button from "@/components/common/Button";

const TagLine = () => {
  return (
    <section className="w-full bg-white relative">
      <video autoPlay loop muted className="tagline-background-video">
        <source src="/assets/video/tagline-wave-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full text-center">
        <h1 className="text-[52px] font-bold mt-60">
          The Only Partner You’ll Need for
          <br />
          Web, App, and Software Excellence.
        </h1>
        <p className="text-2xl mt-10 px-20">
          Empowering businesses to thrive in the digital age with innovative
          web, mobile, and software solutions. <br />
          Our expert team designs and develops modern, scalable technologies to
          transform your vision
          <br /> into seamless digital experiences and maximize your ROI.
        </p>
        <div className="mt-10 flex justify-center">
          <Button label={"Contact Us"} href={""} showArrow />
        </div>
      </div>
    </section>
  );
};

export default TagLine;
