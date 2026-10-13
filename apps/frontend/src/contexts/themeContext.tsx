"use client";

import { createContext } from "react";
import { ThemeType } from "../types/general";

export const ThemeContext = createContext<{ theme: ThemeType; toggle: () => void } | null>(null);
