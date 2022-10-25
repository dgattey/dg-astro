import Stack from "components/ui/Stack";
import Link from "components/Link";
import { styled } from "../../stitches";
import ScrollIndicatorContext from "components/ScrollIndicatorContext";
import { useContext } from "react";

interface Props {
  /**
   * TODO: @dgattey placeholder for when we have router support maybe
   */
  currentPath: string;
}

/**
 * Aspect ratio'd 1:1 circle. Big, bold, and squished text for use as
 * logo. Has background on scroll + scales down a bit.
 */
const LogoText = styled("article", {
  "--padding": "1rem",
  "--margin": "0.5rem",

  "@bp1": {
    "--margin": "1rem",
  },

  fontSize: "2.5rem",
  fontVariationSettings: '"wght" 800, "wdth" 120',
  letterSpacing: "-0.12em",

  overflow: "visible",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  verticalAlign: "middle",
  lineHeight: 1,
  margin: "var(--margin) -0.5rem",
  padding: "var(--padding)",
  pointerEvents: "auto",
  transformOrigin: "top left",
  transition:
    "box-shadow var(--transition), transform var(--transition), background-color var(--transition), border-color var(--transition)",
  willChange: "transform",
  color: "rgb(22, 172, 126)",
  border: "2px solid transparent",
  zIndex: "1",

  background: "var(--background-color)",
  boxShadow: "none",

  "&:before": {
    content: "",
    float: "left",
    width: "auto",
    paddingBottom: "100%",
  },

  variants: {
    isScrolled: {
      true: {
        border: "2px solid var(--card-border-color)",
        transform: "scale(0.75)",
      },
    },
  },
});

/**
 * Logo + scroll to top button, with certain changes that happen on
 * scroll.
 */
const Logo = ({ currentPath }: Props) => {
  const isScrolled = useContext(ScrollIndicatorContext);
  const linkedLogoText =
    currentPath === "/" ? (
      "dg."
    ) : (
      <Link url="/" title="Homepage">
        dg.
      </Link>
    );

  return (
    <Stack css={{ alignItems: "flex-start" }}>
      <LogoText isScrolled={isScrolled}>{linkedLogoText}</LogoText>
      {/* <SpacedScrollIndicator $isScrolled={isScrolled} />  TODO: @dgattey do this one */}
    </Stack>
  );
};

export default Logo;
