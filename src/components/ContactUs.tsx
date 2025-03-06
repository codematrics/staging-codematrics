import Button from "./common/Button";

const ContactUs = () => {
  return (
    <section className="w-full max-768:px-[20px] px-[50px] relative text-black py-8 flex flex-col items-center justify-center mt-16 bg-[#3486dd10]">
      <div className="w-full flex justify-between gap-8 text-center">
        <div className="">
          <p className="text-[20px] leading-[25px] max-1200:text-[16px] max-1200:leading-[21px] max-1030:text-[18px] font-bold">
            Want to start a project?
            <br />
            <span className="text-[40px] leading-[45px] max-1200:text-[36px] max-1200:leading-[41px] max-1030:text-[28px] max-1030:leading-[33px] max-600:text-[23px] max-600:leading-[28px] max-420:text-[15px] max-420:leading-[20px]">
              Let's Talk
            </span>
          </p>
        </div>
        <div>
          <p>
            Get in touch with us today to schedule a free consultation and
            <br />
            receive a project quote. Our team is here to support you in reaching
            <br />
            your business goals.
          </p>
        </div>
        <div>
          <Button type="link" label="Let's Talk" href="/contact-us" showArrow />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
