import React from "react";
import MainHeading from "@/components/Main_Heading";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Testimonials = () => {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      rating: 5,
      avatar:
        "https://res.cloudinary.com/dtvr83fb3/image/upload/v1754113437/cfd413c84851920d5dbc820610176e41_vubbpw.jpg",
    },
    {
      rating: 5,
      avatar:
        "https://res.cloudinary.com/dtvr83fb3/image/upload/v1754113437/eb76a46ab920d056b02d203ca95e9a22_xy1gob.jpg",
    },
    {
      rating: 4,
      avatar:
        "https://res.cloudinary.com/dtvr83fb3/image/upload/v1754113437/8d9503a77e4c21ebf0ced6c252819a0e_a3hzye.jpg",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center mb-12">
          <MainHeading title={t("title")} subTitle={t("subTitle")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={t(`reviews.${index}.name`)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">
                    {t(`reviews.${index}.name`)}
                  </h4>
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                &quot;{t(`reviews.${index}.comment`)}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
