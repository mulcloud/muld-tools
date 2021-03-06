/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { App } from './App';
import { Base as BaseStyle } from '../common/style/base';
import { Highlight as HighlightStyle } from '../common/style/highlight';

const View = styled.div`
    .mul-doc-intro {
        padding-top: 20px;
        font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
        text-align: center;

        p {
            margin-bottom: 20px;
        }
    }
`;

render(
    <View>
        <BaseStyle />
        <HighlightStyle />
        <App />
    </View>,
    document.getElementById('app'),
);
