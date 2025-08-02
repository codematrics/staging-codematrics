#!/usr/bin/env sh

echo "🔍 Running comprehensive code quality checks..."
echo ""

# Format check
echo "📝 1. Checking code formatting with Prettier..."
if npm run format:check; then
    echo "✅ Formatting check passed"
else
    echo "❌ Formatting check failed - run 'npm run format' to fix"
    exit 1
fi
echo ""

# Linting
echo "🔍 2. Running ESLint..."
if npm run lint; then
    echo "✅ Linting passed"
else
    echo "❌ Linting failed - run 'npm run lint:fix' to fix auto-fixable issues"
    exit 1
fi
echo ""

# Type checking
echo "🔷 3. Running TypeScript type check..."
if npm run type-check; then
    echo "✅ Type checking passed"
else
    echo "❌ Type checking failed - fix TypeScript errors"
    exit 1
fi
echo ""

# Build check
echo "🏗️  4. Running build check..."
if npm run build:check; then
    echo "✅ Build check passed"
else
    echo "❌ Build failed - fix build errors"
    exit 1
fi
echo ""

echo "🎉 All checks passed! Your code is ready for commit."
