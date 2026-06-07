import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	reactCompiler: true,
	turbopack: {
		resolveAlias: {
			'../build/polyfills/polyfill-module': './libs/modern-polyfill.js',
			'next/dist/build/polyfills/polyfill-module': './libs/modern-polyfill.js',
		},
	},
	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
	images: {
		formats: ['image/avif'],
		dangerouslyAllowLocalIP: true,
		dangerouslyAllowSVG: true,
		qualities: [90],
		minimumCacheTTL: 2592000,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3001',
			},
		],
		localPatterns: [
			{
				pathname: '**',
			},
		],
	},
	experimental: {
		cssChunking: true,
		inlineCss: true,
		optimizeCss: true,
		turbopackFileSystemCacheForDev: true,
		serverActions: {
			bodySizeLimit: '6mb',
		},
		optimizePackageImports: [
			'react-icons',
			'@mantine/core',
			'@mantine/form',
			'@mantine/hooks',
			'@mantine/nprogress',
			'@mantine/carousel',
			'@mantine/dropzone',
		],
	},
}

export default nextConfig
