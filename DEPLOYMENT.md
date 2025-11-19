# Deployment Instructions

Since I cannot directly access your GitHub account, please follow these steps to host your app on GitHub Pages.

## Prerequisites
- You need a GitHub account.
- You need `git` installed on your computer.

## Steps

1.  **Create a New Repository on GitHub**
    - Go to [GitHub.com](https://github.com) and sign in.
    - Click the "+" icon in the top right and select "New repository".
    - Name it `bacteria-learning-app`.
    - Make it **Public**.
    - Do **not** initialize with README, .gitignore, or license.
    - Click "Create repository".

2.  **Push Your Code**
    - Open your terminal in the project folder: `c:\Users\jbarr\Downloads\bacteria`
    - Run the following commands:

    ```bash
    git push -u origin main
    ```
    *(Note: I have already configured the remote to `https://github.com/YCCCVRLab/bacteria-learning-app.git` for you)*

3.  **Enable GitHub Pages**
    - Go to your repository settings on GitHub.
    - Click on **Pages** in the left sidebar.
    - Under **Source**, select `Deploy from a branch`.
    - Under **Branch**, select `main` and `/ (root)`.
    - Click **Save**.

4.  **View Your App**
    - Wait a minute or two.
    - Your app will be live at `https://YCCCVRLab.github.io/bacteria-learning-app/`.

## Troubleshooting
- If you see a 404 error, wait a few more minutes and refresh.
- Ensure your `index.html` is in the root of the repository (it is).
