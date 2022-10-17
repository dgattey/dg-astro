import { styled } from "@stitches/react";

interface Props {
  /**
   * If provided, sets the ref on the `header` element for
   * sizing/whatever else is needed
   */
  headerRef?: React.RefObject<HTMLDivElement>;
}

// Makes the header bar sticky and not responsive to user events by default
const StickyContainer = styled("section", {
  position: "sticky",
  top: 0,
  "z-index": 1,
  "pointer-events": "none",
});

const LogoHolder = styled("li", {
  padding: 0,
});

/**
 * Creates the site header component. It's a bar that spans across the
 * page and shows a logo + header links if they exist.
 */
const Header = ({ headerRef }: Props) => (
  <StickyContainer className="container">
    <header ref={headerRef}>
      <nav>
        <ul>
          <LogoHolder>dg.</LogoHolder>
        </ul>
      </nav>
    </header>
  </StickyContainer>
);

export default Header;
