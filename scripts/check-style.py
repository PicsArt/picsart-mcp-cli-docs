#!/usr/bin/env python3
"""Enforce narrow prose rules. This is not an AI-authorship detector."""
from pathlib import Path
import re,sys
ROOT=Path(__file__).resolve().parent.parent
# Literal schemas, commands, URLs, Markdown separators, and audit quotations are exempt.
RULES={
 'prose dash':r'—|(?<!-)--(?!-)',
 'decorative emoji':r'[\U0001F000-\U0001FAFF\u2600-\u27BF]',
 'promotional phrasing':r'\b(?:seamless(?:ly)?|effortless(?:ly)?|cutting-edge|game-changing|next-generation|world-class|best-in-class|delv(?:e|es|ing)|tapestry)\b',
 'canned transition':r"\b(?:it(?:'|’)?s worth noting|in today(?:'|’)s fast-paced|at the end of the day|in conclusion)\b",
}
def prose(text):
 text=re.sub(r'^```[^\n]*\n[\s\S]*?^```','',text,flags=re.M)
 text=re.sub(r'`[^`]+`','',text)
 text=re.sub(r'<!--[^>]*-->','',text,flags=re.S)
 text=re.sub(r'https?://[^\s)]+','',text)
 return '\n'.join(line for line in text.splitlines() if not re.fullmatch(r'\s*(?:[-:| ]+|---)\s*',line))
def check(text):
 return [(label,match[0]) for label,rule in RULES.items() for match in re.finditer(rule,prose(text),re.I)]
if __name__=='__main__':
 paths=[*ROOT.glob('*.md'),*sorted((ROOT/'guide').rglob('*.md')),*sorted((ROOT/'reference').rglob('*.md')),ROOT/'scripts/audit-compliance-agent.md',ROOT/'public/llms.txt']
 if len(sys.argv)>1:paths=[*Path(sys.argv[1]).glob('*.md')]
 errors=[f'{p.relative_to(ROOT) if p.is_relative_to(ROOT) else p}: {label}: {match}' for p in paths for label,match in check(p.read_text())]
 print(f'Style: checked {len(paths)} files; {len(errors)} findings.')
 if errors:print('\n'.join(errors));sys.exit(1)
