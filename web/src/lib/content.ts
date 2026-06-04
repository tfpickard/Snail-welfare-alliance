/**
 * File-based content pipeline. Reads markdown from web/content/*.md at build
 * time, parsing frontmatter (gray-matter) and rendering body to HTML
 * (remark + remark-gfm + remark-html). No CMS.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentDoc = {
  /** Frontmatter fields (may be empty for these files). */
  frontmatter: Record<string, unknown>;
  /** The leading `# H1` text, if present and stripped. */
  title: string | null;
  /** Rendered HTML of the markdown body. */
  html: string;
  /** Raw markdown body (frontmatter stripped). */
  raw: string;
};

type GetContentOptions = {
  /**
   * When true, the leading `# Heading` is removed from the body and returned
   * as `title` — so a page can render it via <PageHeader> without duplicating
   * the document <h1>.
   */
  stripTitle?: boolean;
};

/**
 * Load and render a single content file by slug (without extension).
 * e.g. getContent("about") → web/content/about.md
 */
export async function getContent(
  slug: string,
  options: GetContentOptions = {},
): Promise<ContentDoc> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);

  let body = content;
  let title: string | null = null;

  if (options.stripTitle) {
    const match = body.match(/^\s*#\s+(.+?)\s*$/m);
    if (match) {
      title = match[1].trim();
      // Drop the matched H1 line and any immediately-following `---` rule.
      body = body
        .replace(match[0], "")
        .replace(/^\s*-{3,}\s*$/m, "")
        .trimStart();
    }
  }

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(body);

  return {
    frontmatter: data,
    title,
    html: String(processed),
    raw: body,
  };
}
