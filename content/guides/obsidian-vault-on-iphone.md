---
title: Use an Obsidian vault folder on iPhone
description: Write in your Obsidian vault from iPhone or iPad with ioths. Notes stay plain Markdown files with YAML frontmatter that Obsidian reads as they are.
published: 2026-10-01
updated: 2026-10-01
---

If your notes already live in an Obsidian vault, ioths can write straight into a folder of that vault from your iPhone or iPad. Nothing is converted or imported: every note ioths saves is a plain `.md` file with YAML frontmatter, so Obsidian on your other devices sees it as an ordinary note.

## What you need

- ioths with **Full Unlock**, the one-time purchase that adds Files-folder storage.
- A vault folder you can reach from the Files app on your iPhone or iPad, through a provider that allows folder selection. Box, Dropbox, Microsoft OneDrive, and other providers with a Files extension can work if they let apps choose a folder.

## Choose the folder

1. Open **Your Controls** in ioths and choose **Files folder** as your storage.
2. Pick the folder in the Files browser. ioths can create an “ioths” subfolder inside it, which keeps its notes apart from other files in that folder.
3. If you already have notes in ioths, you can copy them into the folder. Existing files are kept, and the original Library is not deleted.

ioths lists the notes at the top level of the folder you choose; notes inside subfolders are not shown. A good pattern is a dedicated folder in your vault, such as an inbox for notes captured on the go, rather than the vault root.

ioths keeps its own `archive`, `trash`, and `assets` folders inside the folder you choose. Photos and voice recordings go into `assets` and are linked from the note with ordinary Markdown links.

## What a note looks like in Obsidian

Each note is a file named after its title, such as `grocery-run.md`. The frontmatter holds the fields ioths needs:

```
---
# ioths note metadata: id is a unique 26-character ULID; created and modified use ISO 8601 timestamps.
# title is derived from the first non-empty body line; tags mirror inline #tags.
ioths_schema: 1
id: 01J4K2M3N4P5Q6R7S8T9VWXYZ0
title: Grocery run
created: 2026-10-01T09:12:00Z
modified: 2026-10-01T09:20:00Z
tags:
  - errands
---

Grocery run

- [ ] Oat milk #errands
```

The title comes from the first line of the note, and `tags` mirrors the `#tags` you type in the text. Obsidian shows these fields as note properties. Fields ioths does not recognise are kept when it saves a note, so properties added in Obsidian are not lost.

## Notes written somewhere else

A Markdown file without ioths frontmatter is listed as a file ioths could not read as a note. Choose **Import as ioths note** and ioths adds the frontmatter to that file in place, keeping its text.

If a note changes in two places before your file provider has synced, ioths does not pick a winner silently. When it cannot tell which edit came last, it keeps both versions as separate notes so nothing you wrote disappears.

## Privacy

Note content stays on your device and in the folder you chose. ioths has no account and no server that receives your notes; moving the files between your devices is your file provider's job.

Obsidian is a trademark of its owner. ioths is an independent app and is not affiliated with or endorsed by Obsidian.
