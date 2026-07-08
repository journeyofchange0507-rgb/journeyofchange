'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CLUB_INFO, NAV_LINKS, SOCIAL_LINKS } from '@/constants';
import { Send, MapPin, Mail, Heart } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Instagram: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Tiktok: (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  Send: <Send className="w-5 h-5" />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* العمود 1: تعريف النادي */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-emerald-500/30">
                <Image
                  src="/assets/logo.png"
                  alt={CLUB_INFO.name}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {CLUB_INFO.name}
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {CLUB_INFO.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`p-2.5 rounded-full bg-neutral-800 text-neutral-400 ${social.color} hover:bg-neutral-700/80 transition-all duration-200 transform hover:-translate-y-1`}
                >
                  {iconMap[social.icon] || <Send className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-8 after:h-0.5 after:bg-emerald-500">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-emerald-500 text-xs">◀</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 3: معلومات الاتصال */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-8 after:h-0.5 after:bg-emerald-500">
              تواصل معنا
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{CLUB_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <a href={`mailto:${CLUB_INFO.email}`} className="hover:text-white transition-colors">
                  {CLUB_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* العمود 4: النشرة البريدية أو رسالة ترحيبية */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:right-0 after:w-8 after:h-0.5 after:bg-emerald-500">
              انضم لمسيرة التغيير
            </h3>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              هل أنت جاهز لتكون جزءاً من نخبة الشباب الجزائري الطموح؟ سجل الآن وابدأ رحلتك.
            </p>
            <Link
              href="/register"
              className="inline-block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md"
            >
              تقديم طلب انضمام
            </Link>
          </div>
        </div>

        {/* خط الفصل وحقوق الملكية */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            جميع الحقوق محفوظة &copy; {currentYear} <span className="text-neutral-300 font-medium">{CLUB_INFO.name}</span>.
          </p>
          <p className="flex items-center gap-1.5">
            <span>صُنع بشغف و</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>من أجل شباب الجزائر الطموح</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
