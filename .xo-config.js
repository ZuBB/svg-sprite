module.exports = {
  "space": true,
  "plugins": [
    "jsdoc"
  ],
  "extends": [
    "plugin:jsdoc/recommended"
  ],
  "rules": {
    "arrow-body-style": "off",
    "capitalized-comments": "off",
    "comma-dangle": [
      "error",
      "never"
    ],
    "eslint-comments/disable-enable-pair": "off",
    "jsdoc/check-values": [
      "error",
      {
        "allowedLicenses": [
          "MIT https://github.com/svg-sprite/svg-sprite/blob/main/LICENSE"
        ]
      }
    ],
    "jsdoc/no-undefined-types": [
      "error",
      {
        "definedTypes": [
          "SVGSpriter",
          "File",
          "SVGShape",
          "SVGSprite",
          "playwright",
          "HTMLElement"
        ]
      }
    ],
    "jsdoc/require-returns": "error",
    "jsdoc/tag-lines": "off",
    "logical-assignment-operators": "off",
    "max-depth": [
      "warn",
      5
    ],
    "max-params": "off",
    "no-bitwise": "off",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "operator-linebreak": [
      "error",
      "after"
    ],
    "prefer-template": "error",
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "spaced-comment": "off",
    "unicorn/explicit-length-check": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-negated-condition": "off",
    "unicorn/prefer-code-point": "off",
    "unicorn/prefer-event-target": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-reflect-apply": "off",
    "unicorn/prefer-string-slice": "off",
    "unicorn/prevent-abbreviations": "off",

    "import/newline-after-import": "off",
  },
  "overrides": [
    {
      "files": [
        "test/**"
      ],
      "plugins": [
        "jest",
        "jest-formatting"
      ],
      "extends": [
        "plugin:jest/recommended",
        "plugin:jest-formatting/strict"
      ],
      "envs": [
        "jest/globals"
      ],
      "rules": {
        "jsdoc/require-returns": "off"
      }
    }
  ]
}
