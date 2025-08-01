import { useTranslations } from 'next-intl'
import React from 'react'

const Footer = () => {
  const t = useTranslations("")
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            {t("copyRight")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer