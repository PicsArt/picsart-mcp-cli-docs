#!/usr/bin/env python3
"""Regression checks for errors found during the documentation audit."""
import runpy
from pathlib import Path
root=Path(__file__).resolve().parent
checks=runpy.run_path(str(root/'check-docs.py'))
errors=checks['errors'];assert not errors,errors
page=checks['ROOT']/'guide/cli-quickstart.md'
for example,message in [
 ('gen-ai generate -m flux-2-pro --script','unknown flag --script'),
 ('gen-ai generate -m seedance-2.5','missing required prompt'),
 ('gen-ai pricing flux-2-pro -d 5','unknown flag -d'),
 ('gen-ai generate -m flux-2-pro -p cup --aspect-ratio invalid','invalid aspectRatio'),
]:
 errors.clear();checks['command'](page,example)
 assert any(message in e for e in errors),(example,errors)
style=runpy.run_path(str(root/'check-style.py'))['check']
assert style('Generate images — seamlessly.')
assert style('Use this -- it works.')
assert style('Launch 🚀')
assert not style('---\ndescription: Commands\n---\nUse `--model`.\n```bash\ngen-ai generate --model flux-2-pro\n```\n|---|---|')
print('Regression checks passed: invalid flags, missing input, enum values, prose style, preserved syntax.')
