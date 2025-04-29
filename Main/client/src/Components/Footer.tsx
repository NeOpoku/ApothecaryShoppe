const Footer = () => {
  return (
    <footer className="bg-green-50 text-center p-6 text-green-800 text-sm">
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Social</a>
        <a href="#">Disclaimer</a>
      </div>
      <p className="mt-4">&copy; 2025 The Apothecary Shoppe. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
