// Sätteri mdast plugin: rewrites relative links to .md files into the .html pages the site generates (README.md becomes index.html).
const rewrite = (url) => {
  if (/^[a-z][a-z0-9+.-]*:|^#|^\//i.test(url)) return url;
  const [path, hash] = url.split('#');
  if (!path.endsWith('.md')) return url;
  const html = path.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html');
  return hash === undefined ? html : `${html}#${hash}`;
};

export default {
  name: 'md-links',
  link(node, ctx) {
    const url = rewrite(node.url);
    if (url !== node.url) ctx.setField(node, 'url', url);
  },
};
