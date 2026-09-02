---
title: "Media Studio troubleshooting"
description: "What to do when Picsart Media Studio doesn't work as expected — connecting, signing in, files from your computer, blank text, credits, and previews."
---

# Troubleshooting

If something here doesn't match what you're seeing, just ask — *"why did that not work?"* Your
assistant can look up the recommended steps and often tell you what it hit.

## Connecting

**"Contact an organization owner to install connectors"**

You're on a Claude Team or Enterprise plan, where connectors are added for the whole organization
rather than one person at a time. Ask whoever administers your Claude organization to add Media
Studio; once they have, it appears for everyone.

**It's been added but shows as unavailable**

It was most likely added to your own account on a plan that manages connectors centrally. It needs
adding at the organization level instead — see above.

**Your assistant says a Media Studio tool isn't available**

Either the connector isn't added yet, or you haven't signed in to Picsart since adding it. Open the
connector's settings and sign in, then start a new conversation.

**You're asked to sign in over and over**

Remove the connector, add it again, and sign in once more — the second time should stick. Check the
address is exactly:

```
https://api.picsart.com/connectors/media-tools/mcp
```

## Files

**Your assistant says it can't use a file from your computer**

Ask it to **open the uploader**. Media Studio runs on Picsart's servers and has no way to reach your
computer directly, so a file needs adding through the drop area first. Once you've dropped it in,
ask it to carry on — the file arrives with your next message, so it may need a nudge.

**A file on your own network won't load**

Same fix: use the uploader. Addresses that only exist inside your own network or on your own machine
aren't reachable from Picsart's servers.

**A link that needs a login won't load**

Files are fetched without signing in anywhere, so anything behind a login or a password won't work.
Save it to your Picsart Drive first, or use the uploader.

## Making things

**Text comes out blank**

The font wasn't recognised. Media Studio has its own font list and doesn't fall back to the fonts on
your computer, so a name like Arial or Helvetica won't render. Ask which fonts are available
and pick one. Asking it to check the piece before rendering also flags an unrecognised font.

**Clips play on top of each other instead of one after another**

Playing in sequence and stacking on screen are two different arrangements, and it's easy to end up
with the wrong one. Ask for the clips to be put in sequence, one after the other.

**Something is off the edge of the frame, or the wrong thing is in front**

Ask for the layout to be checked before rendering. It can report exactly where everything sits and
what's in front of what, without rendering anything, and fix it from there.

**A change you asked for didn't appear**

Ask for the piece to be checked, then try again. Parts are tracked individually, so a change aimed
at something that's since been replaced can quietly miss.

**You got fewer preview pictures than you asked for**

That's expected, not a failure — you get up to eight preview pictures per request. If you want other
moments, ask for them in a second batch.

## Credits and results

**You're told you've run out of credits**

Top up your Picsart account and ask again. Rendering and the video tools use credits; building,
checking and previewing a layout don't.

**The result panel didn't appear**

The links to the finished file are still in the reply, so you can download it from there. Files
you've rendered are also in your Picsart Drive.

## Still stuck?

- Ask *"what can Picsart Media Studio do?"* — it can list the jobs it knows how to do
- **[What you can do](/guide/media-studio/tools)** — every tool and what it's for
- **[Overview](/guide/media-tools)** — what Media Studio is, and how to connect
