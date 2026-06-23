export const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-outline-variant/20 bg-surface-container-lowest">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto gap-4">
        <div className="font-label-caps text-label-caps text-primary">
          © 2026 nidhal gharbi
        </div>
        <div className="flex gap-8">
          <a
            href="https://github.com/nidhalghar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-code-sm text-code-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nidhal-gharbi-6b27a8254/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-code-sm text-code-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
