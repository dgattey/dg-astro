import Footer from "components/Footer";
import Header from "components/header/Header";
import ScrollIndicatorContext from "components/ScrollIndicatorContext";
import { useRef } from "react";

/**
 * We have props that dictate a fallback for SWRConfig, plus children
 */
type Props = Pick<React.ComponentProps<"div">, "children">;

/**
 * Basic page layout for every page. Has a sticky, contained header above
 * the main (contained) content, with a (contained) footer below. No wrapper
 * around all items to save on divs. Ensures color scheme is applied.
 */
const PageLayout = ({ children }: Props) => {
  const headerSizingRef = useRef<HTMLDivElement>(null);
  return (
    <ScrollIndicatorContext.Provider value={false}>
      <Header headerRef={headerSizingRef} />
      <section className="container">
        <main>{children}</main>
      </section>
      <Footer />
    </ScrollIndicatorContext.Provider>
  );
};

export default PageLayout;
