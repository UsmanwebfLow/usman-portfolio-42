import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 px-6 section-darker border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 border border-foreground flex items-center justify-center">
              <span className="text-heading text-xs tracking-widest">JD</span>
            </div>
          </motion.div>
          
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            <motion.a
              href="https://github.com/"
              whileHover={{ y: -3 }}
              className="text-foreground-muted hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/usman-ali-a15221367/"
              whileHover={{ y: -3 }}
              className="text-foreground-muted hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/usmanmughal14200691/"
              whileHover={{ y: -3 }}
              className="text-foreground-muted hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
          </motion.div>
          
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-foreground-soft text-xs tracking-wider"
          >
            © {currentYear} ALL RIGHTS RESERVED
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
