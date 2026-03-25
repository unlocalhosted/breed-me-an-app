# breed-me-an-app

> `git init` is just the warmup. `breed-me` does the whole thing.

Stack chosen. Boilerplate written. GitHub repo created. First commit pushed. `cd` command on your clipboard. Done — before your IDE finishes opening.

---

## Quickstart

```sh
# prerequisites (once)
brew install gum gh
gh auth login

# install
curl -fsSL https://raw.githubusercontent.com/unlocalhosted/breed-me-an-app/main/install.sh | bash

# go
breed-me
```

> If installed to `~/.local/bin`, add it to your PATH: `export PATH="$HOME/.local/bin:$PATH"`

---

## The flow

```
╔════════════════════════════════════════════════════╗
║                   ◆ breed-me                       ║
║            Bootstrap a repo in seconds             ║
╚════════════════════════════════════════════════════╝

  Project name    › my-app          ← normalized to kebab-case
  Parent dir      › ~/work          ← remembers your last pick
  Identity        › work            ← saved profile (name + email)
  Stack           › TypeScript
  License         › MIT
  Branch          › main
  .env.example?   › Yes
  GitHub Actions? › Yes
  Push to GitHub? › Yes
  Owner           › my-org          ← personal account or any org
  Visibility      › private
  Description     › Does something cool

  ┌──────────────────────────────────────────────────┐
  │  Project    my-app                               │
  │  Path       ~/work/my-app                        │
  │  Identity   Jane Doe <jane@work.com>             │
  │  Stack      TypeScript  ·  MIT  ·  main          │
  │  CI         yes  ·  GitHub  private              │
  │  Owner      my-org                               │
  └──────────────────────────────────────────────────┘

  Create project? Yes

  ⠸ Creating GitHub repo...
  ✓ my-app is ready  →  https://github.com/my-org/my-app

  Open in editor › Cursor    ← only installed editors appear

  cd ~/work/my-app            ← already on your clipboard
```

---

## Commands

```sh
breed-me            # start a new project
breed-me list       # see everything you've spawned
breed-me --local    # skip GitHub entirely — local git repo only
breed-me --dry-run  # preview what would happen, touch nothing
breed-me --update   # update to the latest version
breed-me --help     # usage
```

---

## Stacks

| Stack | What gets created |
|---|---|
| **Node.js** | `package.json`, `index.js`, `.gitignore` |
| **TypeScript** | pnpm + bun runtime · `vitest` · `oxlint` · `src/index.ts` + `src/index.test.ts` |
| **Python** | `main.py`, `requirements.txt`, `.gitignore` |
| **Go** | `main.go`, `go.mod` (module path set to your GitHub handle), `.gitignore` |
| **Rust** | Full `cargo init` if cargo is installed, `.gitignore` |
| **React (Vite)** | pnpm + Vite + React 19 · `vitest` + `@testing-library/react` · `oxlint` · `react-grab` |
| **Next.js** | pnpm + `create-next-app` (App Router + Tailwind) · `vitest` · `oxlint` · `react-grab` |
| **Bare** | `README.md` + `.gitignore` — nothing else |
| **From template →** | Clone any GitHub template repo as the starting point |

Every stack includes a `README.md` and an optional `LICENSE` file prefilled with your name and year.

> **TypeScript, React, and Next.js** require `pnpm` (`npm install -g pnpm`) and a modern `bun` install for the TypeScript backend runtime.

---

## GitHub Actions CI

Opt-in. Picks the right workflow for your stack — correct language version, build step, test step — and writes it to `.github/workflows/ci.yml`. Triggers on push and pull request against your default branch.

---

## Identity profiles

`breed-me` always sets `git user.name` and `git user.email` per repo — no accidental commits from the wrong account. Save identities as named profiles (`work`, `personal`) and pick from the list on each run instead of typing from scratch.

Profiles live in `~/.config/breed-me/profiles`.

---

## Org support

If your GitHub account belongs to organizations, you're shown a picker: your personal account at the top, then each org. The selected owner is used for the repo name, `go.mod` module path, and the final GitHub URL.

---

## Config

Everything lives in `~/.config/breed-me/`:

| File | Contents |
|---|---|
| `profiles` | Saved git identities |
| `history` | Every project you've created (name, path, URL, date) |
| `last_dir` | Your last-used parent directory |

---

## Uninstall

```sh
rm "$(command -v breed-me)"
rm -rf ~/.config/breed-me    # removes saved profiles and history
```

---

Built with [gum](https://github.com/charmbracelet/gum), [gh](https://cli.github.com/), and bash.

<sub>Part of [unlocalhosted](https://github.com/unlocalhosted)</sub>
