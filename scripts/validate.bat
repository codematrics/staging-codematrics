@echo off
echo 🔍 Running comprehensive code quality checks...
echo.

echo 📝 1. Checking code formatting with Prettier...
call npm run format:check
if %errorlevel% neq 0 (
    echo ❌ Formatting check failed - run 'npm run format' to fix
    exit /b 1
)
echo ✅ Formatting check passed
echo.

echo 🔍 2. Running ESLint...
call npm run lint
if %errorlevel% neq 0 (
    echo ❌ Linting failed - run 'npm run lint:fix' to fix auto-fixable issues
    exit /b 1
)
echo ✅ Linting passed
echo.

echo 🔷 3. Running TypeScript type check...
call npm run type-check
if %errorlevel% neq 0 (
    echo ❌ Type checking failed - fix TypeScript errors
    exit /b 1
)
echo ✅ Type checking passed
echo.

echo 🏗️  4. Running build check...
call npm run build:check
if %errorlevel% neq 0 (
    echo ❌ Build failed - fix build errors
    exit /b 1
)
echo ✅ Build check passed
echo.

echo 🎉 All checks passed! Your code is ready for commit.
