import './globals.css';

export const metadata = {
  title: 'DoubtBridge - Peer-to-Peer Academic Doubt Resolution Platform',
  description: 'Connect with verified peer helpers to resolve academic questions and collaborate in real-time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
