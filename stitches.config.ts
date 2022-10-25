import { createStitches } from "@stitches/react";

export const { getCssText } = createStitches({
  theme: {
    space: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
    },
  },
  media: {
    bp1: "(min-width: 768px)",
  },
});
