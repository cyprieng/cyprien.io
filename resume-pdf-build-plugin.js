import generateResumePDF from "./src/utils/generateResumePDF.ts";

export default function resumePDFBuildPlugin() {
  return {
    name: "resume-pdf-build-plugin",
    hooks: {
      "astro:build:done": async () => {
        await generateResumePDF();
      },
    },
  };
}
