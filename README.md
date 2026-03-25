# breed-me-an-app

A TUI tool to bootstrap a new project — sets up git, configures identity per-repo, scaffolds boilerplate by stack, creates a GitHub repo, and pushes. All in one command.

## Install

```sh
curl -fsSL https://raw.githubusercontent.com/unlocalhosted/breed-me-an-app/main/install.sh | bash
```

Requires [gum](https://github.com/charmbracelet/gum) and [gh](https://cli.github.com/).

```sh
brew install gum gh
```

## Usage

```sh
new-project
```

Walks you through:

- Project name + parent directory
- `git user.name` / `git user.email` (set per-repo)
- Tech stack (Node.js, TypeScript, Python, Go, Rust, React/Next.js, Bare)
- Repo visibility (private / public)
- Description

Then creates the directory, scaffolds boilerplate, makes an initial commit, creates the GitHub repo, and pushes.
