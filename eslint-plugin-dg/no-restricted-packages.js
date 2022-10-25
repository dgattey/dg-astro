/**
 * Actually fixes a node by inserting import statements that have the icon import in
 * the package name (making sure to handle multiple imports from one icon package).
 * @type {(node: import('./types').ImportDeclaration) => import('./types').ReportArguments['fix']}
 */
const FIX_WITH_RELATIVE_IMPORT = (node) => (fixer) => {
  const replacements = node.specifiers.map((specifier, index) => {
    const isLast = index === node.specifiers.length - 1;
    const newLine = isLast ? "" : "\n";
    return fixer.insertTextAfterRange(
      node.range,
      `import {${specifier.local.name}} from '${node.source.value}/${specifier.local.name}';${newLine}`
    );
  });
  return [fixer.removeRange(node.range), ...replacements];
};

/**
 * Actually fixes a node by inserting import statements from a different package entirely
 * @type {(otherPackage: string) => (node: import('./types').ImportDeclaration) => import('./types').ReportArguments['fix']}
 */
const FIX_WITH_OTHER_PACKAGE = (otherPackage) => (node) => (fixer) => {
  const replacements = node.specifiers.map((specifier, index) => {
    const isLast = index === node.specifiers.length - 1;
    const newLine = isLast ? "" : "\n";
    return fixer.insertTextAfterRange(
      node.range,
      `import {${specifier.local.name}} from '${otherPackage}';${newLine}`
    );
  });
  return [fixer.removeRange(node.range), ...replacements];
};

/**
 * These are all the libraries we want to disallow direct imports from,
 * with different resolutions according to package.
 */
const LIBRARIES = {
  "@fortawesome/free-brands-svg-icons": FIX_WITH_RELATIVE_IMPORT,
  "@fortawesome/free-solid-svg-icons": FIX_WITH_RELATIVE_IMPORT,
  "@stitches/react": FIX_WITH_OTHER_PACKAGE("stitches"),
  "@stitches/core": FIX_WITH_OTHER_PACKAGE("stitches"),
};

/**
 * Rule to make sure an ImportDeclaration doesn't directly import a full
 * font-awesome package since it prevents tree shaking.
 *
 * @param {import('./types').Context } context
 * @returns {import('./types').RuleListener['ImportDeclaration']}
 */
const importDeclarationRule = (context) => (node) => {
  const { range } = node;

  // We want to allow importing types from those packages
  if (node.importKind === "type" || !range) {
    return;
  }

  // Report an error if the package name is one of the disallowed packages of icons
  Object.entries(LIBRARIES).forEach(([library, fixFunction]) => {
    if (node.source?.value === library) {
      context.report({
        node,
        messageId: "noImportsAlone",
        data: {
          library,
        },
        fix: fixFunction(node),
      });
    }
  });
};

/**
 * Our full rule, with meta + function to create it
 *
 * @type {import('./types').Rule}
 */
const rule = {
  create: (context) => ({
    // Only imports need to be linted by this rule
    ImportDeclaration: importDeclarationRule(context),
  }),
  defaultOptions: [],
  meta: {
    type: "problem",
    messages: {
      noImportsAlone: "No imports from '{{ library }}' alone",
    },
    fixable: "code",
    schema: [],
  },
};

module.exports = rule;
