import { useState } from 'react';
import { Send, Phone, Mail, Wrench, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { activeServices } from '../../data/services';

const FIELDS = [
  { id: 'request-name', name: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
  {
    id: 'request-contact',
    name: 'contact',
    label: 'Phone or email',
    type: 'text',
    autoComplete: 'email',
    required: true,
  },
];

export default function ServiceRequestForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('pending');
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-visible bg-iso-soft-white py-16 sm:py-20 lg:py-24"
      style={{ marginBottom: '2rem' }}
    >
      <div className="shell">
        {/* Header - Full width */}
        <div className="mb-8">
          <div className="eyebrow text-navy mb-3">
            <span className="h-px w-8 bg-iso-orange inline-flex mr-3" />
            <span className="font-display text-[0.66rem] font-semibold uppercase tracking-wide2">
              Get In Touch
            </span>
          </div>

          <h2 className="font-bold leading-[0.96] text-navy text-[clamp(1.6rem,3vw,2.2rem)]">
            Request a Service
          </h2>

          <p className="text-[0.95rem] leading-relaxed text-iso-charcoal/70 max-w-2xl mt-2">
            Tell us what your space needs — our team will follow up within one business day.
          </p>
        </div>

        {/* Main content - Horizontal layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left - Contact Info */}
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/15">
                <Phone className="h-4 w-4 text-iso-orange" />
              </div>
              <div>
                <p className="font-display text-[0.58rem] uppercase tracking-wide2 text-navy/55">Contact</p>
                <p className="font-display text-[0.9rem] font-semibold text-navy">(410) 555-0128</p>
                <p className="text-[0.78rem] text-iso-charcoal/60">Mon–Fri, 7am–6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/15">
                <MapPin className="h-4 w-4 text-iso-orange" />
              </div>
              <div>
                <p className="font-display text-[0.58rem] uppercase tracking-wide2 text-navy/55">Location</p>
                <p className="font-display text-[0.9rem] font-semibold text-navy">{siteConfig.address.line1}</p>
                <p className="text-[0.78rem] text-iso-charcoal/60">{siteConfig.address.city}, {siteConfig.address.stateAbbr} {siteConfig.address.postalCode}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/15">
                <Clock className="h-4 w-4 text-iso-orange" />
              </div>
              <div>
                <p className="font-display text-[0.58rem] uppercase tracking-wide2 text-navy/55">Response Time</p>
                <p className="text-[0.78rem] font-semibold text-navy">Same-day for urgent</p>
                <p className="text-[0.78rem] text-iso-charcoal/60">1–2 days for non-urgent</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 pt-3 border-t border-navy/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-iso-orange" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy/60">Heating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-iso-blue" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy/60">Cooling</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-iso-navy" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy/60">Maintenance</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white border border-navy/10 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 border-b border-navy/10 pb-3">
              <div>
                <p className="font-display text-[0.58rem] font-semibold uppercase tracking-wide2 text-iso-blue">
                  Request Service
                </p>
                <p className="text-[0.78rem] text-iso-charcoal/50 mt-1 max-w-[70%]">
                  Tell us what your space needs and we will follow up.
                </p>
              </div>
              <span className="shrink-0 border border-navy/10 px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.16em] text-navy/45">
                Step 1 of 2
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label htmlFor={field.id} className="font-display text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-navy/50">
                    {field.label}
                    {field.required && <span className="ml-0.5 text-iso-orange">*</span>}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    className="w-full border-b border-navy/15 bg-transparent pb-1.5 text-[0.85rem] text-navy placeholder:text-navy/25 transition focus:border-iso-orange focus:outline-none"
                    placeholder={field.name === 'name' ? 'Your name' : 'Phone or email'}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="request-service" className="font-display text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-navy/50">
                  Service <span className="text-navy/30 ml-0.5">*</span>
                </label>
                <select
                  id="request-service"
                  name="service"
                  defaultValue=""
                  className="w-full appearance-none border-b border-navy/15 bg-transparent pb-1.5 text-[0.85rem] text-navy transition focus:border-iso-orange focus:outline-none"
                >
                  <option value="" className="bg-white">Select a service</option>
                  {activeServices.slice(0, 6).map((service) => (
                    <option key={service.id} value={service.id} className="bg-white">
                      {service.label}
                    </option>
                  ))}
                  <option value="other" className="bg-white">Something else</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="request-notes" className="font-display text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-navy/50">
                  Notes <span className="normal-case tracking-normal text-navy/35">(optional)</span>
                </label>
                <textarea
                  id="request-notes"
                  name="notes"
                  rows={2}
                  className="w-full resize-none border-b border-navy/15 bg-transparent pb-1.5 text-[0.85rem] text-navy placeholder:text-navy/25 transition focus:border-iso-orange focus:outline-none"
                  placeholder="System type, timing, anything useful"
                />
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="submit" className="btn-primary inline-flex text-[0.72rem] py-2.5 px-5">
                <span>Send request</span>
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <p className="text-[0.65rem] leading-relaxed text-navy/40 max-w-[20ch]">
                This form is ready for the backend integration.
              </p>
            </div>
          </div>
        </div>

        {/* Helpful tip */}
        <div className="mt-5 flex items-center gap-2.5 border border-navy/10 bg-iso-ice px-4 py-2.5">
          <div className="h-4 w-4 shrink-0 rounded-full bg-iso-orange/10 flex items-center justify-center">
            <Wrench className="h-2.5 w-2.5 text-iso-orange" />
          </div>
          <p className="text-[0.72rem] text-iso-charcoal/60">
            Not sure which service you need? Describe your issue in the notes.
          </p>
        </div>
      </div>
    </section>
  );
}
