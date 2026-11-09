import './globals.css';

export const metadata = {
  title: 'AUGUST | Лето продолжается',
  description: 'Август, который не заканчивается. Каждый новый день продолжает лето.',
};

export default function RootLayout({ children }) {
  return <html lang="ru"><body>{children}</body></html>;
}
