// @ts-check
/**
 * @typedef {import("next").NextConfig} NextConfig
 * @typedef {((config?: NextConfig | undefined) => NextConfig) | ((config: NextConfig) => NextConfig)} NextConfigPlugin
 */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
});

/** @type {NextConfig} */
const nextConfig = {
    output: "export",
    experimental: {
        extensionAlias: {
            ".js": [".js", ".ts", ".tsx"],
        },
    },
    reactStrictMode: true,
};

/** @type {NextConfigPlugin[]} */
const plugins = [withPWA];

/**
 * @type {(
 *     phase: string,
 *     { defaultConfig }: { defaultConfig: NextConfig },
 * ) => NextConfig}
 */
const nextComposePlugins = () =>
    plugins.reduce((acc, plugin) => plugin(acc), nextConfig);

module.exports = nextComposePlugins;
