#!/usr/bin/env python3
"""Add missing descriptions from page titles; preserve existing editorial descriptions."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parent.parent
changed=0
for path in [root/'index.md',root/'changelog.md',*sorted((root/'guide').rglob('*.md')),*sorted((root/'reference').rglob('*.md'))]:
    text=path.read_text()
    if re.search(r'^description:',text,re.M):continue
    title=re.search(r'^# (.+)$',text,re.M)
    if not title:raise ValueError(f'Missing title: {path}')
    line='description: '+json.dumps(title[1]+' in the Picsart CLI and MCP documentation.')+'\n'
    text='---\n'+line+text[4:] if text.startswith('---\n') else '---\n'+line+'---\n\n'+text
    path.write_text(text);changed+=1
print(f'Added descriptions to {changed} pages; review them before publishing.')
