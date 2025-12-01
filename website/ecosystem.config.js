module.exports = {
    apps: [
        {
            name: 'dawar-website',
            script: 'server.js', // Run the custom server directly
            args: '',
            cwd: '/home/dawar/dawar-app', // Explicitly set the directory
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '400M', // Restart if it uses too much memory
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                // Add this to fix the "Couldn't find pages" error
                NEXT_MANUAL_SIG_HANDLE: 'true',
            },
        },
    ],
};
