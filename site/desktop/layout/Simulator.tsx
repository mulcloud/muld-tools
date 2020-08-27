import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import {
    $mul_doc_border_radius,
    $mul_doc_simulator_width,
    $mul_doc_padding,
    $mul_doc_header_top_height,
    $mul_doc_row_max_width,
    getNum,
} from '../../common/style/var';

export default function Simulator(props: any) {
    const [scrollTop, setScrollTop] = React.useState(window.scrollY);
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    const iframeRef = React.useRef(null);

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollTop(window.scrollY);
        });
        window.addEventListener('resize', () => {
            setWindowHeight(window.innerHeight);
        });
    }, [scrollTop, windowHeight]);

    const simulatorStyle: React.CSSProperties = {
        height: Math.min(640, windowHeight - 90) + 'px',
    };
    const isFixed = () => scrollTop > 60;

    return (
        <Panel
            className={classnames('mul-doc-simulator ', { 'mul-doc-simulator-fixed': isFixed() })}
        >
            <iframe ref={iframeRef} src={props.src} style={simulatorStyle} />
        </Panel>
    );
}

const Panel = styled.div`
    &.mul-doc-simulator {
        position: absolute;
        top: ${getNum($mul_doc_padding) + getNum($mul_doc_header_top_height)}px;
        right: ${$mul_doc_padding};
        z-index: 1;
        box-sizing: border-box;
        width: ${$mul_doc_simulator_width};
        min-width: ${$mul_doc_simulator_width};
        overflow: hidden;
        background: #fafafa;
        border-radius: ${$mul_doc_border_radius};
        box-shadow: #ebedf0 0 4px 12px;

        @media (max-width: 1100px) {
            right: auto;
            left: 750px;
        }

        @media (min-width: ${$mul_doc_row_max_width}) {
            right: 50%;
            margin-right: -${getNum($mul_doc_row_max_width) / 2 + 40}px;
        }

        &-fixed {
            position: fixed;
            top: ${$mul_doc_padding};
        }

        iframe {
            display: block;
            width: 100%;
            border: 0;
        }
    }
`;
