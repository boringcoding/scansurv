import { createGlobalStyle } from "styled-components"
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro"
import { config, dom } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const CustomStyles = createGlobalStyle`

// custom bits
#professionally_qualified + section .swiper {
  overflow: visible !important;
}

// Add fa css @see https://github.com/FortAwesome/react-fontawesome/issues/284
${dom.css()}

  ::placeholder {
    ${tw`text-sm`}
  }

  ::selection {
    ${tw`bg-primary text-white`}
  }

  .grecaptcha-badge {
    ${tw`hidden!`}
  }

  main {
    ${tw`overflow-hidden`}
  }

  html {
    ${tw`whitespace-pre-line fontSize[calc(0.7rem + 0.5vw)] mdmax:fontSize[calc(0.85rem + 0.5vw)]`}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* scroll-behavior: smooth; - Added via component & wrapped app */
    &.light [alt="scocm_accred.svg"] {
      ${tw`filter invert`}
    }
  }

  a {
    ${tw`transition ease-in-out duration-300 font-normal cursor-pointer`}
  }

  body {
   ${tw`transition-all ease-in-out duration-300 font-light text-base text-white max-w-full first:mt-0 last:mb-0`}
   background-color: #000000;
  background-image: url("/pattern.png");
  background-repeat: repeat;
  }

  p {
    ${tw`my-3`}
  }

  strong {
    ${tw`font-bold`}
  }

  ul > li {
    ${tw`before:(content backgroundImage[url("/bullet.png")] bg-cover absolute width[0.5rem] height[0.5rem] left-1 transform top-1/2 -translate-y-1/2)`}
  }
  ol > li {
    ${tw`before:(content[counter(list-item, var(--list-counter-style, decimal)) "."] absolute font-normal text-gray-500 left-0)`}
  }
  ul, ol {
    ${tw`my-3`}
    & ul, & ol {
      ${tw`my-2`}
    }
    & li {
      ${tw`relative pl-4 my-2`}
      & p {
        ${tw`my-2`}
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    ${tw`font-serif text-primary font-bold mt-0 mb-3 uppercase tracking-wider`}
  }

  h1 {
    ${tw`text-headingXl`}
  }

  h2 {
    ${tw`text-headingLg`}
  }

  h3 {
    ${tw`text-headingBase`}
  }

  h4 {
    ${tw`text-headingSm`}
  }

  h5 {
    ${tw`text-xl`}
  }

  h6 {
    ${tw`text-lg`}
  }

  h2 + *, h3 + *, h4 + * {
    ${tw`mt-0`}
  }

  hr {
    ${tw`border-t border-gray-200 my-6`}
    & * {
      ${tw`mt-0`}
    }
  }

  figure {
    ${tw`my-4`}
    & > * {
      ${tw`my-0`}
    }
    & figcaption {
      ${tw`text-gray-500 text-sm mt-2`}
    }
  }

  img {
    ${tw`my-0`}
  }

  video, iframe, iframe video {
    object-fit: cover;
    max-width: 100%;
    width: 100%;
    margin: 0;
    line-height: 1;
    border: none;
    ${tw`my-4`}
  }

  table {
    ${tw`w-full table-auto text-left my-4 text-sm`}
    & thead {
      ${tw`text-gray-900 font-bold border-b border-gray-200`}
      & th {
        ${tw`align-bottom p-2 first:pl-0 last:pr-0`}
      }
    }
    & tbody {
      & tr {
        ${tw`border-b border-gray-200 last:border-b-0`}
      }
      & td {
        ${tw`align-top p-2 first:pl-0 last:pr-0`}
      }
    }
  }

  blockquote {
    ${tw`font-normal italic border-l-2 border-gray-200 my-3 pl-3`}
    quotes: "\201C""\201D""\2018""\2019";
    & p {
      ${tw`first:before:(content[open-quote]) last:after:(content[close-quote])`}
    }
  }

/**
 * nprogress
 */
#nprogress {
  ${tw`pointer-events-none`}
}

#nprogress .bar {
  ${tw`bg-primary fixed top-0 left-0`}
  z-index: 1031;
  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  ${tw`block absolute right-0`}

  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d;
  opacity: 1.0;
  transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  ${tw`block fixed`}
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  ${tw`border-2 rounded-full border-primary border-b-0 border-r-0`}
  width: 18px;
  height: 18px;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  ${tw`overflow-hidden relative`}
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  ${tw`absolute`}
}

@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/**
 * Swiper js
 *
 * Navigation
 * @see node_modules/swiper/components/navigation/navigation.scss
 */
:root {
  --swiper-navigation-size: calc(20px + 2.5vw);
}
.swiper-button-prev,
.swiper-button-next {
  ${tw`absolute top-1/2 flex items-center justify-center cursor-pointer text-primary!`}
  width: calc(var(--swiper-navigation-size) / 84 * 27);
  height: var(--swiper-navigation-size);
  margin-top: calc(-1 * var(--swiper-navigation-size) / 2);
  z-index: 10;
  &.swiper-button-disabled {
    ${tw`cursor-auto pointer-events-none`}
    opacity: 0.35;
  }
  & svg {
    width: 100% !important;
    height: var(--swiper-navigation-size);
  }
}
.swiper-button-prev,
.swiper-rtl .swiper-button-next {
  left: 10px;
  right: auto;
}
.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  right: 10px;
  left: auto;
}

.swiper-button-lock {
  display: none;
}

/**
 * Swiper js
 *
 * pagination styles
 * @see node_modules/swiper/components/pagination
 */
 .swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 0.3s opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}
.swiper-pagination-bullets-dynamic {
  overflow: hidden;
  font-size: 0;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transform: scale(0.33);
  position: relative;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
  transform: scale(0.33);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
  transform: scale(0.33);
}
.swiper-pagination-bullet {
  ${tw`font-serif text-lg tracking-wider`};
  &:hover {
  text-decoration: line-through;
  text-decoration-color: ${theme("colors.primary")};
  }
  display: inline-block
}
button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
}
.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}
.swiper-pagination-bullet:only-child {
  display: none !important;
}
.swiper-pagination-bullet-active {
  text-decoration: line-through;
  text-decoration-color: ${theme("colors.primary")}
}
.swiper-vertical > .swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.swiper-vertical
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 6px 0;
  display: block;
}
.swiper-vertical
  > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
}
.swiper-vertical
  > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic
  .swiper-pagination-bullet {
  display: inline-block;
  transition: 0.2s transform, 0.2s top;
}
.swiper-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 4px;
}
.swiper-horizontal
  > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.swiper-horizontal
  > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic
  .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s left;
}
.swiper-horizontal.swiper-rtl
  > .swiper-pagination-bullets-dynamic
  .swiper-pagination-bullet {
  transition: 0.2s transform, 0.2s right;
}
.swiper-pagination-progressbar {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
}
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: left top;
}
.swiper-rtl
  .swiper-pagination-progressbar
  .swiper-pagination-progressbar-fill {
  transform-origin: right top;
}
.swiper-horizontal > .swiper-pagination-progressbar,
.swiper-vertical
  > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}
.swiper-horizontal
  > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
.swiper-vertical > .swiper-pagination-progressbar {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}
.swiper-pagination-white {
  --swiper-pagination-color: #fff;
}
.swiper-pagination-black {
  --swiper-pagination-color: #000;
}
.swiper-pagination-lock {
  display: none;
}

/**
 * Swiper js
 *
 * base styles
 * @see node_modules/swiper/swiper.scss
 */
.swiper {
  ${tw`mx-auto relative overflow-hidden list-none p-0`}
  /* Fix of Webkit flickering */
  z-index: 1;
}

.swiper-wrapper {
  ${tw`relative w-full h-full flex box-content`}
  z-index: 1;
  transition-property: transform;
}
.swiper-android .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}
.swiper-multirow > .swiper-wrapper {
  flex-wrap: wrap;
}
.swiper-multirow-column > .swiper-wrapper {
  flex-wrap: wrap;
  flex-direction: column;
}
.swiper-free-mode > .swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto;
}
.swiper-pointer-events {
  touch-action: pan-y;
  &.swiper-vertical {
    touch-action: pan-x;
  }
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
}
.swiper-slide-invisible-blank {
  visibility: hidden;
}
/* Auto Height */
.swiper-autoheight {
  &,
  .swiper-slide {
    height: auto;
  }

  .swiper-wrapper {
    align-items: flex-start;
    transition-property: transform, height;
  }
}

/* 3D Effects */
.swiper-3d {
  perspective: 1200px;
  .swiper-wrapper,
  .swiper-slide,
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right,
  .swiper-slide-shadow-top,
  .swiper-slide-shadow-bottom,
  .swiper-cube-shadow {
    transform-style: preserve-3d;
  }
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right,
  .swiper-slide-shadow-top,
  .swiper-slide-shadow-bottom {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }

}

/* CSS Mode */
.swiper-css-mode {
  > .swiper-wrapper {
    overflow: auto;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  > .swiper-wrapper > .swiper-slide {
    scroll-snap-align: start start;
  }
}
.swiper-horizontal.swiper-css-mode {
  > .swiper-wrapper {
    scroll-snap-type: x mandatory;
  }
}
.swiper-vertical.swiper-css-mode {
  > .swiper-wrapper {
    scroll-snap-type: y mandatory;
  }
}
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
