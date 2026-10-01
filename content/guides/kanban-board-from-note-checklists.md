---
title: Turn note checklists into a kanban board
description: Add a Markdown checklist to any note and ioths puts it on a kanban board built for one person, with a work-in-progress limit, due dates, and reminders.
published: 2026-10-01
updated: 2026-10-01
---

Most to-do apps ask you to copy tasks out of your notes and into a separate list. In ioths the task stays where you wrote it: a checklist inside a note is the task, and the note becomes a card on a kanban board built for one person, not a team.

## Write a checklist

Any note with a Markdown checklist becomes a task note:

```
Plan the garden

- [x] Measure the beds
- [ ] Order seeds 📅 2026-10-15
- [ ] Fix the gate #weekend
```

The note shows its progress as a fraction, such as 1/3, in the List and Tile views. Because the checklist is ordinary Markdown, it reads the same in any other Markdown editor.

## Three lanes: Open, In progress, Done

Switch the Layout to **Kanban** to see your task notes in three lanes:

- **Open** holds notes with tasks still to do.
- **In progress** holds the notes you are working on now. Tap and hold a note and choose **Start working**.
- **Done** holds notes whose tasks are all checked off.

You do not drag cards between lanes. A note moves as its checklist changes: tick the last box and it moves to Done. The new-note button on the board starts a task note, so a new note appears in Open straight away.

The board can also show individual tasks instead of note cards, grouped under the note they came from. On iPhone, the board can use landscape.

## A work-in-progress limit

The WIP limit caps how many notes can be in progress at once. It starts at 3, can be set from 1 to 9 in **Your Controls**, or turned off. When you reach the limit, starting another note opens the limit setting so you decide whether to raise it; nothing is moved back to Open behind your back. If you lower the limit, the notes that have been in progress longest return to Open.

In progress is stored in the note itself as `wip: true` in the frontmatter, together with the time you started, so the board survives a sync to another device.

## All open tasks in one list

The **Tasks** screen collects every open checklist item across your notes into one list, grouped by note, by tag, or by due date. Each task links back to its note, so the context you wrote around it is one tap away. A Home Screen widget shows your open tasks too.

## Due dates and reminders

Type `@` on a task line, or use the calendar button above the keyboard, to give a task a due date. The date is saved in the Markdown as `📅` followed by the date, so it stays readable outside ioths.

Due dates show on notes, tasks, and the Tasks widget, and you can filter and sort the note list by them. Turn on reminders in **Your Controls → Reminders** and ioths reminds you on the morning a task is due, at a time you pick. Reminders are scheduled on your device, and the notification never shows your note text.

## Free on your device

Writing notes, checklists, the Tasks screen, the kanban board, due dates, and reminders are all free. Full Unlock is a one-time purchase that only adds storage options: Files folders, GitHub, GitLab, OneDrive, and ZIP export.
