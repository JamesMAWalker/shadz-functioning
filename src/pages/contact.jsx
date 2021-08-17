import React from "react"

import Logo from '../icons/logo'

import { contactSection, contactHeader, contactInfo, contactAddress } from './contact.module.scss'

export default function Contact() {
  
  return (
    <section className={contactSection}>
      <div className={contactHeader}>
        <h3>Questions?</h3>
        <p>We're happy to help.</p>
      </div>
      <div className={contactInfo}>
        <a href="mailto:shadz@usa.com" target="blank" rel="noopener noreferrer">
          shadz@usa.com
        </a>
        <a href="sms:2139733676" target="blank" rel="noopener noreferrer">
          +213 973 3676
        </a>
      </div>
      <div className={contactAddress}>
        <h3>
          <Logo />
        </h3>
        <p>
          15025 Moonpark Street
          <br />
          Los Angeles, CA 91403
        </p>
      </div>
    </section>
  )
}
