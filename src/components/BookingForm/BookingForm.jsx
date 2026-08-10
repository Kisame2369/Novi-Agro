import { useState } from "react";
import css from "./BookingForm.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [status, setStatus] = useState("idle"); 
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.company) {
      setStatus("success");
      return;
    }

    if (!formData.name || !formData.email) {
      setStatus("error");
      setErrorMessage("Please fill in your name and email.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const dataToSend = {
        ...formData,
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setFormData(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
}

  return (
    <section className={css.bookingSection} id="booking">
      <div className={css.containerFluid}>
        <div className={css.row}>
          <div className={css.left}>
            <div className={css.content}>
              <div className={css.secTitle}>
                <div className={css.secTitleIcon} aria-hidden="true">
                  <svg
                    role="presentation"
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12pt"
                    height="10pt"
                    viewBox="0 0 12.000000 10.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g transform="translate(0.000000,10.000000) scale(0.100000,-0.100000)" stroke="none">
                      <path d="M58 84 c12 -8 22 -24 22 -34 0 -10 -10 -26 -22 -34 l-22 -16 27 0 c17 0 32 9 43 25 15 23 15 27 0 50 -11 16 -26 25 -43 25 l-27 0 22 -16z" />
                    </g>
                  </svg>
                </div>
                <span className={css.tagline}>GET IN TOUCH</span>
                <h2 className={css.title}>
                  Book a Free Professional Farming Consultation!
                </h2>
              </div>

              <p className={css.text}>
                Leave your details below and our experts will contact you to discuss how we can help your farm thrive.
              </p>

              <form className={css.Form} onSubmit={handleSubmit} noValidate>
                <div className={css.Honeypot} aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className={css.FormRow}>
                  <div className={css.Field}>
                    <label className={css.Label} htmlFor="name">Full Name *</label>
                    <input
                      className={css.Input}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={css.Field}>
                    <label className={css.Label} htmlFor="email">Email *</label>
                    <input
                      className={css.Input}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={css.Field}>
                  <label className={css.Label} htmlFor="phone">Phone</label>
                  <input
                    className={css.Input}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className={css.Field}>
                  <label className={css.Label} htmlFor="message">Additional Details</label>
                  <textarea
                    className={css.Textarea}
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your farm size, feed type, or anything else we should know."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  className={css.btn}
                  type="submit"
                  disabled={status === "submitting"}
                >
                  <span>{status === "submitting" ? "Sending..." : "Send Booking Request"}</span>
                </button>

                {status === "success" && (
                  <p className={css.SuccessMessage} role="status">
                    Thank you! Your request has been sent. We'll be in touch soon.
                  </p>
                )}

                {status === "error" && (
                  <p className={css.ErrorMessage} role="alert">
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className={css.right}>
            <div className={css.imageWrap}>
              <img
                loading="lazy"
                className={css.bigImage}
                src="/public/images/booking_vet1.png" 
                alt="Farming consultation"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}