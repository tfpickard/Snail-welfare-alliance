import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { getContent } from "@/lib/content";
import type { AccordionItem } from "@/components/Accordion";

async function renderMarkdown(md: string): Promise<string> {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(md);
  return String(processed);
}

/**
 * Parse faq.md into accordion items. Each Q&A is a block separated by `---`;
 * the question is the leading `**bold**` line, the rest is the answer.
 */
export async function getFaqItems(): Promise<AccordionItem[]> {
  const { raw } = await getContent("faq");

  const blocks = raw
    .split(/\n-{3,}\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const items: AccordionItem[] = [];

  for (const block of blocks) {
    const match = block.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
    if (!match) continue;
    const question = match[1].trim();
    const answer = match[2].trim();
    if (!question || !answer) continue;
    items.push({ question, answerHtml: await renderMarkdown(answer) });
  }

  return items;
}
