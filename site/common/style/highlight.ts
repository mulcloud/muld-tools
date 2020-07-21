import { createGlobalStyle } from 'styled-components';

import {
    $mul_doc_code_color,
    $mul_doc_code_font_family,
    $mul_doc_green,
    $mul_doc_purple,
} from './var';

const highlight = `
code {
  position: relative;
  display: block;
  overflow-x: auto;
  color: ${$mul_doc_code_color};
  font-weight: 400;
  font-size: 13.4px;
  font-family: ${$mul_doc_code_font_family};
  line-height: 26px;
  white-space: pre-wrap;
  word-wrap: break-word;
  -webkit-font-smoothing: auto;
}

pre {
  margin: 20px 0 0;

  + p {
    margin-top: 20px;
  }
}

.hljs {
  display: block;
  padding: 0.5em;
  overflow-x: auto;
  background: #fff;
}

.hljs-subst {
  color: ${$mul_doc_code_color};
}

.hljs-string,
.hljs-meta,
.hljs-symbol,
.hljs-template-tag,
.hljs-template-variable,
.hljs-addition {
  color: ${$mul_doc_green};
}

.hljs-comment,
.hljs-quote {
  color: #999;
}

.hljs-params,
.hljs-keyword,
.hljs-attribute {
  color: ${$mul_doc_purple};
}

.hljs-deletion,
.hljs-variable,
.hljs-number,
.hljs-regexp,
.hljs-literal,
.hljs-bullet,
.hljs-link {
  color: #eb6f6f;
}

.hljs-attr,
.hljs-selector-tag,
.hljs-title,
.hljs-section,
.hljs-built_in,
.hljs-doctag,
.hljs-type,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-strong {
  color: #4994df;
}

.hljs-emphasis {
  font-style: italic;
}`;

export const Highlight = createGlobalStyle`${highlight}`;
