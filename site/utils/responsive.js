import { useMediaQuery } from "react-responsive"

import { twTheme } from "@/utils/tw"

// See https://github.com/contra/react-responsive

export const MdMin = ({ children }) => {
  const isBreakpoint = useMediaQuery({ minWidth: twTheme.screens.mdmin })
  return isBreakpoint ? children : null
}

export const MdMax = ({ children }) => {
  const isBreakpoint = useMediaQuery({ maxWidth: twTheme.screens.mdmax.max })
  return isBreakpoint ? children : null
}

export const useIsMdMin = () =>
  useMediaQuery({ minWidth: twTheme.screens.mdmin })
export const useIsMdMax = () =>
  useMediaQuery({ maxWidth: twTheme.screens.mdmax.max })
