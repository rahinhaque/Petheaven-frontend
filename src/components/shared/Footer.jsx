"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
} from "react-icons/md";
import "./Footer.css";

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
  { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { name: "YouTube", icon: FaYoutube, href: "https://youtube.com" },
  { name: "TikTok", icon: FaTiktok, href: "https://tiktok.com" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://linkedin.com" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Pets", href: "/all-pets" },
  { name: "My Requests", href: "/my-requests" },
  { name: "Add Pet", href: "/add-pet" },
];

const supportLinks = [
  { name: "FAQs", href: "/faqs" },
  { name: "Adoption Guide", href: "/adoption-guide" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

/* ─── Framer Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="paw-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      {/* ─── Decorative top wave ─── */}
      <div className="paw-footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,40 C360,120 720,0 1080,80 C1260,110 1380,60 1440,40 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="paw-footer__inner">
        {/* ─── Row 1: Main Content ─── */}
        <motion.div className="paw-footer__grid" variants={containerVariants}>
          {/* Column 1 — Brand & Description */}
          <motion.div className="paw-footer__col paw-footer__brand-col" variants={fadeUp}>
            <Link href="/" className="paw-footer__brand" aria-label="Paw Heaven Home">
              <Image
                src="/assets/footer.png.png"
                alt="Paw Heaven Footer Logo"
                width={80}
                height={80}
                className="paw-footer__logo-img"
              />
            </Link>
            <p className="paw-footer__tagline">
              Adopt Today, Love Forever. <br />
              <span>Find your perfect furry companion and give them a forever home.</span>
            </p>

            {/* Social icons */}
            <div className="paw-footer__socials">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paw-footer__social-link"
                  aria-label={social.name}
                  title={social.name}
                  variants={scaleIn}
                  whileHover={{ scale: 1.18, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div className="paw-footer__col" variants={fadeUp}>
            <h4 className="paw-footer__heading">Quick Links</h4>
            <ul className="paw-footer__link-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="paw-footer__link">
                    <span className="paw-footer__link-paw" aria-hidden="true">🐾</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Support */}
          <motion.div className="paw-footer__col" variants={fadeUp}>
            <h4 className="paw-footer__heading">Support</h4>
            <ul className="paw-footer__link-list">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="paw-footer__link">
                    <span className="paw-footer__link-paw" aria-hidden="true">🐾</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact Info */}
          <motion.div className="paw-footer__col" variants={fadeUp}>
            <h4 className="paw-footer__heading">Contact Us</h4>
            <ul className="paw-footer__contact-list">
              <li>
                <MdLocationOn className="paw-footer__contact-icon" />
                <span>209 West Brahmondi,Narsingdi, Dhaka 1200, Bangladesh</span>
              </li>
              <li>
                <MdPhone className="paw-footer__contact-icon" />
                <a href="tel:+8801234567890">+880 1234-567890</a>
              </li>
              <li>
                <MdEmail className="paw-footer__contact-icon" />
                <a href="mailto:hello@pawheaven.com">haquerahin743@gmail.com</a>
              </li>
              <li>
                <MdAccessTime className="paw-footer__contact-icon" />
                <span>Mon – Sat: 9 AM – 6 PM</span>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="paw-footer__newsletter">
              <p className="paw-footer__newsletter-label">Stay Updated</p>
              <form
                className="paw-footer__newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="paw-footer__newsletter-input"
                  aria-label="Email for newsletter"
                  id="footer-newsletter-email"
                />
                <button
                  type="submit"
                  className="paw-footer__newsletter-btn"
                  id="footer-newsletter-btn"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Divider ─── */}
        <motion.div
          className="paw-footer__divider"
          variants={{
            hidden: { scaleX: 0 },
            visible: {
              scaleX: 1,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}
        />

        {/* ─── Row 2: Bottom Bar ─── */}
        <motion.div className="paw-footer__bottom" variants={fadeUp}>
          <p className="paw-footer__copyright">
            © {currentYear} <strong>Paw Heaven</strong>. All rights reserved. 
            
          </p>
          <div className="paw-footer__bottom-links">
            <Link href="/privacy">Privacy</Link>
            <span className="paw-footer__dot">·</span>
            <Link href="/terms">Terms</Link>
            <span className="paw-footer__dot">·</span>
            <Link href="/faqs">FAQs</Link>
          </div>
        </motion.div>
      </div>

      {/* Floating paw decorations */}
      <div className="paw-footer__floating-paws" aria-hidden="true">
        <span className="paw-footer__paw paw-footer__paw--1">🐾</span>
        <span className="paw-footer__paw paw-footer__paw--2">🐾</span>
        <span className="paw-footer__paw paw-footer__paw--3">🐾</span>
      </div>
    </motion.footer>
  );
}
