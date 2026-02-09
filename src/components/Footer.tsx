import { Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Github className="h-5 w-5" />
            <span className="font-semibold">OSS Directory</span>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for the open-source community
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Open Source Tools Directory
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
