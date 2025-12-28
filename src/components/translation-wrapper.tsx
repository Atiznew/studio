"use client";

import { useTranslation } from "@/context/language-context";
import { ReactNode } from "react";

interface TranslationWrapperProps {
    children: (t: (key: string) => string) => ReactNode;
}

export const TranslationWrapper = ({ children }: TranslationWrapperProps) => {
    const { t } = useTranslation();
    return <>{children(t)}</>;
}
