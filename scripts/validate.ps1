# Comprehensive code quality validation script

Write-Host "🔍 Running comprehensive code quality checks..." -ForegroundColor Cyan
Write-Host ""

# Format check
Write-Host "📝 1. Checking code formatting with Prettier..." -ForegroundColor Yellow
$formatResult = npm run format:check
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Formatting check passed" -ForegroundColor Green
} else {
    Write-Host "❌ Formatting check failed - run 'npm run format' to fix" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Linting
Write-Host "🔍 2. Running ESLint..." -ForegroundColor Yellow
$lintResult = npm run lint
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Linting passed" -ForegroundColor Green
} else {
    Write-Host "❌ Linting failed - run 'npm run lint:fix' to fix auto-fixable issues" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Type checking
Write-Host "🔷 3. Running TypeScript type check..." -ForegroundColor Yellow
$typeResult = npm run type-check
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Type checking passed" -ForegroundColor Green
} else {
    Write-Host "❌ Type checking failed - fix TypeScript errors" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Build check
Write-Host "🏗️  4. Running build check..." -ForegroundColor Yellow
$buildResult = npm run build:check
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build check passed" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed - fix build errors" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "🎉 All checks passed! Your code is ready for commit." -ForegroundColor Green
