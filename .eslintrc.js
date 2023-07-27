module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "prettier"],
  plugins: ["import", "prettier"],
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
  },
}
