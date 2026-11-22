import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) {
      const rel = full.split(path.sep).join("/");
      if (!/\/de\//.test(`/${rel}`)) continue;
      const html = fs.readFileSync(full, "utf8").replace("<html lang=\"en\"", "<html lang=\"de\"");
      fs.writeFileSync(full, html);
    }
  }
}

walk("out");
console.log("Set lang=de on German HTML files");
