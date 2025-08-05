import { useEffect, useState } from "react";
import type { Category } from "../types";
import classNames from "classnames";
import HamburgerIcon from "../../public/hamburger.svg";
import CloseIcon from "../../public/close.svg";

interface Props {
  menuOptions: Category[];
}
export default function BurgerMenu({ menuOptions }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOutsideHeader, setIsOutsideHeader] = useState(false);

  useEffect(() => {
    const header = document.getElementById("header-section");

    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOutsideHeader(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);

  const params = new URLSearchParams(window.location.search);

  const lang = params.get("lang") || "ru";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "p-2 z-40 fixed top-0 focus:outline-none duration-300",
          isOutsideHeader
            ? "text-secondary top-24 right-4"
            : "text-secondary left-0 top-2"
        )}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[90vw] md:w-[60vw] xl:w-[46vw] bg-secondary z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <h1
          className="px-6 pt-6 text-primary font-extralight cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Меню
        </h1>
        <nav className="flex flex-col p-6 space-y-4">
          {menuOptions.map((option) => (
            <a
              key={option.id}
              href={`/${option.slug}?lang=${lang}`}
              className="inline-flex items-center text-white text-2xl font-semibold hover:text-primary duration-300"
            >
              {option.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center space-y-10">
          <img
            src="social-coffee-logo.png"
            alt="logo"
            className="mt-20 scale-75 md:scale-90 mx-auto cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />

          <img src="social-coffee-logo-text.png" alt="logo text" />
        </div>
      </div>
    </>
  );
}
