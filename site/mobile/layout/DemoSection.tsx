import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

export default function DemoSection(props: any) {
    return (
        <View className={classnames('mul-doc-demo-section', props.className)}>{props.children}</View>
    );
}
const View = styled.section`
    &.mul-doc-demo-section {
        box-sizing: border-box;
        min-height: calc(100vh - 56px);
        padding-bottom: 20px;
    }
`;
