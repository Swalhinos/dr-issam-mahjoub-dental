import { FacebookIcon, InstagramIcon, TikTokIcon } from '@/components/brand-icons'

const links = [
  { label: 'Facebook', url: 'https://www.facebook.com/docsam1979', Icon: FacebookIcon },
  { label: 'Instagram', url: 'https://www.instagram.com/dr.issam.mahjoub', Icon: InstagramIcon },
  { label: 'TikTok', url: 'https://www.tiktok.com/search?q=Issam%20Mahjoub%20dentiste', Icon: TikTokIcon },
]

export function SocialIcons({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const linkClass =
    tone === 'dark'
      ? 'text-navy-foreground/70 transition-colors hover:bg-navy-foreground/10 hover:text-primary'
      : 'text-muted-foreground transition-colors hover:bg-primary/10 hover:text-navy'
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map(({ label, url, Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`flex size-9 items-center justify-center rounded-full ${linkClass}`}
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  )
}
