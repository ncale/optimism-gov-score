const footerLinks: FooterLink[] = [
  ["Contact Us", "mailto:contact@onchainclarity.co"],
  ["Give Feedback", "https://forms.gle/k6VdUY2JrvxYZkrj7"],
  ["Onchain Clarity", "https://onchainclarity.co/"],
];

type FooterLink = [string, string];

export default function Footer() {
  return (
    <div className="flex h-20 justify-center text-gray-500">
      {footerLinks.map(([text, link], i) => (
        <div key={i}>
          <a href={link} target="_blank" className="hover:underline">
            <small>{text}</small>
          </a>
          {i + 1 < footerLinks.length ? (
            <small className="mx-1">|</small>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}
