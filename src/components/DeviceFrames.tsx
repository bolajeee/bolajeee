import Image from "next/image";

export function BrowserFrame({ src, alt, url, priority = false, sizes = "(max-width: 900px) 92vw, 60vw" }: { src: string; alt: string; url: string; priority?: boolean; sizes?: string }) {
  return (
    <figure className="browser-frame">
      <div className="browser-bar" aria-hidden="true">
        <span /><span /><span />
        <div className="browser-url">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</div>
      </div>
      <div className="browser-screen">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </figure>
  );
}

export function PhoneFrame({ src, alt, sizes = "(max-width: 900px) 40vw, 18vw" }: { src: string; alt: string; sizes?: string }) {
  return (
    <figure className="phone-frame">
      <div className="phone-screen">
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </figure>
  );
}
