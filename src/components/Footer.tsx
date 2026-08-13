import { Link } from 'react-router-dom';
import { Layers, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold">
              <Layers className="h-5 w-5" />
              Open Stacker
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Stack your software with open source. Find the open-source alternative before you pay for the
              proprietary one.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Discover</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/tools" className="hover:text-foreground transition-colors">All projects</Link></li>
              <li><Link to="/discover" className="hover:text-foreground transition-colors">Fresh repos</Link></li>
              <li><Link to="/tools" className="hover:text-foreground transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Contribute</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/submit" className="hover:text-foreground transition-colors">Submit a project</Link></li>
              <li><Link to="/submit" className="hover:text-foreground transition-colors">Add an alternative</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Your dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Support</h3>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Coffee className="h-4 w-4" />
              Buy me a coffee
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>Made by Alham Rizvi and open source community</p>
          <p>© {new Date().getFullYear()} Open Stacker</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
