module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "airbnb-typescript", "prettier", "airbnb/hooks"],
  plugins: ["import", "prettier"],
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        peerDependencies: true
      },
    ],
    "import/prefer-default-export": "off",
  },
}
