# Quick Rollback Server

Welcome to the `quick_rollback_server` directory. This server plays a crucial role in facilitating version management and rollback capabilities for our application.

## Key Features

1. **Service on Port 3001**: The server runs on port `3001`.
2. **Root Path Visualization**: When accessing the root path, a visualization page for frontend rollback is returned.
3. **History API**: The endpoint `/history` provides the frontend with historical build records.
4. **Rollback API**: The endpoint `/rollback` allows the frontend to request a rollback to a specific version.
5. **Rollback Logic**: The server processes the rollback request, locates the corresponding build version, and replaces the `build` file content accordingly.

## Getting Started

1. **Starting the Server**: Make sure you are in the `quick_rollback_server` directory and use the following command:
   ```bash
     npm start
   ```

2. **Accessing the Visualization Page**: Navigate to `http://localhost:3001/` to view the frontend visualization for rollback.

## API Details

- **GET `/history`**: Retrieve a list of historical build records.
- **GET `/rollback?id={:id}`**: Request a rollback to a specific version. Ensure to send the version details in the request body.

## Development Notes

1. **Data Persistence**: Ensure you have proper mechanisms to keep track of historical build data.
2. **Error Handling**: Always handle possible errors, especially during the rollback process, to avoid data corruption or loss.
3. **Optimization**: Regularly check for server optimizations, especially when handling larger build files.

## Contributing

1. Make sure you're in the `quick_rollback_server` directory.
2. Create your feature or fix branch (`git checkout -b feature/AmazingFeatureOrFix`).
3. Commit your changes (`git commit -m 'Describe the feature or fix'`).
4. Push to the branch (`git push origin feature/AmazingFeatureOrFix`).
5. Open a pull request to the main project repository.
