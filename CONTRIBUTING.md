# Contributing

First off, thanks for taking the time to contribute! We're excited to have you here.

This document provides a set of guidelines for contributing to this project. These are mostly guidelines, not strict rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Getting Started

Ready to make a change? Here's how to get set up:

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** to your local machine:
    ```sh
    git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
    cd REPOSITORY_NAME
    ```
3.  **Install dependencies.** We use `npm` for package management.
    ```sh
    npm install
    ```
4.  **Run the development server.**
    ```sh
    npm start
    ```
5.  **Create a new branch** for your changes. Use a descriptive name.
    ```sh
    git checkout -b feat/your-awesome-feature
    ```

Now you're ready to start coding!

## Coding Style

We value readability and user experience above all else.

*   **Readable code over clever code.** If you have to pause and think about what a line of code does, it's probably too complex.
*   **Short functions with clear names.** A function should do one thing and do it well. Its name should describe what it does.
*   **Product-minded.** Always think about the end user. How does your change improve their experience? Good error messages are a feature, not an afterthought.

We use Prettier to automatically format our code. Please run it before committing your changes:

```sh
npm run format
```

## Submitting a Pull Request

When you're ready to submit your changes, follow these steps:

1.  **Make sure the tests pass.** We won't merge code that breaks the test suite.
    ```sh
    npm test
    ```
2.  **Commit your changes** with a clear and descriptive message. We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. For example:
    *   `feat: Add user profile page`
    *   `fix: Correctly handle API errors in login form`
    *   `docs: Update CONTRIBUTING.md with new setup instructions`
3.  **Push your branch** to your fork on GitHub.
    ```sh
    git push origin feat/your-awesome-feature
    ```
4.  **Open a Pull Request** to the `main` branch of the original repository.
5.  **Write a clear PR description.** Explain the "why" behind your change, not just the "what". If your PR addresses an open issue, link to it (e.g., `Closes #123`).
6.  **Wait for a review.** One of the maintainers will review your PR. We appreciate your patience! We'll provide feedback and may ask for changes.

That's it! Thanks again for your contribution.