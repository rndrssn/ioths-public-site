---
title: Move Google Keep notes to Markdown on iPhone
description: Import a Google Takeout export of Google Keep into ioths on iPhone or iPad. Notes, checklists, labels, and photos become plain Markdown files, on device.
published: 2026-10-01
updated: 2026-10-01
---

ioths can turn your Google Keep notes into plain Markdown files on your iPhone or iPad. You export Keep with Google Takeout, unpack the download in the Files app, and choose the `Keep` folder. The import runs entirely on your device: no Google sign-in, no network request, and no ongoing connection to your Google account.

The import is a one-way copy and is marked **Experimental** in the app. It does not change anything in Google Keep, so keep your Takeout download until you have checked the imported notes.

## Export Keep with Google Takeout

1. Go to [Google Takeout](https://takeout.google.com/) and deselect all products, then select only **Keep**. An export that includes other Google products is not accepted.
2. Create the export and download it when Google says it is ready. Google's help page [Export your data from Google Keep](https://support.google.com/keep/answer/10017039) has the details.
3. Save the download to the Files app and tap it to unpack it. Inside you will find a folder named `Keep`. ioths does not read ZIP files, so the folder has to be unpacked first.

## Import the Keep folder

1. Open **Your Controls** in ioths and choose **Import Google Keep folder**. **Google Keep import compatibility**, right below it, lists what transfers.
2. Select the unpacked `Keep` folder.
3. ioths checks the whole folder before writing anything, then shows how many notes, attachments, skipped attachments, and archived notes it found. It never shows note content on this screen.
4. Confirm, and the notes appear in your Library.

The import is available when your notes are stored on this device or in a Files folder. It is not offered while GitHub, GitLab, or OneDrive storage is active.

## What transfers

- Note titles become the first heading, and note text comes in as plain Markdown text.
- Checklists become Markdown tasks, `- [ ]` and `- [x]`, so they show up in Tasks and on the kanban board.
- Labels become tags when they can be written as valid tags. Every imported note also gets the `gglkeep` tag, so you can filter the whole import later.
- Created and edited times, pinned notes, and archived notes keep their state.
- Photos in JPEG, PNG, GIF, WebP, or HEIC, and recordings in M4A, MP3, WAV, AAC, OGG, or MP4, are copied unchanged into your Library and linked from the note.

Each Keep note becomes a new ioths note with its own file. Existing notes are never overwritten or merged. Importing the same unchanged export again skips the notes already imported.

## What does not transfer

- Rich-text formatting such as bold and headings comes in as plain text.
- Note colours and backgrounds.
- Reminders, including location reminders. No notification is created.
- Collaborators and sharing settings.
- Link previews and other Keep annotations. A URL written in the text stays in the text.
- Drawings as editable strokes. A drawing that Takeout exports as a supported image comes in as a flat picture.
- Version history and notes in the Keep trash.
- Attachments in other formats are skipped and counted, without showing their names.

## Limits

One import can hold up to 1,000 notes and 5,000 files, with at most 100 MiB of files in total. A single photo or recording can be up to 20 MiB. A folder over a limit, or one that does not have the Takeout `Keep` layout, is rejected before any note is written, so a failed import leaves your Library unchanged.

## After the import

Your Keep notes are now ordinary Markdown files with YAML frontmatter, the same as every other note in ioths. Filter by the `gglkeep` tag to review them, or add checklists to turn notes into tasks. Full Unlock adds Files-folder, GitHub, GitLab, and OneDrive storage when you want your notes on other devices.

Google Keep and Google Takeout are trademarks of Google LLC. ioths is an independent app and is not affiliated with or endorsed by Google.
