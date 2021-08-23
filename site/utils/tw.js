/**
 * Provides access to tailwind.config.js
 * @see https://tailwindcss.com/docs/configuration#referencing-in-java-script
 */
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "tailwind.config"

export const twTheme = resolveConfig(tailwindConfig).theme
export const twConfig = resolveConfig(tailwindConfig)
