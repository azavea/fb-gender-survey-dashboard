---
name: Release
about: When ready to cut a release
title: Release X.Y.Z
labels: release
assignees: ""
---

## Overview

Releases for this frontend only app require that commits in `develop` are
merged to `master`. Netlify manages the CI and deploy process when new
commits are added to `master`. These instructions assume the `git flow` tool
is installed on your workstation, and the default values applied from `git flow init`.

Substitute `X.Y.Z` below for the version for this release.

## Steps

- [ ] Test the staging site to ensure it is ready for production
- [ ] Start a new release branch:

```bash
git flow release start X.Y.Z
```

- [ ] Rotate `CHANGELOG.md` (following [Keep a Changelog](https://keepachangelog.com/) principles)
- [ ] Ensure outstanding changes are committed:

```bash
git status # Is the git staging area clean?
git add CHANGELOG.md
git commit -m "X.Y.Z"
```

- [ ] Publish the release branch:

```bash
git flow release publish X.Y.Z
```

- [ ] Finish and publish the release branch:
  - When prompted, keep default commit messages
  - Use `X.Y.Z` as the tag message

```bash
git flow release finish -p X.Y.Z
```

- [ ] Test the production site
