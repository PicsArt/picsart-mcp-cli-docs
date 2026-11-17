#!/usr/bin/env python3
"""Check published documentation against pinned CLI metadata and JSON syntax."""
import json,re,shlex,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
COMMANDS=json.loads((ROOT/'scripts/data/cli-commands.json').read_text())
CLI_MODELS=json.loads((ROOT/'scripts/data/cli-models.json').read_text())['models']
site_paths=[ROOT/'index.md',ROOT/'changelog.md',*sorted((ROOT/'guide').rglob('*.md')),*sorted((ROOT/'reference').rglob('*.md'))]
paths=[*site_paths,ROOT/'README.md',ROOT/'CONTRIBUTING.md',ROOT/'CODE_OF_CONDUCT.md',ROOT/'scripts/audit-compliance-agent.md']
errors=[];counts={'pages':0,'json':0,'shell':0,'commands':0};inventory=[]
def fail(p,msg):errors.append(str(p.relative_to(ROOT))+': '+msg)
def command(p,line):
 try:t=shlex.split(line,comments=True)
 except ValueError as e:fail(p,str(e));return
 if 'gen-ai' not in t:return
 t=t[t.index('gen-ai')+1:]
 for separator in ('|','||','&&',';'):
  if separator in t:t=t[:t.index(separator)]
 if not t or t[0] in ('--version','--help'):return
 name=t.pop(0)
 if t and name+':'+t[0] in COMMANDS:name+=':'+t.pop(0)
 if name not in COMMANDS:fail(p,'unknown CLI command '+name);return
 flags=COMMANDS[name].get('flags',{});aliases={}
 for key,f in flags.items():
  aliases['--'+key]=key
  if f.get('char'):aliases['-'+f['char']]=key
  for a in f.get('aliases',[]):aliases['--'+a]=key
  if f.get('allowNo'):aliases['--no-'+key]=key
 aliases['--help']='help';aliases['-h']='help'
 values={};pos=[];i=0
 while i<len(t):
  token=t[i];i+=1
  if token in ('>', '>>','<'):break
  if token.startswith('-'):
   token,eq,value=token.partition('=');key=aliases.get(token)
   if key is None:fail(p,f'{name}: unknown flag {token}');continue
   if key=='help':continue
   f=flags[key]
   if f['type']=='option':
    if not eq:
     if i>=len(t):fail(p,f'{name}: missing value for {token}');continue
     value=t[i];i+=1
    if f.get('options') and '$' not in value and value not in f['options']:fail(p,f'{name}: invalid {token} value {value}')
    values[key]=value
   else:values[key]=not token.startswith('--no-')
  else:pos.append(token)
 if pos and not COMMANDS[name].get('args') and COMMANDS[name].get('strict',True):fail(p,f'{name}: unexpected positional arguments {pos}')
 if name in ('generate','validate','describe') and 'model' in values:
  model=values['model']
  if '$' not in model and model not in CLI_MODELS:fail(p,f'{name}: unknown CLI model {model}')
 if name=='generate' and values.get('model') in CLI_MODELS and not values.get('input-dir') and '$' not in line:
  model=CLI_MODELS[values['model']]
  overrides={'imageUrls':'image','videoUrl':'video','audioUrl':'audio','voiceId':'voice','model':'model-version','removeBackgroundNoise':'remove-bg-noise'}
  for param in model['params']:
   flag=overrides.get(param['key'],re.sub(r'([a-z0-9])([A-Z])',r'\1-\2',param['key']).lower())
   value=values.get(flag)
   piped_prompt=param['key']=='prompt' and '|' in line
   if param.get('required') and param.get('default') is None and value is None and not piped_prompt:fail(p,f"{values['model']}: missing required {param['key']}")
   if value is not None and param.get('kind')=='enum' and str(value) not in [str(o['id']) for o in param['options']]:fail(p,f"{values['model']}: invalid {param['key']} value {value}")
   if value is not None and param.get('kind')=='range':
    try:
     number=float(value)
     if number<param.get('min',float('-inf')) or number>param.get('max',float('inf')):fail(p,f"{values['model']}: {param['key']} outside permitted range")
    except ValueError:fail(p,f"{values['model']}: {param['key']} must be numeric")
 counts['commands']+=1;inventory.append({'page':str(p.relative_to(ROOT)),'command':line})
for p in paths:
 text=p.read_text();counts['pages']+=1
 if p in site_paths and not re.match(r'^---\n[\s\S]*?\bdescription:',text):fail(p,'missing frontmatter description')
 for match in re.finditer(r'^```([^\n]*)\n([\s\S]*?)^```',text,re.M):
  lang,body=match.groups();lang=lang.strip()
  if lang=='json':
   try:json.loads(body);counts['json']+=1
   except ValueError as e:fail(p,'invalid JSON: '+str(e))
  if lang in ('bash','sh','shell'):
   check=subprocess.run(['bash','-n'],input=body,text=True,capture_output=True)
   if check.returncode:fail(p,'invalid shell: '+check.stderr.strip())
   counts['shell']+=1
   for line in body.replace('\\\n',' ').splitlines():
    if re.search(r'(^|[ |])gen-ai(?: |$)',line) and not line.lstrip().startswith('#'):command(p,line)
 if re.search(r'"command"\s*:\s*"gen-ai-mcp"',text):fail(p,'nonexistent local MCP executable')
 if 'https://mcp.picsart.io' in text:fail(p,'obsolete MCP endpoint')
 for target in re.findall(r'\]\((/[^\s)#]+)(?:#[^\s)]*)?\)',text):
  dest=ROOT/target.lstrip('/')
  if not any(x.exists() for x in (dest,dest.with_suffix('.md'),dest/'index.md')):fail(p,'missing local target '+target)
print(json.dumps(counts))
if '--inventory' in sys.argv:
 dest=Path(sys.argv[sys.argv.index('--inventory')+1]);dest.write_text(json.dumps({'counts':counts,'pages':[str(p.relative_to(ROOT)) for p in paths],'commands':inventory},indent=2)+'\n')
if errors:print('\n'.join(errors));sys.exit(1)
