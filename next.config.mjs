/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    compiler: {
        // Remove all console logs, excluding error logs
        removeConsole: { exclude: ["error"] }
    },
};

export default nextConfig;
