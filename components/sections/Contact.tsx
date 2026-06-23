"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{ message: string; type: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          message: "Message envoyé avec succès !",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch {
      setStatus({
        message: "Erreur lors de l'envoi du message. Veuillez réessayer.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 px-gutter transition-all duration-1000"
    >
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <h2 className="font-label-caps text-label-caps text-primary mb-2">
              CONTACT
            </h2>
            <h3 className="font-headline-md text-headline-md mb-6">
              Discutons de votre projet
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              Prêt à transformer vos idées en réalité numérique ? N&apos;hésitez pas
              à me contacter pour une collaboration ou simplement pour dire bonjour.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary-container/20 p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant">
                    EMAIL
                  </div>
                  <a
                    href="mailto:nidhal1gharbi@gmail.com"
                    className="font-body-md text-body-md font-bold hover:text-primary transition-colors"
                  >
                    nidhal1gharbi@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary-container/20 p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant">
                    LOCATION
                  </div>
                  <div className="font-body-md text-body-md font-bold">
                    Tunisie
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-effect p-10 rounded-2xl space-y-6"
            >
              {status && (
                <div
                  className={`p-4 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {status.message}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    NOM
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-6 py-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-6 py-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-6 py-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Parlez-moi de votre projet..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
