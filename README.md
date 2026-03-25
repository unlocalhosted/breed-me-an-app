# 🐣 breed-me-an-app

> Stop copy-pasting your setup ritual. One command, you're coding.

`new-project` is a terminal TUI that bootstraps a new project from zero to GitHub-ready in seconds — picks your stack, scaffolds boilerplate, sets up git identity per-repo, creates the GitHub repo, and pushes the first commit. All without leaving your terminal.

---

## What it does

```
◆ new-project
╔══════════════════════════════════════════════════╗
║                  ◆ new-project                  ║
║           Bootstrap a repo in seconds           ║
╚══════════════════════════════════════════════════╝

  Project name      › my-app
  Parent directory  › ~/work
  Identity          › work  (saved profile)
  Tech stack        › TypeScript
  License           › MIT
  Default branch    › main
  Add .env.example? › Yes
  Visibility        › private
  Description       › Does something cool

  ◉ Create project? Yes

  ⠸ Creating GitHub repo...
  ✓ my-app is ready  →  https://github.com/you/my-app

  Open in editor › Cursor
```

One prompt flow. No flags, no config files, no RTFM.

---

## Install

**Prerequisites**

```sh
brew install gum   # TUI engine
brew install gh    # GitHub CLI
gh auth login      # if not already authenticated
```

**Install `new-project`**

```sh
curl -fsSL https://raw.githubusercontent.com/unlocalhosted/breed-me-an-app/main/install.sh | bash
```

Drops the `new-project` command into `/usr/local/bin`.

---

## Usage

```sh
new-project
```

---

## Features

### Identity profiles
Save your name/email combos as named profiles (e.g. `work`, `personal`). Next time you run `new-project`, pick from the list instead of typing. Stored in `~/.config/new-project/profiles`.

### Stack boilerplate

| Stack | What you get |
|---|---|
| **Node.js** | `package.json`, `index.js`, `.gitignore` |
| **TypeScript** | `package.json`, `tsconfig.json`, `src/index.ts`, `.gitignore` |
| **Python** | `main.py`, `requirements.txt`, `.gitignore` |
| **Go** | `main.go`, `go.mod` (prefilled with your GitHub username), `.gitignore` |
| **Rust** | `.gitignore` + prompt to run `cargo init` |
| **React / Next.js** | `.gitignore` + prompt to run `create-next-app` |
| **Bare** | `README.md`, `.gitignore` — nothing else |
| **From template →** | Clone any GitHub template repo as the base |

Every stack also gets a `README.md` prefilled with your project name and description.

### License picker
Choose MIT, Apache 2.0, GPL-3.0, or None. Generates a proper `LICENSE` file with your name and year.

### `.env.example`
Opt-in per project. Creates an empty `.env.example` as a starting point for environment variables.

### Custom branch name
Defaults to `main`, override to whatever your org mandates.

### Open in editor
After setup, optionally launch the project directly in VS Code, Cursor, Zed, or Neovim.

---

## Why per-repo git identity?

Because office projects and personal projects shouldn't share the same name and email. `new-project` always asks — no guessing, no accidental commits from the wrong account. Save them as profiles so you only type once.

---

## Uninstall

```sh
rm /usr/local/bin/new-project
rm -rf ~/.config/new-project   # optional: remove saved profiles
```

---

## Built with

- [gum](https://github.com/charmbracelet/gum) — TUI components for shell scripts
- [gh](https://cli.github.com/) — GitHub CLI
- bash

---

<sub>Part of [unlocalhosted](https://github.com/unlocalhosted)</sub>
