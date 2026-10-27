import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import Button from '../ui/Button';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function MobileNavigation({ open, onClose, activeHref }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[70] bg-navy-deep px-6 pb-10 pt-6 lg:hidden"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[0.68rem] font-semibold uppercase tracking-wide2 text-white/55">
              Navigation
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center border border-white/20 text-white transition hover:border-white/60"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-col gap-1"
          >
            {siteConfig.navigation.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={itemVariants}
                onClick={onClose}
                data-active={activeHref === item.href}
                className="group flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[1.75rem] font-bold tracking-mega text-white"
              >
                <span className="text-[0.65rem] font-semibold text-iso-orange">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  {item.label}
                </span>
                {activeHref === item.href && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-iso-blue" aria-hidden="true" />
                )}
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col gap-4"
          >
            <Button href={siteConfig.cta.primary.href} onClick={onClose} variant="primary">
              {siteConfig.cta.primary.label}
            </Button>
            <p className="text-sm leading-relaxed text-white/55">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
