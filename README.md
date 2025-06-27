# App Workflows: CI/CD for Pre-Check, Preview, and Production

This repository contains GitHub Actions workflows for automating the CI/CD processes of a React Native app using Expo and EAS (Expo Application Services). It consists of three key workflows:

1. **App Pre-Check** — Runs tests and builds for validation on pull requests.
2. **Release App (Preview)** — Builds and submits preview releases from `release/*` branches.
3. **Release App (Production)** — Builds and submits production releases from the `main` branch.

---

## 🚦 1. App Pre-Check

### Trigger
- Runs on `push` or `pull_request` events targeting the `branch_name` branch.

### Jobs

#### ✅ `setup`
- Retrieves platform-specific `flow_path` using a Node script.
- Outputs:
    - `flow_path_ios`
    - `flow_path_android`

#### 🧹 `run_eslint`
- Installs dependencies and runs ESLint with no warnings allowed.

#### 🧪 `run_jest`
- Installs dependencies and runs Jest unit tests.

#### 📦 `build_android_for_e2e`
- Builds the Android app using the `e2e-test` profile for end-to-end testing.

#### 📦 `build_ios_for_e2e`
- Builds the iOS app using the `e2e-test` profile for end-to-end testing.

#### 🧪 `maestro_test_android`
- Runs Maestro E2E tests on Android.
- Depends on: `setup`, `build_android_for_e2e`.

#### 🧪 `maestro_test_ios`
- Runs Maestro E2E tests on iOS.
- Depends on: `setup`, `build_ios_for_e2e`.

---

## 🚀 2. Release App (Preview)

### Trigger
- Runs on `push` to branches matching the pattern `release/*`.

### Jobs

#### 🔧 `setup`
- Fetches the app version using a Node script in the `.build` directory.
- Tags the commit with the version.

#### 🏗 `build_ios`
- Builds the iOS app using the `preview` profile.
- Sets `APP_VERSION` for version tracking.

#### 🏗 `build_android`
- Builds the Android app using the `preview` profile.
- Sets `APP_VERSION` for version tracking.

#### 📤 `submit_ios`
- Submits the iOS build to App Store Connect.

#### 📤 `submit_android`
- Submits the Android build to the Play Console.

---

## 🚀 3. Release App (Production)

### Trigger
- Runs on `push` to the `main` branch.

### Jobs

#### 🔧 `setup`
- Determines the production app version from a script.
- Tags the commit with the version number.

#### 🏗 `build_ios`
- Builds the iOS app using the `production` profile.

#### 🏗 `build_android`
- Builds the Android app using the `production` profile.

#### 📤 `submit_ios`
- Submits the iOS build to App Store Connect.

#### 📤 `submit_android`
- Submits the Android build to the Play Console.
