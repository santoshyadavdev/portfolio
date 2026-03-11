import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Brand colors
const PURPLE_ACCENT = "#7c3aed";
const DARK_BG = "#1a1a2e";
const WHITE = "#ffffff";
const LIGHT_GRAY = "#e5e5e5";
const MUTED_GRAY = "#9ca3af";

// OG Image dimensions (standard)
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Load fonts as raw buffers from fontsource package
const fontsDir = join(process.cwd(), "node_modules/@fontsource/inter/files");

const interRegular = readFileSync(
  join(fontsDir, "inter-latin-400-normal.woff"),
);
const interBold = readFileSync(join(fontsDir, "inter-latin-700-normal.woff"));

export interface OGImageParams {
  title: string;
  description?: string;
  author?: string;
  date?: Date;
}

/**
 * Truncates text to a maximum length with ellipsis
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + "...";
}

/**
 * Formats a date for display on the OG image
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculates appropriate title font size based on length
 * Handles long titles gracefully with smaller font scaling
 */
function getTitleFontSize(title: string): number {
  if (title.length > 100) return 36;
  if (title.length > 70) return 42;
  if (title.length > 50) return 48;
  return 56;
}

/**
 * Generates an OG image PNG buffer from post metadata
 */
export async function generateOGImage(params: OGImageParams): Promise<Buffer> {
  const { title, description, author, date } = params;

  // Truncate description if needed
  const displayDescription = description ? truncateText(description, 150) : "";

  // Calculate responsive title font size
  const titleFontSize = getTitleFontSize(title);
  const displayTitle = truncateText(title, 120);

  // Build the JSX-like object for satori
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: DARK_BG,
          padding: "60px",
          fontFamily: "Inter",
        },
        children: [
          // Header with site branding
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "40px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    },
                    children: [
                      // Purple accent bar
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "6px",
                            height: "40px",
                            backgroundColor: PURPLE_ACCENT,
                            borderRadius: "3px",
                          },
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: "28px",
                            fontWeight: 700,
                            color: WHITE,
                          },
                          children: "santoshyadav.dev",
                        },
                      },
                    ],
                  },
                },
                // Decorative element
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      gap: "8px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "12px",
                            height: "12px",
                            backgroundColor: PURPLE_ACCENT,
                            borderRadius: "50%",
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "12px",
                            height: "12px",
                            backgroundColor: PURPLE_ACCENT,
                            borderRadius: "50%",
                            opacity: 0.6,
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "12px",
                            height: "12px",
                            backgroundColor: PURPLE_ACCENT,
                            borderRadius: "50%",
                            opacity: 0.3,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          // Main content area
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
              },
              children: [
                // Post title (focal point)
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: `${titleFontSize}px`,
                      fontWeight: 700,
                      color: WHITE,
                      lineHeight: 1.2,
                      margin: 0,
                      marginBottom: "24px",
                    },
                    children: displayTitle,
                  },
                },
                // Description
                displayDescription
                  ? {
                      type: "p",
                      props: {
                        style: {
                          fontSize: "24px",
                          color: LIGHT_GRAY,
                          lineHeight: 1.5,
                          margin: 0,
                          opacity: 0.9,
                        },
                        children: displayDescription,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
          // Footer with author and date
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `2px solid ${PURPLE_ACCENT}33`,
                paddingTop: "30px",
                marginTop: "auto",
              },
              children: [
                // Author info
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    },
                    children: [
                      // Author avatar placeholder (purple circle)
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "48px",
                            height: "48px",
                            backgroundColor: PURPLE_ACCENT,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          children: {
                            type: "span",
                            props: {
                              style: {
                                fontSize: "20px",
                                fontWeight: 700,
                                color: WHITE,
                              },
                              children: author
                                ? author.charAt(0).toUpperCase()
                                : "S",
                            },
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                          },
                          children: [
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: "20px",
                                  fontWeight: 600,
                                  color: WHITE,
                                },
                                children: author || "Santosh Yadav",
                              },
                            },
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: "16px",
                                  color: MUTED_GRAY,
                                },
                                children: "Developer Advocate",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                // Publish date
                date
                  ? {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "12px 20px",
                          backgroundColor: `${PURPLE_ACCENT}22`,
                          borderRadius: "8px",
                        },
                        children: {
                          type: "span",
                          props: {
                            style: {
                              fontSize: "18px",
                              color: LIGHT_GRAY,
                            },
                            children: formatDate(date),
                          },
                        },
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
          // Decorative corner accent
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                right: 0,
                width: "200px",
                height: "200px",
                background: `linear-gradient(135deg, ${PURPLE_ACCENT}22 0%, transparent 70%)`,
              },
            },
          },
        ],
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  // Convert SVG to PNG using resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: OG_WIDTH,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
