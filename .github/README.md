# CI/CD Pipeline

## Overview

This project uses GitHub Actions for continuous integration and deployment.

## Workflows

### CI Workflow

- **Trigger**: Push to main/develop, Pull requests
- **Jobs**:
  - Lint and Type Check
  - Test (placeholder)
  - Build

### PR Workflow

- **Trigger**: Pull request events
- **Jobs**: Validates code quality

## Local Development

### Pre-commit Hooks

Run automatically on commit:

- ESLint fixes
- Prettier formatting

### Manual Commands

- `npm run check-all` - Run all checks
- `npm run fix-all` - Fix all issues
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run type-check` - Check TypeScript

## Required Secrets

Add these to GitHub repository settings:

- `EXPO_TOKEN` - For Expo builds (optional)
