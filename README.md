# Version Manager Application

An intuitive and user-friendly application built using Node.js, React, Material-UI, and Webpack. Designed to manage different versions of your codebase, this tool provides the ability to rollback with just a single click. Moreover, with the power of Server Side Rendering (SSR), enjoy faster initial page loads and improved SEO capabilities.

## Features

- **Version Management**: Easily switch between different versions of your project.
- **Server Side Rendering (SSR)**: Enhance performance and enable switching static files on the server side.
- **One-click Rollback**: Swiftly revert to a previous version without hassle.
- **Intuitive UI**: Leveraging the power of React and the beauty of Material-UI for a seamless user experience.
- **Lightweight**: Utilizes basic HTML, JS, and Webpack to keep the app swift and responsive.

## Prerequisites

- Node.js
- npm or yarn (whichever you prefer for package management)

## Setup & Installation

1. **Clone the Repository**
   ```bash
     git clone https://github.com/zywangdylan/quick_rollback
     cd quick_rollback
   ```

2. **Install Dependencies**
   ```bash
     cd quick_rollback_server
     npm install
     cd ../quick_rollback_client
     npm install
   ```

3. **Start the Development Server with SSR**
   ```bash
     cd quick_rollback_server
     npm run dev
   ```
   
4. **Build the client**
   ```bash
     cd quick_rollback_client
     npm run build
   ```

The application, with SSR enabled, should now be running on `http://localhost:3000/` or a specified port if you've set it differently.

## Usage

1. **Develop Different Versions**: Go to `quick_rollback_client` and start coding. Finally, run `npm run build` to create static files using webpack after coding. The program will create a history for this build for you.
2. **Switching Between Versions**: In `quick_rollback_server`, there is also a dashboard for switching versions intuitively. In that dashboard interface, you can select the desired version from the list.
3. **Rollback**: Click on the 'Start Rollback' button next to the desired version you wish to revert to.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## Acknowledgments

- Built with ❤️ by Dylan Wang.
- Inspired by the need for a simple and efficient version management tool.
- Special thanks to the creators and contributors of Material-UI for their amazing UI toolkit.
