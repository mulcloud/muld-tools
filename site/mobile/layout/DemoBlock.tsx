import * as React from 'react';
import styled from 'styled-components';
import { $mul_doc_text_light_blue } from '../../common/style/var';

export default function DemoBlock(props: { card?: any; title: string; children: any }) {
    const { card, title, children } = props;

    const content = card ? <div className="mul-doc-demo-block__card">{card}</div> : children;
    return (
        <View className="mul-doc-demo-block">
            <h2 className="mul-doc-demo-block__title">{title}</h2>
            <div className="mul-doc-demo-block__card">{content}</div>
        </View>
    );
}

const View = styled.div`
    &.mul-doc-demo-block {
        .mul-doc-demo-block__title {
            margin: 0;
            padding: 32px 16px 16px;
            color: ${$mul_doc_text_light_blue};
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
        }

        .mul-doc-demo-block__card {
            margin: 12px 12px 0;
            overflow: hidden;
        }

        .mul-doc-demo-block__title + .mul-doc-demo-block__card {
            margin-top: 0;
        }

        &:first-of-type {
            .mul-doc-demo-block__title {
                padding-top: 20px;
            }
        }
    }
`;
