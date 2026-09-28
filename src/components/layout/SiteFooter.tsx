import { brand } from "@/content/webinar";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-28 pt-12 text-white md:pb-12">
      <div className="wrap flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark light />
          <p className="mt-3 max-w-xs text-white/70">
            Live sessions for teachers, coaches and creators who’d rather talk to people than to a camera.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-white/70">
          <a href={`mailto:${brand.email}`} className="hover:text-white">
            {brand.email}
          </a>
          <a href={`https://wa.me/${brand.whatsapp}`} className="hover:text-white">
            WhatsApp us
          </a>
          <a href="#faq" className="hover:text-white">
            Refund policy
          </a>
          <span>© {new Date().getFullYear()} {brand.name}</span>
        </div>
      </div>
    </footer>
  );
}
