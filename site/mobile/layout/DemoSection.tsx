import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

export default function DemoSection(props: any) {
    return (
        <section className={classnames('muld-doc-demo-section', props.className)}>
            {props.children}
        </section>
    );
}

const View = styled.section`
    &.muld-doc-demo-section {
        box-sizing: border-box;
        min-height: calc(100vh - 56px);
        padding-bottom: 20px;
    }
`;
