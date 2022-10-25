import { styled } from "@stitches/react";
import Link from "components/Link";

// Switches to two rows for mobile
const Navigation = styled("nav", {
  flexDirection: "column",
  "@bp1": {
    flexDirection: "row",
  },
});

// Wraps so it can collapse better on mobile
const FlexList = styled("ul", {
  display: "flex",
  flexWrap: "wrap",
});

/**
 * Creates the site footer component - shows version data + copyright
 */
const Footer = () => {
  const { data: version } = { data: "placeholderVersion" };
  const { data: footerLinks } = {
    data: [{ title: "placeholderLink", url: "placeholderUrl" }],
  };
  const listedLinkElements = footerLinks?.map((link) => (
    <li key={link.url}>
      <Link {...link} isExternal={link.url?.startsWith("http")} />
    </li>
  ));
  return (
    <section className="container">
      <footer>
        <Navigation>
          <FlexList>
            <li>© {new Date().getFullYear()} Dylan Gattey</li>
            <li>{version}</li>
          </FlexList>
          <FlexList>{listedLinkElements}</FlexList>
        </Navigation>
      </footer>
    </section>
  );
};

export default Footer;
