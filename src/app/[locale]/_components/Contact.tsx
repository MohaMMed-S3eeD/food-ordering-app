import { useTranslations } from "next-intl";
import React from "react";
import MainHeading from "@/components/Main_Heading";
import Link from "@/components/Link";
import ButtonCrach from "@/components/ui/btn crach/buttonCrach";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const t = useTranslations("contactSection");
  
  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center mb-12">
          <MainHeading

          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* معلومات الاتصال */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t("phone.label")}</h3>
                  <p className="text-muted-foreground">{t("phone.value")}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t("email.label")}</h3>
                  <p className="text-muted-foreground">{t("email.value")}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t("address.label")}</h3>
                  <p className="text-muted-foreground">{t("address.value")}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-start">
              <Link href="/contact">
                <ButtonCrach className="login-btn bubbles-login">
                  {t("title")}
                </ButtonCrach>
              </Link>
            </div>
          </div>
          
          {/* خريطة حقيقية */}
          <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.2939577344736!2d46.6722!3d24.6881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f06f9df4d8cbf%3A0x9a4b9b9b9b9b9b9b!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1642781234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title={t("mapLabel")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;