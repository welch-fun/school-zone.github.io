# School Zone

A free static school-tools website with a hidden `/duckz/` arcade.

## Included

- Calculator, study timer, random picker, and word counter
- Duckz responsive game grid and animated brown-framed game overlay
- Duck Dash, Memory, Duck Pong, Click Duck, Math Rush, and Reaction

## Correct website URL

This repository belongs to the GitHub account `welch-fun`, so the repository name `school-zone.github.io` does **not** make the site available at `https://school-zone.github.io/`.

Unless you own a separate GitHub account/organization named `school-zone` or configure a domain you own, the expected project-site URL is:

- `https://welch-fun.github.io/school-zone.github.io/`
- Arcade: `https://welch-fun.github.io/school-zone.github.io/duckz/`

## GitHub Pages setup

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Check the **Actions** tab for the `Deploy to GitHub Pages` workflow. Wait for it to finish successfully.
4. Open the project-site URL above.

The workflow in `.github/workflows/deploy.yml` deploys the static files from the repository root. No build tools or npm install are needed.
