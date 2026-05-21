"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Pets", href: "/all-pets" },
  { name: "My Requests", href: "/dashboard/requests" },
  { name: "Add Pet", href: "/dashboard/add-pet" },
];

/* ─── Framer Motion Variants ─── */
const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.35, ease: "easeOut" },
  }),
};

const rightSectionVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.5, duration: 0.4, ease: "easeOut" },
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const drawerVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const drawerLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Shrink navbar on scroll
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const { data, isPending, error } = authClient.useSession();
  const user = data?.user;
  const session = data?.session;

  // Debug logging
  useEffect(() => {
    if (isPending) {
      console.log("⏳ Navbar: Session is loading...");
    } else if (error) {
      console.error("❌ Navbar: Session error:", error);
    } else if (data) {
      console.log("👤 User:", data.user);
      console.log("🔑 Session:", data.session);
    } else {
      console.log("👤 Navbar: No user logged in");
    }
  }, [data, isPending, error]);

  // Handle sign out
  const handleSignOut = async () => {
    await authClient.signOut();
    setProfileOpen(false);
    setMobileOpen(false);
  };

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <motion.nav
        className={`paw-navbar${scrolled ? " paw-navbar--scrolled" : ""}`}
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <div className="paw-navbar__inner">
          {/* ─── Left: Logo + Nav Links ─── */}
          <div className="paw-navbar__left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            >
              <Link
                href="/"
                className="paw-navbar__brand"
                aria-label="Paw Heaven Home"
              >
                <Image
                  src="/assets/navImg.png.png"
                  alt="Paw Heaven Logo"
                  width={100}
                  height={100}
                  className="paw-navbar__logo-img"
                  priority
                />
                <span className="paw-navbar__brand-text">
                  Pet <span className="paw-navbar__brand-accent">Heaven</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop nav links */}
            <ul
              className="paw-navbar__links"
              role="navigation"
              aria-label="Main navigation"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                >
                  <Link
                    href={link.href}
                    className={`paw-navbar__link${
                      pathname === link.href ? " paw-navbar__link--active" : ""
                    }`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.span>
                    <span className="paw-navbar__link-indicator" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ─── Right: Profile Dropdown + Auth Buttons ─── */}
          <motion.div
            className="paw-navbar__right"
            initial="hidden"
            animate="visible"
            variants={rightSectionVariants}
          >
            {isPending ? (
              // Loading state
              <div className="paw-navbar__loading">Loading...</div>
            ) : user ? (
              // ─── LOGGED IN: Profile Dropdown + Logout ───
              <>
                {/* Profile dropdown */}
                <div className="paw-navbar__profile" ref={profileRef}>
                  <motion.button
                    className="paw-navbar__profile-btn"
                    onClick={() => setProfileOpen((v) => !v)}
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                    aria-label="Profile menu"
                    id="navbar-profile-btn"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {/* User avatar - shows image if available, else initials */}
                    <span className="paw-navbar__avatar">
                      {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          width={32}
                          height={32}
                          className="paw-navbar__avatar-img"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="paw-navbar__avatar-initials">
                          {getInitials(user.name)}
                        </span>
                      )}
                    </span>
                    <span className="paw-navbar__user-name">
                      {user.name || user.email}
                    </span>
                    <motion.svg
                      className="paw-navbar__chevron"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="16"
                      height="16"
                      animate={{ rotate: profileOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </motion.button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        className="paw-navbar__dropdown paw-navbar__dropdown--open"
                        role="menu"
                        aria-label="Profile options"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                      >
                        <div className="paw-navbar__dropdown-header">
                          <span className="paw-navbar__dropdown-name">
                            {user.name}
                          </span>
                          <span className="paw-navbar__dropdown-email">
                            {user.email}
                          </span>
                        </div>
                        <Link
                          href="/dashboard"
                          className="paw-navbar__dropdown-item"
                          role="menuitem"
                          onClick={() => setProfileOpen(false)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                          </svg>
                          Dashboard
                        </Link>
                        <button
                          className="paw-navbar__dropdown-item paw-navbar__dropdown-item--danger"
                          role="menuitem"
                          onClick={handleSignOut}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                          </svg>
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Desktop Logout Button */}
                <motion.button
                  className="paw-navbar__btn paw-navbar__btn--logout"
                  onClick={handleSignOut}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              // ─── GUEST: Login + Signup Buttons ───
              <>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/login"
                    className="paw-navbar__btn paw-navbar__btn--login"
                    id="navbar-login-btn"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="paw-navbar__btn paw-navbar__btn--signup"
                    id="navbar-signup-btn"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}

            {/* Hamburger toggle (mobile) */}
            <button
              className={`paw-navbar__hamburger${
                mobileOpen ? " paw-navbar__hamburger--active" : ""
              }`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              id="navbar-hamburger"
            >
              <span />
              <span />
              <span />
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* ─── Mobile Drawer Overlay + Drawer (AnimatePresence) ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="paw-drawer-overlay paw-drawer-overlay--visible"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
            />

            <motion.aside
              className="paw-drawer paw-drawer--open"
              aria-label="Mobile navigation"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              {/* Drawer header */}
              <div className="paw-drawer__header">
                <Link
                  href="/"
                  className="paw-drawer__brand"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src="/assets/navImg.png.png"
                    alt="Paw Heaven Logo"
                    width={42}
                    height={42}
                    className="paw-navbar__logo-img"
                  />
                  <span className="paw-navbar__brand-text">
                    Pet <span className="paw-navbar__brand-accent">Heaven</span>
                  </span>
                </Link>
                <motion.button
                  className="paw-drawer__close"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>

              {/* Drawer nav links */}
              <ul className="paw-drawer__links">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={drawerLinkVariants}
                  >
                    <Link
                      href={link.href}
                      className={`paw-drawer__link${
                        pathname === link.href
                          ? " paw-drawer__link--active"
                          : ""
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Drawer divider */}
              <motion.div
                className="paw-drawer__divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                style={{ transformOrigin: "left" }}
              />

              {/* Drawer auth */}
              <motion.div
                className="paw-drawer__auth"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
              >
                <Link
                  href="/dashboard"
                  className="paw-drawer__link"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>

                {user ? (
                  <>
                    <div className="paw-drawer__user-info">
                      {user.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.image}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="paw-drawer__avatar"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="paw-drawer__user-name">
                        {user.name || user.email}
                      </span>
                    </div>
                    <button
                      className="paw-navbar__btn paw-navbar__btn--logout paw-drawer__btn"
                      onClick={handleSignOut}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="paw-navbar__btn paw-navbar__btn--login paw-drawer__btn"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="paw-navbar__btn paw-navbar__btn--signup paw-drawer__btn"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </motion.div>

              {/* Paw print decoration */}
              <motion.div
                className="paw-drawer__decoration"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                🐾
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
