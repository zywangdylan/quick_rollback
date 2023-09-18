export function htmlTemplate(app) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Server Side page for quick rollback"
        />
        <title>Quick Rollback Management</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${app}</div>
        <script src="./app.bundle.js"></script>
      </body>
    </html>
  `;
}
