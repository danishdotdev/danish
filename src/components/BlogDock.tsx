'use client';

import Image from 'next/image';
import { Github, Linkedin, Mail, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BlogDock() {
  const [light, setLight] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = light ? 'light' : ''; }, [light]);
  return <nav className="dock" aria-label="Quick links">
    <a href="/" className="dock-avatar" aria-label="Back to portfolio"><Image src="/portfolio/danish-pfp.png" alt="Danish Khan" width={32} height={32}/></a><span/>
    <a href="https://github.com/danishdotdev" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><span/>
    <a href="https://www.linkedin.com/in/danishkhan-in/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><span/>
    <a href="https://x.com/danishdotdev" target="_blank" rel="noreferrer" aria-label="X"><b className="x-icon">𝕏</b></a><span/>
    <a href="mailto:dk557876@gmail.com" aria-label="Email"><Mail size={18}/></a><span/>
    <button type="button" onClick={() => setLight(value => !value)} aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}><Moon size={18}/></button>
  </nav>;
}
