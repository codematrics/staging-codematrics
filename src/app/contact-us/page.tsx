"use client";
import { Input, Select } from "@/components/Contact";
import Button from "@/components/common/Button";
import Image from "next/image";
import { useRef, useState } from "react";

interface ErrorState {
  name: string | null;
  email: string | null;
  phone: string | null;
  services: string | null;
  message: string | null;
}

export default function ContactUs() {
  const [error, setError] = useState<ErrorState>({
    name: null,
    email: null,
    phone: null,
    services: null,
    message: null,
  });

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const servicesRef = useRef<HTMLSelectElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value.trim();

    if (!nameValue) {
      setError((prev: ErrorState) => ({ ...prev, name: "Name is required" }));
    } else {
      setError((prev: ErrorState) => ({ ...prev, name: "" })); // Clear error if valid
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    const emailRegex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    if (!emailValue) {
      setError((prev: ErrorState) => ({ ...prev, email: "Email is required" }));
    } else if (!emailRegex.test(emailValue)) {
      setError((prev: ErrorState) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else {
      setError((prev: ErrorState) => ({ ...prev, email: null }));
    }
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value.trim();
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    if (!phoneValue) {
      setError((prev: ErrorState) => ({
        ...prev,
        phone: "Phone number is required",
      }));
    } else if (!phoneRegex.test(phoneValue)) {
      setError((prev: ErrorState) => ({
        ...prev,
        phone: "Invalid phone number format",
      }));
    } else {
      setError((prev: ErrorState) => ({ ...prev, phone: null }));
    }
  };

  const handleServices = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const servicesValue = e.target.value.trim();

    if (!servicesValue) {
      setError((prev: ErrorState) => ({
        ...prev,
        services: "Service is required",
      }));
    } else {
      setError((prev: ErrorState) => ({ ...prev, services: null }));
    }
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const messageValue = e.target.value.trim();

    if (!messageValue) {
      setError((prev: ErrorState) => ({
        ...prev,
        message: "message is required",
      }));
    } else {
      setError((prev: ErrorState) => ({ ...prev, message: "" }));
    }
  };

  const handleSubmit = () => {
    if (
      nameRef.current?.value &&
      emailRef.current?.value &&
      servicesRef.current?.value &&
      messageRef.current?.value &&
      phoneRef.current?.value &&
      !error.name &&
      !error.email &&
      !error.services &&
      !error.message &&
      !error.phone
    ) {
    } else {
      nameRef.current?.blur();
      emailRef.current?.blur();
      phoneRef.current?.blur();
      servicesRef.current?.blur();
      messageRef.current?.blur();
    }
  };

  return (
    <section className="w-full bg-black text-white flex flex-col items-center justify-center">
      <div className="w-full flex max-900:w-[90%] max-w-[1224px]  border border-[#e5e7eb36] rounded-3xl my-5 mt-[120px]">
        <div className="w-[40%] flex">
          <Image
            alt="contact-us"
            src="/assets/images/contact-us.webp"
            height={500}
            width={300}
            className="h-auto w-full object-cover rounded-s-3xl"
          />
        </div>

        <div className="w-[60%] py-8 px-4">
          <h1 className="text-[52px] leading-[57px] max-1200:text-[48px] max-1200:leading-[53px] max-1030:text-[40px] max-1030:leading-[45px] max-600:text-[35px] max-600:leading-[40px] max-420:text-[27px] max-420:leading-[32px] font-bold text-center mb-6">
            Let's Collaborate
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl text-gray-300">
            Have a project in mind or questions about our services?
          </p>
          <p className="text-center text-base sm:text-md md:text-lg text-gray-300 mb-8">
            We'd love to help. Contact us today.
          </p>

          <div className="backdrop-blur-xs p-6 sm:p-8 max-900:px-2 rounded-lg shadow-lg w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                label={"Name"}
                onBlur={handleName}
                ref={nameRef}
                error={error.name}
              />
              <Input
                label={"Email"}
                onBlur={handleEmail}
                ref={emailRef}
                error={error.email}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                label={"Phone"}
                onBlur={handlePhone}
                ref={phoneRef}
                error={error.phone}
              />
              <Select
                options={["ReactJS development", "NodeJS development"]}
                label={"Services"}
                onBlur={handleServices}
                ref={servicesRef}
                error={error.services}
              />
            </div>
            <textarea
              onBlur={handleMessage}
              className="w-full p-3 bg-[#e5e7eb1f] text-white border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-white"
              rows={5}
              placeholder="Your message..."
            ></textarea>

            <div className="mt-6 w-full flex justify-center">
              <Button
                type={"btn"}
                onClick={handleSubmit}
                label={"Send Message"}
                href={"#"}
                showArrow
                classes={""}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
