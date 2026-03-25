# breed-me-an-app

> Stop copy-pasting your setup ritual. One command, you're breeding.

`breed-me` is a terminal TUI that bootstraps a new project from zero to GitHub-ready in seconds — picks your stack, scaffolds boilerplate, sets up git identity per-repo, optionally creates a GitHub repo, and pushes the first commit. All without leaving your terminal.

---

## Install

**Prerequisites**

```sh
brew install gum   # TUI engine
brew install gh    # GitHub CLI (skip if using --local)
gh auth login      # if not already authenticated
```

**Install `breed-me`**

```sh
curl -fsSL https://raw.githubusercontent.com/unlocalhosted/breed-me-an-app/main/install.sh | bash
```

Installs to `/usr/local/bin` if writable, otherwise falls back to `~/.local/bin`. If using `~/.local/bin`, make sure it's in your `PATH`:

```sh
export PATH="$HOME/.local/bin:$PATH"  # add to ~/.zshrc or ~/.bashrc
```

---

## Usage

```sh
breed-me              # interactive project setup
breed-me list         # show previously created projects
breed-me --local      # skip GitHub — local git repo only
breed-me --dry-run    # preview what would be created, no side effects
breed-me --update     # update to the latest version
breed-me --help       # show usage
```

---

## What it does

```
╔════════════════════════════════════════════════════╗
║                                                    ║
║                   ◆ breed-me                    ║
║            Bootstrap a repo in seconds             ║
║                                                    ║
╚════════════════════════════════════════════════════╝

  Project name  › my-app                   (normalized to kebab-case)
  Parent dir    › ~/work                   (remembers last choice)
  Identity      › work                     (saved profile)
  Tech stack    › TypeScript
  License       › MIT
  Branch        › main                     (validated)
  .env.example  › Yes
  Add CI?       › Yes
  Push to GitHub? Yes
  Push to        › my-org                  (personal or any org you belong to)
  Visibility    › private
  Description   › Does something cool

  ┌──────────────────────────────────────────────────────┐
  │  Project    my-app                                   │
  │  Path       ~/work/my-app                            │
  │  Identity   Jane Doe <jane@work.com>                 │
  │  Stack      TypeScript                               │
  │  License    MIT                                      │
  │  Branch     main                                     │
  │  CI         yes                                      │
  │  Owner      my-org                                   │
  │  GitHub     private                                  │
  └──────────────────────────────────────────────────────┘

  Create project? Yes

  ⠸ Creating GitHub repo...
  ✓ my-app is ready  →  https://github.com/my-org/my-app

  Open in editor › Cursor           (only shows installed editors)

  cd ~/work/my-app  (copied to clipboard)
```

---

## Features

### Identity profiles
Save name/email combos as named profiles (e.g. `work`, `personal`). On subsequent runs, pick from the saved list. Stored in `~/.config/breed-me/profiles`.

### Stack boilerplate

| Stack | What you get |
|---|---|
| **Node.js** | `package.json`, `index.js`, `.gitignore` |
| **TypeScript** | `package.json`, `tsconfig.json`, `src/index.ts`, `.gitignore` |
| **Python** | `main.py`, `requirements.txt`, `.gitignore` |
| **Go** | `main.go`, `go.mod` (module path prefilled), `.gitignore` |
| **Rust** | `cargo init` scaffolding if cargo is installed, `.gitignore` |
| **React / Next.js** | `.gitignore` + instruction to run `create-next-app` |
| **Bare** | `README.md`, `.gitignore` — nothing else |
| **From template →** | Clone any GitHub template repo as the base |

Every stack gets a `README.md` prefilled with your project name and description.

### GitHub Actions CI
Opt-in per project. Writes `.github/workflows/ci.yml` tailored to your stack — build, test, correct language version. Triggers on push and pull request to your default branch.

### License picker
MIT, Apache 2.0, GPL-3.0, or None. Generates a proper `LICENSE` file with your name and year.

### Org support
If your GitHub account belongs to organizations, you're offered a choice: push to your personal account or any of your orgs.

### Local-only mode
Pass `--local` to skip all GitHub steps — no `gh` required, no repo created, just a clean local git repo.

### Project history
`breed-me list` shows every project you've created: name, local path, GitHub URL, and date.

### Smart defaults
- **Directory picker** remembers your last-used parent directory
- **Editor picker** only shows editors that are actually installed
- **Name normalization** converts `My App` → `my-app` automatically
- **Branch validation** rejects invalid git ref names before creation
- **`cd` command** is copied to clipboard automatically after setup

---

## Config files

All config lives in `~/.config/breed-me/`:

| File | Contents |
|---|---|
| `profiles` | Saved git identities (`label\|name\|email`) |
| `history` | Project creation log (`name\|path\|url\|date`) |
| `last_dir` | Last-used parent directory |

---

## Uninstall

```sh
rm "$(command -v breed-me)"
rm -rf ~/.config/breed-me   # optional: remove saved profiles and history
```

---

## Built with

- [gum](https://github.com/charmbracelet/gum) — TUI components for shell scripts
- [gh](https://cli.github.com/) — GitHub CLI
- bash

---

<sub>Part of [unlocalhosted](https://github.com/unlocalhosted)</sub>
