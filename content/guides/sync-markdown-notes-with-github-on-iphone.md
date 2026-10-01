---
title: Sync Markdown notes with GitHub from iPhone
description: Keep notes on iPhone or iPad and sync them to a folder in your own GitHub repository as plain Markdown files. No Git app, no server, no account.
published: 2026-10-01
updated: 2026-10-01
---

ioths can keep your notes on your iPhone or iPad and sync them to a folder in a GitHub repository you own. Each note lands in the repository as a plain `.md` file with YAML frontmatter, so you can read, search, and back up your notes with any tool that understands a Git repository.

ioths is not a Git client. It syncs one dedicated folder in one repository and does not handle branches, pull requests, or merges.

## What you need

- ioths with **Full Unlock**, the one-time purchase that adds GitHub storage.
- A GitHub repository with an existing default branch that is not protected. A private repository is strongly recommended: anyone who can read the repository can read your notes, and notes in a public repository are public.

## Connect GitHub

1. Open **Your Controls** in ioths and choose **GitHub** as your storage.
2. ioths shows a short code. Enter it on GitHub in your browser to authorize the ioths GitHub App, then return to ioths. It continues by itself once GitHub approves the code.
3. Grant the app access to the repository you want to use. Choose only the repositories ioths needs; the app asks for permission to read and update repository contents.
4. Pick the repository and branch, and name the Library folder. ioths creates the folder when sync starts, or restores an existing ioths Library it finds there. Folders with unrelated files are blocked, so your notes are never mixed into another project.

ioths checks repository access, the branch, and the Library folder before it saves anything. Your GitHub authorization is stored in the iOS Keychain.

## How sync behaves

Your notes stay on the device, and editing never waits for the network. ioths pushes your changes to GitHub shortly after you make them and retries if you are offline. You can also push or pull by hand from **Your Controls**.

What syncs: your notes with their frontmatter, attached photos and recordings, and the Archive and Trash folders. If GitHub has changes this device does not, pull before you push. When both this device and GitHub have changed, ioths stops and asks you how to resolve it instead of overwriting either side.

If authorization expires or you change repository access, reconnect from Your Controls. Your notes on the device are not deleted. Stopping GitHub sync also leaves both your local notes and the repository untouched.

## Reading notes on a computer

Clone the repository and open the Library folder in any text editor or Markdown app. Notes are named after their titles, such as `grocery-run.md`, and the frontmatter carries an `id`, `title`, `created` and `modified` dates, and `tags`.

If you add or edit notes on a computer, keep that frontmatter in place. A file in the Library folder that ioths cannot read as a note stops a pull with a message naming the file, so you can fix or move it on GitHub.

## GitLab and OneDrive work the same way

Full Unlock also includes GitLab storage, which syncs to a dedicated folder in a GitLab.com project after you sign in to GitLab, and OneDrive storage, which syncs to an app folder in a personal Microsoft account. The behaviour on the device is the same: notes stay local, sync runs in the background, and conflicts are yours to decide.

## Privacy

ioths talks to GitHub directly from your device. There is no ioths account and no ioths server that receives your notes. GitHub receives the notes, filenames, frontmatter, attachments, Archive, and Trash files you sync, under GitHub's own privacy statement.

GitHub and GitLab are trademarks of their respective owners. ioths is an independent app and is not affiliated with or endorsed by either.
