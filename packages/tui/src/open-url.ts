import { spawn } from "node:child_process";

/** Opens a URL in the user's browser (`o` on a card), without waiting for it. */
export function openUrl(
	url: string,
	onError?: (message: string) => void,
	command = process.platform === "darwin" ? "open" : "xdg-open",
): void {
	spawn(command, [url], { detached: true, stdio: "ignore" })
		.on("error", (err: Error) => onError?.(`couldn't open the link: ${err.message}`))
		.unref();
}
