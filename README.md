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

  Project name    › my-app
  Parent dir      › ~/work
  git user.name   › Ada Lovelace
  git user.email  › ada@work.io
  Tech stack      › TypeScript
  Visibility      › private
  Description     › Does something cool

  ◉ Create project? Yes

  ⠸ Creating GitHub repo...
  ✓ my-app is ready  →  https://github.com/you/my-app

  cd ~/work/my-app
```

One prompt flow. No flags, no config files, no RTFM.

---

## Install

**Prerequisites**

```sh
brew install gum   # the TUI engine
brew install gh    # GitHub CLI — make sure you're logged in
gh auth login      # if not already
```

**Install `new-project`**

```sh
curl -fsSL https://raw.githubusercontent.com/unlocalhosted/breed-me-an-app/main/install.sh | bash
```

Drops the `new-project` command into `/usr/local/bin`. That's it.

---

## Usage

```sh
new-project
```

It asks you seven questions, then handles everything else.

---

## Stacks

Each stack comes with sensible defaults and gets out of your way.

| Stack | What you get |
|---|---|
| **Node.js** | `package.json`, `index.js`, `.gitignore` |
| **TypeScript** | `package.json`, `tsconfig.json`, `src/index.ts`, `.gitignore` |
| **Python** | `main.py`, `requirements.txt`, `.gitignore` |
| **Go** | `main.go`, `go.mod` (with your GitHub username), `.gitignore` |
| **Rust** | `.gitignore` + prompt to run `cargo init` |
| **React / Next.js** | `.gitignore` + prompt to run `create-next-app` |
| **Bare** | `README.md`, `.gitignore` — nothing else |

Every stack also gets a `README.md` with your project name and description pre-filled.

---

## Why per-repo git identity?

Because office projects and personal projects shouldn't share the same name and email. `new-project` always asks — no guessing, no accidental commits from the wrong account.

---

## Uninstall

```sh
rm /usr/local/bin/new-project
```

---

## Built with

- [gum](https://github.com/charmbracelet/gum) — TUI components for shell scripts
- [gh](https://cli.github.com/) — GitHub CLI
- bash — nothing exotic

---

<sub>Part of [unlocalhosted](https://github.com/unlocalhosted)</sub>
