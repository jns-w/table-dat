"use client"
import { Discord, Github, LinkedIn, Telegram, X } from "@/components/icons"
import { themeUserPreferenceAtom } from "@/jotai/ui"
import { useAtom } from "jotai"
import Image from "next/image"
import Link from "next/link"

import style from "./footer.module.scss"

export function Footer() {
  const [theme] = useAtom(themeUserPreferenceAtom)

  return <div className={style.footerWrapper}>
    <div className={style.footerDiv}>
      <div className={style.brandingDiv}>
        <Image alt="" width={32} height={32}
               src={theme === "light" ? "/logos/c-logo.svg" : "/logos/c-logo.svg"}
        />
        Powered by Company
      </div>
      <div className={style.rightGroup}>
        <div className={style.linksDiv}>
          <p>Copyright ©2024 Company</p>
          <Link href="/">Legal</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
        <div className={style.socialsDiv}>
          <Link href="/">
            <LinkedIn />
          </Link>
          <Link href="/">
            <X />
          </Link>
          <Link href="/">
            <Telegram />
          </Link>
          <Link href="/">
            <Discord />
          </Link>
          <Link href="/">
            <Github />
          </Link>
        </div>
      </div>
    </div>
  </div>
}