import { ArrowRight, ArrowUpRight } from 'lucide-react';

const variants = {
  primary: 'btn-primary',
  light: 'btn-outline-light',
  dark: 'btn-outline-dark',
  ghost: 'btn bg-transparent px-0 py-0 font-bold tracking-[0.16em]',
};

const buttonVariants = {
  primary: 'btn-primary',
  light: 'btn-outline-light',
  dark: 'btn-outline-dark',
  ghost: 'btn bg-transparent px-0 py-0 font-bold tracking-[0.16em]',
 
gradient: 'bg-gradient-to-r from-iso-orange to-iso-blue text-white hover:from-iso-orange/90 hover:to-iso-blue/90 shadow-[0_14px_30px_-14px_rgba(244,90,10,0.9)]',
};

/**
 * Shared CTA. Renders an anchor so in-page navigation stays accessible
 * without JavaScript handlers.
 */
export default function Button({
  href = '#contact',
  children,
  variant = 'primary',
  external = false,
  arrow = true,
  className = '',
  ...rest
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <a
      href={href}
      className={`${variants[variant] || variants.primary} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {arrow && <Icon className="relative z-10 h-4 w-4" strokeWidth={2} aria-hidden="true" />}
    </a>
  );
}
