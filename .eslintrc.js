module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "airbnb-typescript", "prettier"],
  plugins: ["import", "prettier"],
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  rules: {
    "import/no-named-as-default": "off",
    "react/jsx-props-no-spreading": "off",
    "no-nested-ternary": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "jsx-a11y/no-static-element-interactions": "off"
  }
}
